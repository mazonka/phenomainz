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
    Cmdr result;
    while (true)
    {
        if ( !tok.next() ) return bad().s;
        string cmd = tok.sub();

        if ( cmd == "ping" ) result += Cmdr(er::Code(er::OK), true);
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
            if ( !tok.next() ) return err("session id").s;
            string sess = tok.sub();
            hq::LockRead lock(&access);
            if ( !tok.next() ) return bad().s;
            string p = tok.sub();
            result += read_obj(p, cmd == "get", issu(sess));
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

		if( !result.b ) break;
        if ( !tok.next() ) break;
        string ts = tok.sub();
        if ( ts != "+" ) return result.s + ' ' + err("[" + ts + "]").s;
        result.s += " ";
    }

    if ( result.s.empty() ) return bad().s;
    return result.s;
}


Jraf::Cmdr Jraf::client_version()
{
    string p = (sys_dir() + "version").str();
    string fever = gl::file2str(p);

    if ( fever.empty() ) return err("no file system found [" + p + "]");

    return ok(fever);
}

os::Path Jraf::ver_path(const os::Path & p) const
{
    os::Path q = p;
    q = q.glue(jraf::ver_name);
    q = ver_dir() + q;
    return q;
}


string Jraf::getver(const os::Path & p) const
{
    os::Path q = ver_path(p);
    string ver = gl::file2word( q.str() );
    ver = zero(ver);
    ///return gl::tos(gl::toi(ver));
    return ver;
}

void Jraf::setver(const os::Path & p, string v)
{
    os::Path q = ver_path(p);

    os::Path parent = parent_str(q);
    if ( !parent.isdir() ) os::FileSys::trymkdir(parent);
    if ( !parent.isdir() ) throw gl::ex("Failed to make dir " + parent.str());

    std::ofstream of(q.str(), std::ios::binary );
    of << v << '\n';
    if ( !of ) throw gl::ex("Bad access to " + q.str());
}

bool Jraf::special(string s, bool su)
{
    if ( s.find(jraf::ver_name) != string::npos ) return true;

    if (su) return false;

    if ( s.find(jraf::sys_name) != string::npos ) return true;

    return false;
};

Jraf::Cmdr Jraf::read_obj(string pth, bool getonly, bool su)
{
    os::Path rp(pth);
    os::Path p = root(pth);
    string ver = getver(pth);

    if ( p.isdir() )
    {
        string q = ver + " -1";
        if ( getonly ) return ok(q);

        os::Dir dir = os::FileSys::readDirEx(p, true, true);

        string r;
        int cntr = 0;

        for ( auto i : dir.dirs )
        {
            if ( special(i, su) ) continue;
            r += ' ' + getver(rp + i);
            r += " -1";
            r += ' ' + i;
            cntr++;
        }

        for ( auto i : dir.files )
        {
            if ( special(i.first, su) ) continue;
            r += ' ' + getver(rp + i.first);
            r += ' ' + gl::tos(i.second);
            r += ' ' + i.first;
            cntr++;
        }

        q += ' ' + gl::tos(cntr);

        return ok(q + r);
    }

    if ( p.isfile() )
    {
        string r = ver + ' ' + gl::tos(p.filesize());
        if ( getonly ) return ok(r);
        r += ' ' + ma::b64enc( gl::file2str(p.str()) );
        return ok(r);
    }

    return err("bad path " + pth);
}


Jraf::Cmdr Jraf::aurequest(gl::Token & tok)
{
    if ( !tok.next() ) return err("session id");
    string sess = tok.sub();
    bool superuser = issu(sess);

    if ( !tok.next() ) return err("command");
    string cmd = tok.sub();

    string pth;
    Cmdr er = read_tok_path(tok, sess, pth, superuser);
    if ( !er.b ) return er;

    if (0) {}

    else if ( cmd == "md" ) return aureq_md(pth);
    else if ( cmd == "rm" ) return aureq_rm(pth);
    else if ( cmd == "put" ) return aureq_put(tok, pth, true);
    else if ( cmd == "save" ) return aureq_put(tok, pth, false);
    else if ( cmd == "mv" )
    {
        string pto;
        er = read_tok_path(tok, sess, pto, superuser);
        if ( !er.b ) return er;
        return aureq_mv(pth, pto);
    }

    return err("command [" + cmd + "] unknown");
}


