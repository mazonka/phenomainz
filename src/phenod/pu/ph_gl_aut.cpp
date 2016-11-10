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
    AutObject ao(ses_id, email);
    return ao;
}

