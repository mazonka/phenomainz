// Hasq Technology Pty Ltd (C) 2013-2016

#include <sstream>
#include <algorithm>

#include "gl_utils.h"
#include "gl_err.h"

#include "os_sysinfo.h"
#include "sg_mutex.h"
#include "sg_cout.h"
#include "sg_client.h"

#include "hq_hash.h"
#include "hq_platform.h"

#include "hq_wkrtask.h"
#include "hq_plebfile.h"
#include "hq_connector.h"
#include "hq_netenv.h"

string Worker2::ph_login()
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);

    string em = tok.sub();

	AutArea & aa = gs->autArea;
	sgl::Mutex mutex_aa(aa.access2autArea);

	AutObject ao = aa.newAob(em);

	os::Cout()<<"Email received "<<em<<os::endl;

	//aa.reloadConf();
	os::Cout()<<"http://127.0.0.1:16000/au?123456"<<os::endl;

    return er::Code(er::OK);
}

string Worker2::ph_script(string cmd, string ag)
{	
	os::Cout()<<"Auth request ["<<cmd <<"] ["<<ag<<"]"<<os::endl;

	if( cmd != "au" ) return er::Code(er::REQ_MSG_BAD);

	string file = gl::file2str("au.phd");

	gl::replaceAll(file,"$$$",ag);

    *mime = "text/html";
	return file;
}

string Worker2::ph_aucmd()
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
	string c1 = tok.sub();
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
	string c2 = tok.sub();
//    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
//	string c3 = tok.sub();
    return er::Code(er::OK).str()+' '+c1+' '+c2;
}
