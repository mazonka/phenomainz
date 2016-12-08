// Hasq Technology Pty Ltd (C) 2013-2016

#ifndef _PH_GL_AUT
#define _PH_GL_AUT

#include "ph_db.h"

#include <map>

struct AutObject
{
    string seid;
    Profile profile;
    AutObject(string x, Profile e): seid(x), profile(e) {}
    AutObject() {}
};

class AutQueue
{
        std::map<string, AutObject> aos;

        unsigned szMax;
        int findAob(gl::intint aid) const;
    public:
        void addAob(const AutObject & ao);
        AutObject getAob_sid(string sid) const;
        AutObject getAob_email(string email) const;
        AutQueue(unsigned sz): szMax(sz) {}

        void remove_by_email(string);
        string dump() const;
};

struct AutArea
{
    static string ph_conf;
    Phdb phdb;

    os::Semaphore access2autArea;
    AutQueue que;
    AutArea(int sz): access2autArea(1), que(sz) { testConf(); }
    void testConf();

    AutObject newAob_email(string id, string email);

    static string dump_safe(GlobalSpace * gs);
    static string loadConf(string name);
};

#endif
