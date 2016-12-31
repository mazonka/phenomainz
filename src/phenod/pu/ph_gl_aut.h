// Hasq Technology Pty Ltd (C) 2013-2016

#ifndef _PH_GL_AUT
#define _PH_GL_AUT

#include "ph_db.h"
#include "jraf.h"

#include <map>

struct AutObject
{
    string seid;
    Profile profile;
    AutObject(string x, Profile e): seid(x), profile(e) {}
    AutObject() {}

    bool isok() const { return !seid.empty(); }
};

class AutQueue
{
        std::map<string, AutObject> aos;

        unsigned szMax;
        int findAob(gl::intint aid) const;
    public:
        void addAob(const AutObject & ao);
        AutObject getAob_seid(string seid) const;
        AutObject getAob_mail(string mail) const;
        AutQueue(unsigned sz): szMax(sz) {}

        void remove_by_seid(string seid) { aos.erase(seid); }
        void remove_by_mail(string);
        void refresh(Phdb & db, const AutObject & ao);

        string dump() const;
};

struct AutArea
{
    static string ph_conf;
    Phdb phdb;
	Jraf jraf;

    os::Semaphore access2autArea;
    AutQueue que;
    AutArea(int sz): access2autArea(1), que(sz) { testConf(); }
    void testConf();

    AutObject newAob_email(string id, string email);
    void update_name(const AutObject & ao, string newname);
    ///AutObject getAob_seid(string seid) const { return que.getAob_seid(seid); }

    static string dump_safe(GlobalSpace * gs);
    static string loadConf(string name);
    static bool matchConf(string name, string val);
};

#endif
