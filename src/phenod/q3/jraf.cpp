#include <iostream>
#include <fstream>

#include "os_filesys.h"
#include "sg_cout.h"
#include "gl_utils.h"
#include "gl_except.h"
#include "gl_err.h"
#include "ma_utils.h"

#include "jraf.h"

inline string zero(string s, string d = "0")
{
    return s.empty() ? d : s;
}

string Jraf::request(gl::Token tok)
{
    string result;
    while (true)
    {
        if ( !tok.next() ) return bad();
        string cmd = tok.sub();

        if ( cmd == "ping" ) result += er::Code(er::OK);
        else if ( cmd == "version" )
        {
            if ( !tok.next() ) result += bad();
            else
            {
                string w = tok.sub();
                if ( w == "backend" ) result += ok(jraf::be_version);
                else if ( w == "client" ) result += client_version();
                else result += bad();
            }
        }

        else if ( cmd == "read" || cmd == "get" )
        {
            hq::LockRead lock(&access);
            if ( !tok.next() ) return bad();
            string p = tok.sub();
            result += read_obj(p, cmd == "get", false); // superuser=false FIXME
        }

        else if ( cmd == "au" )
        {
            hq::LockWrite lock(&access);
            result += aurequest(tok);
        }
        else
        {
            result += err("bad command [" + cmd + "]");
            break;
        }

        if ( !tok.next() ) break;
        string ts = tok.sub();
        if ( ts != "+" ) return result + ' ' + err("[" + ts + "]");
        result += ' ';
    }

    if ( result.empty() ) return bad();
    return result;
}


string Jraf::client_version()
{
    string p = (sys_dir() + "version").str();
    string fever = gl::file2str(p);

    if ( fever.empty() ) return err("no file system found [" + p + "]");

    return ok(fever);
}

os::Path Jraf::ver_path(const os::Path & p, bool isdir) const // FIXME remove isdir
{
	os::Path q = p;

	q = q.glue(jraf::ver_name);

	q = ver_dir() + q;
    ///if ( p.size() > 1 ) q = ver_dir() + p;
    ///else q = ver_dir() + jraf::ver_name;

    //os::Cout() << "AAA ver_path [" << p.str() << "] [" << q.str() << "]" << os::endl;

	return q;

    ///if ( isdir ) q += jraf::ver_ext;
    ///else q.glue(jraf::ver_ext);
    ///return q;
}


string Jraf::getver(const os::Path & p, bool isdir) const
{
    os::Path q = ver_path(p, isdir);
    ///if ( isdir ) q += jraf::ver_ext;
    ///else q.glue(jraf::ver_ext);

    string ver = gl::file2str( q.str() );
    ver = zero(ver);
    return gl::tos(gl::toi(ver));
}

void Jraf::setver(const os::Path & p, bool isdir, string v)
{
    os::Path q = ver_path(p, isdir);
    ///os::Path q = p;
    ///if ( isdir ) q += jraf::ver_ext;
    ///else q.glue(jraf::ver_ext);

    //os::Cout() << "AAA setver [" << p.str() << "] [" << q.str() << "]" << os::endl;

	os::Path parent = parent_str(q);
	if( !parent.isdir() ) os::FileSys::trymkdir(parent);
	if( !parent.isdir() ) throw gl::ex("Failed to make dir " + parent.str());

    std::ofstream of(q.str(), std::ios::binary );
    of << v << '\n';
    if ( !of ) throw gl::ex("Bad access to " + q.str());
}

bool Jraf::special(string s, bool su)
{
    if (su) return false;
    if ( s.find(jraf::ver_name) != string::npos ) return true;
    if ( s.find(jraf::sys_name) != string::npos ) return true;
    return false;
};

string Jraf::read_obj(string pth, bool getonly, bool su)
{
    os::Path rp(pth);
    os::Path p = root(pth);
    string ver = getver(pth, true);

    if ( p.isdir() )
    {
        ///string ver = getver(pth, true);
        string q = ver + " -1";
        if ( getonly ) return ok(q);

        os::Dir dir = os::FileSys::readDirEx(p, true, true);

        string r;
        int cntr = 0;

        for ( auto i : dir.dirs )
        {
            if ( special(i, su) ) continue;
            r += ' ' + getver(rp + i, true);
            r += " -1";
            r += ' ' + i;
            cntr++;
        }

        for ( auto i : dir.files )
        {
            if ( special(i.first, su) ) continue;
            r += ' ' + getver(rp + i.first, false);
            r += ' ' + gl::tos(i.second);
            r += ' ' + i.first;
            cntr++;
        }

        q += ' ' + gl::tos(cntr);

        return ok(q + r);
    }

    if ( p.isfile() )
    {
        ///string ver = getver(p, false);
        string r = ver + ' ' + gl::tos(p.filesize());
        if ( getonly ) return ok(r);
        r += ' ' + ma::b64enc( gl::file2str(p.str()) );
        return ok(r);
    }

    return err("bad path " + pth);
}


