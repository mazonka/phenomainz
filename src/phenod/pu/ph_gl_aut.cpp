// Hasq Technology Pty Ltd (C) 2013-2016

#include <iostream>

#include "gl_err.h"
#include "gl_defs.h"

#include "sg_mutex.h"
#include "sg_cout.h"

#include "hq_svttask.h"
#include "hq_globalspace.h"

string AutArea::ph_conf = "conf.phd";

void AutArea::testConf()
{
    string a = gl::file2str(ph_conf);
    if ( a.empty() ) throw gl::ex("Cannot open: " + ph_conf);
}


AutObject AutArea::newAob_email(string ses_id, string email)
{
    // 1. find by email and remove from queue
    // 2. get profile from DB
    // 3. if no, add profile to DB, and get profile from DB
    // 4. Create new Aob
    // 5. Add it to queue

    queue.remove_by_email(email);


    AutObject ao(ses_id, email);
    return ao;
}


void AutQueue::remove_by_email(string em)
{
	string k;

	for( const auto & i : aus )
	if( i.second.profile.email == em ) 
	{
		k = i.first;
		break;
	}

	if( !k.empty() ) aus.erase(k);
}

