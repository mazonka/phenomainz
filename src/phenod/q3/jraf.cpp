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
            result += read_obj(p, cmd == "get");
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
    string p = root(jraf::sys_ext).str();
    string fever = gl::file2str(p);

    if ( fever.empty() ) return err("no file system found [" + p + "]");

    return ok(fever);
}

string getver(const os::Path & p)
{
    os::Path q = p;
    if ( p.isdir() ) q += jraf::ver_ext;
    else q.glue(jraf::ver_ext);

    string ver = gl::file2str( q.str() );
    ver = zero(ver);
    return ver;
}

string Jraf::read_obj(string pth, bool getonly)
{
    os::Path p = root(pth);

    if ( p.isdir() )
    {
        string ver = getver(p);
        string q = ver + " -1";
        if ( getonly ) return ok(q);

        os::Dir dir = os::FileSys::readDirEx(p, true, true);

        string r;
        int cntr = 0;

        auto isspec = [](string s) -> bool
        {
            if ( gl::endswith(s, jraf::ver_ext) ) return true;
            if ( gl::endswith(s, jraf::sys_ext) ) return true;
            return false;
        };

        for ( auto i : dir.dirs )
        {
            if ( isspec(i) ) continue;
            r += ' ' + getver(p + i);
            r += " -1";
            r += ' ' + i;
            cntr++;
        }

        for ( auto i : dir.files )
        {
            if ( isspec(i.first) ) continue;
            r += ' ' + getver(p + i.first);
            r += ' ' + gl::tos(i.second);
            r += ' ' + i.first;
            cntr++;
        }

        q += ' ' + gl::tos(cntr);

        return ok(q + r);
    }

    if ( p.isfile() )
    {
        string ver = getver(p);
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

    if ( !tok.next() ) return err("path");
    string pth = tok.sub();

    gl::replaceAll(pth, "//", "/");

    if ( pth.find("..") != string::npos ) return err("..");

    if ( !check_au_path(sess, pth) ) return fail("auth");

    if (0) {}

    else if ( cmd == "md" ) return aureq_md(pth);
    else if ( cmd == "rm" ) return aureq_rm(pth);
    else if ( cmd == "put" ) return aureq_put(tok, pth, true);
    else if ( cmd == "save" ) return aureq_put(tok, pth, false);

    return err("command [" + cmd + "] unknown");
}


string Jraf::aureq_rm(string pth)
{
    os::Path p = root(pth);
    p.erase();
    if ( p.isdir() || p.isfile() ) return fail(pth);
    return ok(pth);
}

string Jraf::aureq_md(string pth)
{
    os::Path p = root(pth);
    os::FileSys::trymkdir(p);
    if ( p.isdir() ) return ok(pth);
    return fail(pth);
}

bool Jraf::check_au_path(string sess, string pth)
{
    os::Path users = root(jraf::users + jraf::sys_ext);
    if ( !users.isdir() ) return true;

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

    return ok(gl::tos(f.filesize()));
}
