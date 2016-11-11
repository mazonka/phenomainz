// Hasq Technology Pty Ltd (C) 2013-2016

#ifndef _PH_GL_AUT
#define _PH_GL_AUT

#include <map>

struct Profile
{
    string name;
    string email;
    string au_tm_last;
    int au_count;
    string dump() const;
};

struct AutObject
{
    string ses_id;
    string pro_id;
    Profile profile;
    AutObject(string x, string e): ses_id(x), pro_id(e) {}
};

class AutQueue
{
        std::map<string, AutObject> aus;

        unsigned szMax;
        int findAob(gl::intint aid) const;
    public:
        void addAob(gl::intint jobId);
        AutObject getAob(gl::intint jid) const;
        AutQueue(unsigned sz): szMax(sz) {}

        void remove_by_email(string);
        string dump() const;
};

struct AutArea
{
    static string ph_conf;

    os::Semaphore access2autArea;
    AutQueue que;
    AutArea(int sz): access2autArea(1), que(sz) { testConf(); }
    void testConf();

    AutObject newAob_email(string id, string email);

    static string dump_safe(GlobalSpace * gs);
};

#endif
