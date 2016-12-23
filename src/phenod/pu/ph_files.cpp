// Hasq Technology Pty Ltd (C) 2013-2016

#include <fstream>

#include "sg_cout.h"
#include "ph_files.h"

os::Path ds_file1(string daid)
{
    os::Path f = "files";
    f += gl::tos(10000 + gl::toi(daid));
    return f;
}

os::Path ds_file2(os::Path f, string fiid)
{
    f += gl::tos(10000 + gl::toi(fiid));
    return f;
}

gl::intint ds_file_put(string daid, string fiid, string pos, const string & s)
{
    ///os::Path f = "files";
    ///f += gl::tos(10000+gl::toi(daid));
    os::Path f = ds_file1(daid);
    os::FileSys::trymkdir(f);

    if ( !f.isdir() )
        return -2;

    ///f += gl::tos(10000+gl::toi(fiid));
    f = ds_file2(f, fiid);

    if ( !f.isfile() ) { std::ofstream of(f.str().c_str()); }

    int fsz = f.filesize();

    if ( fsz != gl::toi(pos) )
        return fsz;

    {
        std::ofstream of(f.str().c_str(), std::ios::app);
        of << s;
    }

    return f.filesize();
}

void ds_file_del(string daid, string fiid)
{
    os::Path f = ds_file1(daid);
    f = ds_file2(f, fiid);
    f.erase();
}

gl::intint calc_usage(std::map<string, gl::vstr> & fnames)
{
    gl::intint us = 0;

    for ( auto & daid : fnames )
    {
        for ( auto & fiid : daid.second )
        {
            os::Path f = ds_file1(daid.first);
            f = ds_file2(f, fiid);
			int sz = f.filesize();
            us += (gl::intint)(unsigned)sz;
        }
    }

    return us;
}

