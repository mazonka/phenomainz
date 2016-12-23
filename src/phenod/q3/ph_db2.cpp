#include <iostream>

#include <fstream>

#include "os_filesys.h"
#include "os_timer.h"
#include "sg_cout.h"
#include "gl_except.h"
#include "gl_utils.h"
#include "ma_utils.h"

#include "dbo.h"
#include "ph_db.h"


string Phdb::ds_file_descr(string daid, string fiid)
{
    Dbo db;
    string ss = "select desc from files where daid='$1' and id='$2'";
    args(ss, daid, fiid);

    db.execth(ss);

    if ( db.result.size() != 2 ) return "";

    gl::vstr rc = *(++db.result.begin());
    if ( rc.empty() ) return "";
    return rc[0];
}

void Phdb::ds_file_descr(string daid, string fiid, string descr)
{
    Dbo db;
    string ss = "update files set desc='$3' where daid='$1' and id='$2'";
    args(ss, daid, fiid, descr);
    db.execth(ss);
}

