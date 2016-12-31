#include <iostream>
#include <fstream>

#include "os_filesys.h"
#include "gl_utils.h"
#include "gl_except.h"
#include "gl_err.h"

#include "jraf.h"


string Jraf::request(gl::Token tok)
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
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

	return err("bad command " + cmd);
}


string Jraf::client_version()
{
	string p = path(jraf::fe_version).str();
	string fever = gl::file2str(path(jraf::fe_version).str());

	if( fever.empty() ) return err("no file system found ["+p+"]");

	return ok(fever);
}
