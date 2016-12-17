
#include <fstream>

#include "os_filesys.h"
#include "os_timer.h"
#include "sg_cout.h"
#include "gl_except.h"
#include "gl_utils.h"
#include "ma_utils.h"

#include "dbo.h"
#include "ph_db.h"

inline string star(string s, string d="Kg==") 
{ 
	return s.empty() ? d : s; 
}

inline void dump(bool y, Dbo & db)
{
    if (y)
    {
        os::Cout() << "Db exec OK " << db.result.size() << os::endl;
        for ( auto v : db.result )
        {
            for ( auto s : v ) os::Cout() << " [" << string(s) << "]" << os::flush;
            os::Cout() <<  os::endl;
        }
    }
}

bool Phdb::get_by_email(string email, Profile & pr)
{
    if ( !os::isFile(Dbo::dbname) ) return false;

    Dbo db;

    string ss = "select * from users where mail='" + email + "'";

    if ( !db.exec(ss) )
    {
        os::Cout() << "Phdb::get_by_email: Db exec FAILED " << db.err() << os::endl;
        return false;
    }

    //os::Cout() << "Db exec OK " << db.result.size() << os::endl;
    //for ( auto v : db.result ) for ( auto s : v ) os::Cout() << "[" << string(s) << "]" << os::endl;

    if ( db.result.empty() ) return false; // no record

    if ( db.result.size() != 2 )
        throw gl::ex(string("Phdb::get_by_email") + " [" + ss + "] - failed 2");

    gl::vstr rc = *(++db.result.begin());

    if ( rc.size() != 5 )
        throw gl::ex(string("Phdb::get_by_email") + " [" + ss + "] - failed 3");

    pr.prid = rc[0];
    pr.name = rc[1];
    pr.mail = rc[2];
    pr.last = rc[3];
    pr.cntr = rc[4];

    return true;
}

bool Phdb::new_email(string email)
{
    if ( !os::isFile(Dbo::dbname) ) schema();
    if ( !os::isFile(Dbo::dbname) ) throw gl::ex("Cannot create " + Dbo::dbname);

    Dbo db;

    string ss = "insert into users (mail,cntr) values ('" + email + "','0')";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";

    string id = db.getid("users", "mail", email);

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
         "name TEXT, mail TEXT, last TEXT, cntr TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ///ss = "CREATE TABLE maxid (id INTEGER PRIMARY KEY, tbl TEXT, val TEXT);";
    ///if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE dataset (id INTEGER PRIMARY KEY, prid TEXT, "
         "title TEXT, descr TEXT, categ TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE categ (id INTEGER PRIMARY KEY, name TEXT, parent TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "COMMIT;";
    if ( !db.exec(ss) ) goto bad;

    return;
bad:
    throw gl::ex("Database creation failed " + db.err());
}


string Profile::str() const
{
    if ( mail.empty() ) throw "Profile::str name empty";

    string r;
    r = star(name) + ' ' + mail + ' ' + star(last) + ' ' + star(cntr);
    return r;
}


bool Phdb::update_name(const Profile & pr, string nn)
{
    if ( !gl::isb64(nn) )
    {
        os::Cout() << "Bad name in Phdb::update_name [" << nn << "]" << os::endl;
        return false;
    }

    Dbo db;
    ///nn = ma::b64dec(nn);
    string ss = "update users set name='" + nn + "' where id='" + pr.prid + "'";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";
    return true;
}

void Phdb::access(string em)
{
    Dbo db;
    string tim  = os::Timer::getGmd() + os::Timer::getHms();
    string ss = "update users set last='" + tim + "' where mail='" + em + "'";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";

    ss = "update users set cntr=cntr+1 where mail='" + em + "'";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";
}

void Phdb::dataset_new(string prid)
{
    Dbo db;
    string ss = "insert into dataset (prid) values ('" + prid + "')";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";
}


int Phdb::dataset_list(string prid, gl::vstr & ids, gl::vstr & tis)
{
    Dbo db;

    string ss = "select id,title from dataset where prid='" + prid + "'";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";

    if ( db.result.empty() ) return 0;

    if ( db.result.size() < 2 )
        throw gl::ex(string("Phdb::dataset_list") + " [" + ss + "] - failed 2");

    db.result.erase(db.result.begin());

    for ( auto & rc : db.result )
    {
        if ( rc.size() != 2 )
            throw gl::ex(string("Phdb::dataset_list") + " [" + ss + "] - failed 3");

        ids.push_back(rc[0]);
        string x = rc[1];
        if ( x.empty() ) x = "Kg=="; // *
        tis.push_back(x);
    }

    return (int)db.result.size();
}

void Phdb::dataset_del(string prid, string daid)
{
    Dbo db;
    string ss = "delete from dataset where prid='"
                + prid + "' and id='" + daid + "';";
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";
}

void Phdb::dataset_upd(string prid, string daid, string field, string val)
{
    if ( field != "title" && field != "descr" && field != "categ" )
    {
        os::Cout() << "Bad field in Phdb::dataset_upd [" << field << "]" << os::endl;
        return;
    }

    if ( !gl::isb64(val) )
    {
        os::Cout() << "Bad val in Phdb::dataset_upd [" << val << "]" << os::endl;
        return;
    }

    Dbo db;
    string ss = "update dataset set $1='$2' where prid='$3' and id='$4';";

    gl::replaceAll(ss, "$1", field);
    gl::replaceAll(ss, "$2", val);
    gl::replaceAll(ss, "$3", prid);
    gl::replaceAll(ss, "$4", daid);

    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";
}

string Phdb::dataset_get(string prid, string daid)
{
    Dbo db;
    string ss = "select * from dataset where prid='$3' and id='$4';";
    gl::replaceAll(ss, "$3", prid);
    gl::replaceAll(ss, "$4", daid);
    if ( !db.exec(ss) ) throw "SQL failed [" + ss + "]";

    dump(0,db);

    if ( db.result.size() != 2 )
    {
        os::Cout() << "Phdb::dataset_get failed" << os::endl;
        return "";
    }

    gl::vstr rc = *(++db.result.begin());

    // id, prid, title, descr, caid
    if ( rc.size() != 5 )
        throw gl::ex(string("Phdb::dataset_get") + " [" + ss + "] - bad size");

    string r;
    r += star(rc[0]) + ' '; // daid
    r += star(rc[2]) + ' '; // title
    r += star(rc[3]) + ' '; // descr
    r += star(rc[4],"0");

    return r;
}

