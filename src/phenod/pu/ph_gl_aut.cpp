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

    que.remove_by_email(email); // 1
    Profile pr;
    if ( !phdb.get_by_email(email, pr) )
    {
        phdb.new_email(email);
        if ( !phdb.get_by_email(email, pr) )
            //throw gl::ex("ph database corrupted or not accessible");
            os::Cout() << "AAA826 ph database corrupted or not accessible" << os::endl;
    }

    AutObject ao(ses_id, pr);

    que.addAob(ao);

    return ao;
}


void AutQueue::remove_by_email(string em)
{
    string k;

    for ( const auto & i : aos )
        if ( i.second.profile.mail == em )
        {
            k = i.first;
            break;
        }

    if ( !k.empty() ) aos.erase(k);
}

string AutArea::dump_safe(GlobalSpace * gs)
{
    AutArea & aa = gs->autArea;
    sgl::Mutex mutex_aa(aa.access2autArea);

    return aa.que.dump();
}

string AutQueue::dump() const
{
    string r;
    for ( const auto & i : aos )
    {
        string ses_id = i.second.seid;
        r += ses_id + ": " + i.second.profile.dump();
        r += '\n';
    }

    return r;
}

string Profile::dump() const
{
    string r;
    r += "[" + prid + "] [" + mail + "] [" + name;
    r += "] [" + last + "] [" + cntr + "]";
    return r;
}

string AutArea::loadConf(string name)
{
    std::ifstream in(ph_conf.c_str());
    while (in)
    {
        string k, v;
        in >> k >> v;
        if ( k == name ) return v;
    }

    return "";
}

void AutQueue::addAob(const AutObject & ao)
{
    aos[ao.seid] = ao;

    if ( aos.size() < szMax ) return;

    string tim, id;

    for ( const auto & i : aos )
        if ( id.empty() || i.second.profile.last < tim )
        {
            id = i.first;
            tim = i.second.profile.last;
        }

    if ( !id.empty() ) aos.erase(id);
}
