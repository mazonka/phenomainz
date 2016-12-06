
#include <fstream>

#include "os_filesys.h"
#include "sg_cout.h"
#include "gl_except.h"
#include "gl_utils.h"

#include "dbo.h"
#include "ph_db.h"

bool Phdb::get_by_email(string email, Profile & pr)
{

///    os::Cout() << "AAA entering Phdb::get_by_email" << os::endl;

    if ( !os::isFile(Dbo::dbname) ) return false;

    Dbo db;

    string ss = "select * from users where email='" + email + "'";

    if ( !db.exec(ss) )
    {
        os::Cout() << "Phdb::get_by_email: Db exec FAILED " << db.err() << os::endl;
        return false;
    }

    os::Cout() << "Db exec OK " << db.result.size() << os::endl;

    //for ( auto v : db.result ) for ( auto s : v ) os::Cout() << "[" << string(s) << "]" << os::endl;

    if ( db.result.size() != 2 )
        throw gl::ex(string("Phdb::get_by_email") + " [" + ss + "] - failed 2");

    gl::vstr rc = *(++db.result.begin());

    if ( rc.size() != 5 )
        throw gl::ex(string("Phdb::get_by_email") + " [" + ss + "] - failed 3");

    pr.pro_id = rc[0];
    pr.name =   rc[1];
    pr.email =  rc[2];
    pr.last =   rc[3];
    pr.cntr =   rc[4];

    return true;
}

bool Phdb::new_email(string email)
{
    if ( !os::isFile(Dbo::dbname) ) schema();
    if ( !os::isFile(Dbo::dbname) ) throw gl::ex("Cannot create " + Dbo::dbname);

    Dbo db;

    string ss = "insert into users (email) values ('" + email + "')";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";

    string id = db.getid("users", "email", email);

    os::Cout() << "AAA new_email " << id << os::endl;
    return true;
}

void Phdb::schema()
{
    {
        std::ofstream of(Dbo::dbname.c_str());
    }

    Dbo db;

    string ss;

    ss = "BEGIN TRANSACTION;";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE users (id INTEGER PRIMARY KEY, "
         "name TEXT, email TEXT, last TEXT, cnt TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE maxid (id INTEGER PRIMARY KEY, tbl TEXT, val TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "COMMIT;";
    if ( !db.exec(ss) ) goto bad;

    return;
bad:
    throw gl::ex("Database creation failed " + db.err());

}

