// Hasq Technology Pty Ltd (C) 2013-2016

#include <sstream>
#include <algorithm>

#include "gl_utils.h"
#include "gl_err.h"

#include "os_exec.h"
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

    AutObject ao;
    {
        AutArea & aa = gs->autArea;
        sgl::Mutex mutex_aa(aa.access2autArea);

        KeyArea & ka = gs->keyArea;
        sgl::Mutex mutex_ka(ka.access2keyArea);

        string ses_id = ka.newSalt().substr(0, 16);

        ao = aa.newAob_email(ses_id, em);
    }

    // url http://localhost:16000/home?0, http://localhost:16000[/]
    string url;
    if ( tok.next() ) url = tok.sub();
    else url = AutArea::loadConf("server");

    if ( url.empty() ) throw "Worker2::ph_login: empty url";
    auto i = url.find('?');

    if ( i == string::npos )
    {
        if ( url[url.size() - 1] != '/' ) url += '/';
        url += "home?";
    }
    else
        url = url.substr(0, i + 1);

    url += gl::tos(ao.seid);

    string cmd = AutArea::loadConf("phmail");
    if ( cmd.empty() ) cmd = "./phmail";

    cmd += " login " + em + " " + url;

    string out = os::execOut(cmd);

    os::Cout() << "AAA349 Aob: " << ao.seid << ' ' << ao.profile.prid
               << "\ncmd: " << cmd
               << "\nout: " << out << os::endl;

    return er::Code(er::OK);
}

string Worker2::ph_script(string cmd, string ag)
{
    os::Cout() << "Auth request [" << cmd << "] [" << ag << "]" << os::endl;

    // so far support only "home?sid"
    if ( cmd != "home" ) return er::Code(er::REQ_MSG_BAD);

    string file = gl::file2str("home.phd");

    gl::replaceAll(file, "$$$", ag);

    *mime = "text/html";
    return file;
}

string Worker2::ph_aucmd()
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string seid = tok.sub();
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string cmd = tok.sub();

    AutObject ao;
    {
        AutArea & aa = gs->autArea;
        sgl::Mutex mutex_aa(aa.access2autArea);
        ao = aa.que.getAob_seid(seid);

        if ( !ao.isok() ) return er::Code(er::AUTH);

        if (0) {}

        else if ( cmd == "logout" )
        {
            aa.que.remove_by_seid(seid);
            return er::Code(er::OK);
        }

        else if ( cmd == "name" )
        {
            if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
            string nn = tok.sub();
            aa.update_name(ao, nn);
            return er::Code(er::OK);
        }
        else if ( cmd == "dataset" )
            return dataset();
    }

    if (0) {}

    else if ( cmd == "ping" )
        return er::Code(er::OK);

    else if ( cmd == "profile" )
        return er::Code(er::OK).str() + ' ' + ao.profile.str();

    else if ( cmd == "file" )
    {
        gl::intint sz = putfile();
        if ( sz < 0 ) return er::Code(er::REQ_MSG_BAD);
        return er::Code(er::OK).str() + ' ' + gl::tos(sz);
    }

    return er::Code(er::REQ_MSG_BAD);
    ///return er::Code(er::OK).str() + ' ' + seid + ' ' + cmd;
}

string Worker2::dataset()
{
    return er::Code(er::OK).str() + " - not implemented";
}

gl::intint Worker2::putfile()
{
    gl::intint err(-1);
    return err;
}

