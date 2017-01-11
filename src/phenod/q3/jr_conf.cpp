#include <fstream>

#include "gl_err.h"
#include "gl_except.h"
#include "gl_utils.h"

#include "jr_conf.h"

string jraf::ph_conf = "conf.phd";

void jraf::testConf()
{
    string a = gl::file2str(ph_conf);
    if ( a.empty() ) throw gl::ex("Cannot open: " + ph_conf);
}


string jraf::loadConf(string name)
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

bool jraf::matchConf(string name, string val)
{
    std::ifstream in(ph_conf.c_str());
    while (in)
    {
        string k, v;
        in >> k >> v;
        if ( k == name && v == val ) return true;
    }

    return false;
}