string Jraf::aurequest(gl::Token & tok)
{
    if ( !tok.next() ) return err("session id");
    string sess = tok.sub();

    if ( !tok.next() ) return err("command");
    string cmd = tok.sub();

    string pth;
    string er = read_tok_path(tok, sess, pth);
    if ( !er.empty() ) return er;

    if (0) {}

    else if ( cmd == "md" ) return aureq_md(pth);
    else if ( cmd == "rm" ) return aureq_rm(pth);
    else if ( cmd == "put" ) return aureq_put(tok, pth, true);
    else if ( cmd == "save" ) return aureq_put(tok, pth, false);
    else if ( cmd == "mv" )
    {
        string pto;
        er = read_tok_path(tok, sess, pto);
        if ( !er.empty() ) return er;
        return aureq_mv(pth, pto);
    }

    return err("command [" + cmd + "] unknown");
}


string Jraf::aureq_rm(string pth)
{
	if( pth.empty() ) return fail("root cannot be removed");

    os::Path p = root(pth);
    ///bool dir = p.isdir();

    p.erase();
    if ( p.isdir() || p.isfile() ) return fail(pth);

    ///ver_path(p, dir).erase();

    update_ver(pth, true);
    update_ver(parent_str(pth), true);

    return ok(pth);
}

string Jraf::aureq_md(string pth)
{
    os::Path p = root(pth);
    if ( p.isdir() ) return ok(pth);
    os::FileSys::trymkdir(p);
    if ( !p.isdir() ) return fail(pth);
    update_ver(pth, true);
    return ok(pth);
}

bool Jraf::check_au_path(string sess, string pth)
{
    os::Path usr = users();
    if ( !usr.isdir() ) return true;

    os::Cout() << "Jraf::check_au_path - NI" << os::endl;
    return true;
}

string Jraf::aureq_put(gl::Token & tok, string pth, bool append)
{
    // (put) pos, sz, text
    // (save) sz, text

    int pos = -1;
    if ( append )
    {
        if ( !tok.next() ) return err("position");
        pos = gl::toi(tok.sub());
    }

    if ( !tok.next() ) return err("size");
    int siz = gl::toi(tok.sub());

    if ( !tok.next() ) return err("text");
    string text = ma::b64dec(tok.sub());

    if ( (int)text.size() != siz ) return err("size mismatch");

    os::Path f = root(pth);

    if ( !f.isfile() ) { std::ofstream of(f.str().c_str()); }
    if ( !f.isfile() ) return fail(pth);

    int fsz = f.filesize();

    if ( append )
    {
        if ( fsz != pos ) return fail(gl::tos(fsz));

        std::ofstream of(f.str().c_str(), std::ios::app | std::ios::binary );
        of << text;
    }
    else
    {
        std::ofstream of(f.str().c_str(), std::ios::binary);
        of << text;
    }

    update_ver(pth, false);
    return ok(gl::tos(f.filesize()));
}

// return "" on success or error message
string Jraf::read_tok_path(gl::Token & tok, string sess, string & pth)
{
    if ( !tok.next() ) return err("path");
    string p = tok.sub();

    gl::replaceAll(p, "//", "/");

    if ( p.find("..") != string::npos ) return err("..");

    if ( p.empty() ) return err("empty");

    while ( !p.empty() && p[p.size() - 1] == '/' )
        p = p.substr(0, p.size() - 1);

    if ( !check_au_path(sess, p) ) return fail("auth");

    pth = p;
    return "";
}

string Jraf::aureq_mv(string pth, string pto)
{
    os::Path f1 = root(pth);
    os::Path f2 = root(pto);
    bool dir = f1.isdir();

	if( dir )
	{
		string msg = "aureq_mv - directory move NI - need copy versions recursively";
	    os::Cout() << msg << os::endl;
		return fail("msg");
	}

    bool k = os::rename(f1.str(), f2.str());
    if ( !k ) return fail(pth + " -> " + pto);
    if ( f1.isdir() || f1.isfile() ) return fail(pth);

    ///ver_path(f1, dir).erase();
    ///update_ver(f2, dir);

    ///if (f1.str() != root_dir) update_ver(parent_str(f1), true);
    ///if (f2.str() != root_dir) update_ver(parent_str(f2), true);

    update_ver(pto, dir);
    update_ver(pth, dir);
    update_ver(parent_str(pto), true);
    update_ver(parent_str(pth), true);

    return ok(pto);
}

string Jraf::parent_str(os::Path pth)
{
    string spth = pth.str();
    //os::Cout()<<"AAA spth="<<spth<<os::endl;

    ///if ( spth == root_dir ) return spth;

    ///if ( spth.size() <= root_dir.size() )
    ///    throw gl::ex("Error in Jraf::parent_str [" + spth + "] [" + root_dir + "]");

    if ( pth.size() < 2 ) return "";
    string up = pth.strP(pth.size() - 2);
    return up;
}

void Jraf::update_ver(os::Path pth, bool dir)
{
    //os::Cout() << "AAA 1 update_ver [" << pth.str() << "]" << os::endl;

    string v = getver(pth, dir);
    v = gl::tos( gl::toi(v) + 1 );
    setver(pth, dir, v);

    /*///
    string spth = pth.str();
    //os::Cout()<<"AAA spth="<<spth<<os::endl;

    if ( spth == root_dir ) return;

    if ( spth.size() <= root_dir.size() )
        throw gl::ex("Error in Jraf::update_ver [" + spth + "] [" + root_dir + "]");

    string up = pth.strP(pth.size() - 2);
    //os::Cout()<<"AAA up="<<up<<os::endl;
    */

    string up = parent_str(pth);
    if ( up == pth.str() ) return;

    update_ver(up, true);
}

