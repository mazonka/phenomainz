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
	const char * const be_version = "10000";
	const char * const root_dir = "jraf";
	const char * const fe_version = ".jraf.sys";
	const char * const node_ver = ".jraf.ver";
	const char * const home_dir = "home";
	const char * const etc_dir = "etc";
	const char * const sys_dir = "sys";
} // jraf

class Jraf
{
	hq::AccessController access;

	string client_version();
	static string ok(const string &s){ return er::Code(er::OK).str()+' '+s; }
	static string err(const string &s){ return er::Code(er::JRAF_ERR).str()+' '+s; }
	static string bad(){ return er::Code(er::REQ_MSG_BAD); }
	static os::Path path(string s){ return os::Path(jraf::root_dir)+s; }

	string fix_obj();
	string read_obj(string p, bool getonly);

public:
	Jraf(){}

	string request(gl::Token tok);
};


#endif
