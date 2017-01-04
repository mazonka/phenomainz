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
const char * const be_version = "10375";
///const char * const root_dir = "jraf";
const char * const sys_ext = ".jraf.sys";
const char * const ver_ext = ".jraf.ver";
const char * const home_dir = "home";
const char * const etc_dir = "etc";
const char * const sys_dir = "sys";
const char * const users_dir = "users";
const char * const login_dir = "login";
} // jraf

class Jraf
{
        hq::AccessController access;
        string root_dir;

        string client_version();
        static string ok(const string & s) { return er::Code(er::OK).str() + ' ' + s; }
        static string err(const string & s) { return er::Code(er::JRAF_ERR).str() + ' ' + s; }
        static string bad() { return er::Code(er::REQ_MSG_BAD); }
        os::Path path(string s) { return os::Path(root_dir) + s; }

        string aurequest(gl::Token & tok);
        string read_obj(string p, bool getonly);
        bool check_au_path(string sess, string pth);
        string aureq_rm(string pth);
        string aureq_md(string pth);

    public:
        Jraf(string rdir): root_dir(rdir) {}

        string request(gl::Token tok);
};


#endif
