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
    if ( cmd.empty() ) cmd = "phmail";

    cmd += " login " + em + " " + url;

    os::Cout() << "AAA349 Aob: " << ao.seid << ' ' << ao.profile.prid
               << "\ncmd: " << cmd << os::endl;

    cmd = os::THISDIR + cmd;
    system(cmd.c_str());

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
    if ( !gl::issql(tok.c_str()) )
    {
        os::Cout() << "Bad intput [" << tok.c_str() << "]" << os::endl;
        return er::Code(er::REQ_MSG_BAD);
    }

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
        else if ( cmd == "dataset" || cmd == "ds" )
            return dataset(aa, ao);

        else if ( cmd == "admin" )
            return phadmin(aa, ao);

        else if ( cmd == "keywords" )
            return er::Code(er::OK).str() + ' ' + aa.phdb.keywords();

        else if ( cmd == "cat" )
            return categ(aa, ao);
    } // mutex

    if (0) {}

    else if ( cmd == "ping" )
        return er::Code(er::OK);

    else if ( cmd == "profile" )
        return er::Code(er::OK).str() + ' ' + ao.profile.str();

    return er::Code(er::REQ_MSG_BAD);
}

string Worker2::dataset(AutArea & aa, const AutObject & ao)
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string cmd = tok.sub();

    if (0) {}

    else if ( cmd == "create" )
    {
        aa.phdb.dataset_new(ao.profile.prid);
        return er::Code(er::OK);
    }

    else if ( cmd == "list" )
    {
        gl::vstr ids, tis;
        int sz = aa.phdb.dataset_list(ao.profile.prid, ids, tis);

        string s_ids; for ( auto s : ids ) s_ids += ' ' + s;
        string s_tis; for ( auto s : tis ) s_tis += ' ' + s;

        return er::Code(er::OK).str() + ' ' + gl::tos(sz) + s_ids + s_tis;
    }

    else if ( cmd == "delete" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string daid = tok.sub();
        aa.phdb.dataset_del(ao.profile.prid, daid);
        return er::Code(er::OK);
    }

    else if ( cmd == "update" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string daid = tok.sub();

        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string field = tok.sub();

        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string val = tok.sub();

        aa.phdb.dataset_upd(ao.profile.prid, daid, field, val);
        return er::Code(er::OK);
    }

    else if ( cmd == "get" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string daid = tok.sub();

        string r = aa.phdb.dataset_get(ao.profile.prid, daid);

        if ( r.empty() ) return er::Code(er::REQ_MSG_BAD);

        return er::Code(er::OK).str() + ' ' + r;
    }

    else if ( cmd == "addkw" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string daid = tok.sub();

        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string kname = tok.sub();

        aa.phdb.dataset_addkw(ao.profile.prid, daid, kname);

        return er::Code(er::OK).str();
    }

    else if ( cmd == "delkw" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string daid = tok.sub();

        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string kname = tok.sub();

        aa.phdb.dataset_delkw(ao.profile.prid, daid, kname);

        return er::Code(er::OK).str();
    }

    else if ( cmd == "file" )
        return dataset_file(aa, ao);

    return er::Code(er::REQ_MSG_BAD);
}

string Worker2::phadmin(AutArea & aa, const AutObject & ao)
{
    if ( !aa.matchConf("admin", ao.profile.mail) )
    {
        os::Cout() << "Worker2::phadmin: unathorized access ["
                   << tok.c_str() << "]" << os::endl;

        return er::Code(er::AUTH);
    }

    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string cmd = tok.sub();

    if (0) {}

    else if ( cmd == "addkw" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string kw = tok.sub();

        aa.phdb.keyw_new(kw);
        return er::Code(er::OK);
    }

    else if ( cmd == "chkw" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string kwo = tok.sub();
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string kwn = tok.sub();

        aa.phdb.keyw_ch(kwo, kwn);
        return er::Code(er::OK);
    }

    else if ( cmd == "ping" ) return er::Code(er::OK);

    else if ( cmd == "addcat" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD).str() + " 255";
        string cat = tok.sub();

        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD).str() + " 258";
        string par = tok.sub();

        aa.phdb.cat_new(cat, par);
        return er::Code(er::OK);
    }

    else if ( cmd == "chcat" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD).str() + " 255";
        string catid = tok.sub();

        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD).str() + " 258";
        string newname = tok.sub();

        aa.phdb.cat_ch(catid, newname);
        return er::Code(er::OK);
    }

    return er::Code(er::REQ_MSG_BAD).str() + " [" + cmd + "]";
}

string Worker2::categ(AutArea & aa, const AutObject & ao)
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string cmd = tok.sub();

    if (0) {}

    else if ( cmd == "kids" )
    {
        if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
        string parid = tok.sub();
        return er::Code(er::OK).str() + " " + aa.phdb.cat_kids(parid);
    }

    return er::Code(er::REQ_MSG_BAD).str() + " [" + cmd + "]";
}

string Worker2::dataset_file(AutArea & aa, const AutObject & ao)
{
    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string daid = tok.sub();

    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
    string cmd = tok.sub();

    if (0) {}

    else if ( cmd == "list" )
    {
        string r = aa.phdb.ds_file_list(daid,"");
        return er::Code(er::OK).str() + ' ' + r;
    }

    else if ( cmd == "new" )
    {
        string r = aa.phdb.ds_file_new(ao.profile.prid, daid);
        return er::Code(er::OK).str() + ' ' + r;
    }

    else if ( cmd == "put" )
    {
	    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
	    string fiid = tok.sub();
	    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
	    string pos = tok.sub();
	    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
	    string len = tok.sub();
	    if ( !tok.next() ) return er::Code(er::REQ_MSG_BAD);
	    string s64 = tok.sub();

		if( !aa.phdb.auth(ao.profile.prid, daid) ) return er::Code(er::REQ_MSG_BAD);

		///gl::intint x = ds_file_put(ao.profile.prid, daid);
	}

    return er::Code(er::REQ_MSG_BAD);
}
