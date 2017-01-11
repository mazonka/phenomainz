#ifndef __JRAF_H
#define __JRAF_H

#include <string>
#include <vector>
#include <map>
#include "gl_utils.h"
#include "hq_access.h"
#include "gl_token.h"
#include "os_filesys.h"

using std::string;

namespace jraf
{
const char * const be_version = "10420";
const char * const sys_name = ".jraf.sys";
const char * const ver_name = ".jraf.ver";
const string users = "users";
const string login = "login";
const string inbox = "inbox";
//const char * const home = "home";
//const char * const etc = "etc";
//const char * const sys = "sys";
} // jraf

class Jraf
{
        struct Cmdr // command parser result
        {
            string s; bool b;

            Cmdr(): b(true) {}
            ///explicit Cmdr(string a): s(a), b(true) {}
            Cmdr(string a, bool k): s(a), b(k) {}
            void operator+=(Cmdr c) { s += c.s; b &= c.b; }
			Cmdr operator+(Cmdr c){ Cmdr r(*this); r+=c; return r; }
        };

        hq::AccessController access;
        string root_dir;

        static bool special(string s, bool su);
        bool issu(string sess);

        os::Path root(string s) const { return os::Path(root_dir) + s; }
        os::Path sys_dir() const { return root(jraf::sys_name); }
        os::Path ver_dir() const { return root(jraf::ver_name); }
        os::Path users() const { return sys_dir() + jraf::users; }
        os::Path login() const { return sys_dir() + jraf::login; }

        Cmdr client_version();

        static Cmdr ok(const string & s)
        { return Cmdr(er::Code(er::OK).str() + ' ' + s, true); }

        static Cmdr fail(const string & s)
        { return Cmdr(er::Code(er::JRAF_FAIL).str() + ' ' + s, false); }

        static Cmdr err(const string & s)
        { return Cmdr(er::Code(er::JRAF_ERR).str() + ' ' + s, false); }

        static Cmdr bad()
        { return Cmdr(er::Code(er::REQ_MSG_BAD), false); }

        Cmdr aurequest(gl::Token & tok);
        Cmdr read_obj(string p, bool getonly, bool su);
        Cmdr aureq_rm(string pth);
        Cmdr aureq_md(string pth);
        Cmdr aureq_put(gl::Token & tok, string pth, bool append);
        Cmdr aureq_mv(string pth, string pto);
        Cmdr read_tok_path(gl::Token & tok, string & pth, bool su);
        ///Cmdr read_tok_path(gl::Token & tok, string sess, string & pth, bool su);
        ///bool check_au_path(string sess, string pth, bool su);

        os::Path ver_path(const os::Path & p) const;
        void setver(const os::Path & p, string v);
        string getver(const os::Path & p) const;
        void update_ver(os::Path pth);
        static string parent_str(os::Path pth);

    public:
        Jraf(string rdir): root_dir(rdir) {}

        string request(gl::Token tok);
};


/*

1. Version files are not visible [1a] and not writable [1b] for anyone.
2. Sys files do not have versions
3. if( Superuser [3b] or no Users_dir [3a] ), 
   all files (including sys) are visible and writable
4. if( no Superuser and Unsers_dir )
    4.1 Sys files not visible and not writable
    4.2 Home files visible and writable
    4.3 Other files visible but not writable
5. Superuser: email listed in the root conf file
6. Users_dir: /.jraf.sys/users (email -> name,uname,email,name,quota,last,cntr)
7. Login_dir: /.jrar.sys/login (sid -> email)
8. Inbox_dir: /.jraf.sys/inbox (uid,yymmddhhmmss_rand)

*/

#endif