Jraf::Cmdr Jraf::aureq_rm(string pth)
{
    if ( pth.empty() ) return fail("root cannot be removed");

    os::Path p = root(pth);

    p.erase();
    if ( p.isdir() || p.isfile() ) return fail(pth);

    update_ver(pth);
    update_ver(parent_str(pth));

    return ok(pth);
}

Jraf::Cmdr Jraf::aureq_md(string pth)
{
    os::Path p = root(pth);
    if ( p.isdir() ) return ok(pth);
    os::FileSys::trymkdir(p);
    if ( !p.isdir() ) return fail(pth);
    update_ver(pth);
    return ok(pth);
}

bool Jraf::issu(string sess)
{
    os::Path usr = users();
    if ( !usr.isdir() ) return true;

    if ( sess == "0" ) return false;

    string uid = gl::file2word(login().str());

    if ( uid.empty() ) return false;

    string emailfile = (usr + uid + "email").str();
    os::Cout() << "AAA issu " << emailfile << os::endl;
    string email = gl::file2word(emailfile);

    if ( email.empty() ) return false;

    // now test root config for email
    os::Cout() << "Jraf::issu - NI" << os::endl;
    return true;
}

bool Jraf::check_au_path(string sess, string pth, bool su)
{
    os::Path usr = users();
    if ( !usr.isdir() ) return true;

    os::Cout() << "Jraf::check_au_path - NI" << os::endl;
    return true;
}

Jraf::Cmdr Jraf::aureq_put(gl::Token & tok, string pth, bool append)
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

    update_ver(pth);
    return ok(gl::tos(f.filesize()));
}

/// return "" on success or error message
Jraf::Cmdr Jraf::read_tok_path(gl::Token & tok, string sess, string & pth, bool su)
{
    if ( !tok.next() ) return err("path");
    string p = tok.sub();

    gl::replaceAll(p, "//", "/");

    if ( p.find("..") != string::npos ) return err("..");

    if ( p.empty() ) return err("empty");

    while ( !p.empty() && p[p.size() - 1] == '/' )
        p = p.substr(0, p.size() - 1);

    if ( special(p, su) ) return fail("system path");
    if ( !check_au_path(sess, p, su) ) return fail("auth");

    pth = p;
    return Cmdr();
}

Jraf::Cmdr Jraf::aureq_mv(string pth, string pto)
{
    os::Path f1 = root(pth);
    bool dir = f1.isdir();

    if ( dir ) return fail("moving direcrories not allowed");
    // the reason is that it would require recursive copying
    // of the version files sub-tree, since it cannot be moved

    os::Path f2 = root(pto);

    bool k = os::rename(f1.str(), f2.str());
    if ( !k ) return fail(pth + " -> " + pto);
    if ( f1.isdir() || f1.isfile() ) return fail(pth);

    update_ver(pto);
    update_ver(pth);
    update_ver(parent_str(pto));
    update_ver(parent_str(pth));

    return ok(pto);
}

string Jraf::parent_str(os::Path pth)
{
    string spth = pth.str();

    if ( pth.size() < 2 ) return "";
    string up = pth.strP(pth.size() - 2);
    return up;
}

void Jraf::update_ver(os::Path pth)
{
	if( special(pth.str(),false) ) return;

    string v = getver(pth);
    v = gl::tos( gl::toi(v) + 1 );
    setver(pth, v);

    string up = parent_str(pth);
    if ( up == pth.str() ) return;

    update_ver(up);
}

