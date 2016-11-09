// Hasq Technology Pty Ltd (C) 2013-2016

#ifndef _PH_GL_AUT
#define _PH_GL_AUT


struct AutObject
{
    gl::intint id;
    string email;
    AutObject(gl::intint x, string e): id(x), email(e) {}
};

class AutQueue
{
        std::deque<AutObject> aus;

        unsigned szMax;
        int findAob(gl::intint aid) const;
    public:
        void addAob(gl::intint jobId);
        AutObject getAob(gl::intint jid) const;
        AutQueue(unsigned sz): szMax(sz) {}
};

struct AutArea
{
	static string ph_conf;

    os::Semaphore access2autArea;
    AutQueue queue;
    AutArea(int sz): access2autArea(1), queue(sz) { testConf(); }
	void testConf();

    AutObject newAob(string email);
};

#endif
