#include <iostream>
#include <fstream>

#include "os_filesys.h"
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
    if ( !tok.next() ) return bad();
    string cmd = tok.sub();

	if( cmd == "ping" ) return er::Code(er::OK);
	if( cmd == "version" )
	{
	    if ( !tok.next() ) return bad();
	    string w = tok.sub();
		if( w == "backend" ) return ok(jraf::be_version);
		if( w == "client" ) return client_version();
		return bad();
	}

	if( cmd == "read" || cmd == "get" )
	{
		hq::LockRead lock(&access);
    	if ( !tok.next() ) return bad();
	    string p = tok.sub();
		return read_obj(p,cmd=="get");
	}

	if( cmd == "au" )
	{
		hq::LockWrite lock(&access);
		return fix_obj();
	}

	return err("bad command " + cmd);
}


string Jraf::client_version()
{
	string p = path(jraf::fe_version).str();
	string fever = gl::file2str(path(jraf::fe_version).str());

	if( fever.empty() ) return err("no file system found ["+p+"]");

	return ok(fever);
}

string Jraf::fix_obj()
{
	return err("not implemented");
}

string getver(const os::Path & p)
{
	os::Path q = p;
	if( p.isdir() ) q += jraf::node_ver;
	else q.glue(jraf::node_ver);

	string ver = gl::file2str( q.str() );
	ver = zero(ver);
	return ver;
}

string Jraf::read_obj(string pth, bool getonly)
{
	os::Path p = path(pth);

	if( p.isdir() )
	{
		string ver = getver(p);
		string q = ver + " -1";
		if( getonly ) return ok(q);

		os::Dir dir = os::FileSys::readDirEx(p,true,true);

		string r;
		int cntr = 0;

		auto isspec = [](string s) -> bool 
		{
			if( gl::endswith(s,jraf::node_ver) ) return true;
			if( gl::endswith(s,jraf::fe_version) ) return true;
			return false;
		};

		for( auto i : dir.dirs )
		{
			if( isspec(i) ) continue;
			r += ' ' + getver(p+i);
			r += " -1";
			r += ' ' + i;
			cntr++;
		}

		for( auto i : dir.files )
		{
			if( isspec(i.first) ) continue;
			r += ' ' + getver(p+i.first);
			r += ' ' + gl::tos(i.second);
			r += ' ' + i.first;
			cntr++;
		}

		q += ' '+gl::tos(cntr);

		return ok(q+r);
	}

	if( p.isfile() )
	{
		string ver = getver(p);
		string r = ver + ' ' + gl::tos(p.filesize());
		if( getonly ) return ok(r);
		r += ' ' + ma::b64enc( gl::file2str(p.str()) );
		return ok(r);
	}

	return err("bad path "+pth);
}

