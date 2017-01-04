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
const string users = "users";
const string login = "login";
} // jraf

class Jraf
{
        hq::AccessController access;
        string root_dir;

        string client_version();
        static string ok(const string & s) { return er::Code(er::OK).str() + ' ' + s; }
        static string fail(const string & s) { return er::Code(er::JRAF_FAIL).str() + ' ' + s; }
        static string err(const string & s) { return er::Code(er::JRAF_ERR).str() + ' ' + s; }
        static string bad() { return er::Code(er::REQ_MSG_BAD); }
        os::Path root(string s) { return os::Path(root_dir) + s; }

        string aurequest(gl::Token & tok);
        string read_obj(string p, bool getonly);
        bool check_au_path(string sess, string pth);
        string aureq_rm(string pth);
        string aureq_md(string pth);
        string aureq_put(gl::Token & tok, string pth, bool append);
        string aureq_mv(string pth, string pto);
        string read_tok_path(gl::Token & tok, string sess, string & pth);

		void setver(const os::Path & p, bool isdir, string v);
		string getver(const os::Path & p, bool isdir);
		void update_ver(os::Path pth, bool dir);

    public:
        Jraf(string rdir): root_dir(rdir) {}

        string request(gl::Token tok);
};


#endif
