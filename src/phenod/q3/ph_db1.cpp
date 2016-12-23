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

void dump(bool y, Dbo & db)
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

void Phdb::args(string & ss, string s1, string s2,
                string s3, string s4, string s5, string s6)
{
    gl::replaceAll(ss, "$1", s1);
    if ( s2.empty() ) return; gl::replaceAll(ss, "$2", s2);
    if ( s3.empty() ) return; gl::replaceAll(ss, "$3", s3);
    if ( s4.empty() ) return; gl::replaceAll(ss, "$4", s4);
    if ( s5.empty() ) return; gl::replaceAll(ss, "$5", s5);
    if ( s6.empty() ) return; gl::replaceAll(ss, "$6", s6);
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
    db.execth(ss);

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

    ss = "CREATE TABLE datas (id INTEGER PRIMARY KEY, prid TEXT, "
         "titl TEXT, desc TEXT, catg TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE categ (id INTEGER PRIMARY KEY, name TEXT, caid TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE klist (id INTEGER PRIMARY KEY, keyw TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE keyds (id INTEGER PRIMARY KEY, daid TEXT, keid TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE files (id INTEGER PRIMARY KEY, daid TEXT, desc TEXT);";
    if ( !db.exec(ss) ) goto bad;

    ss = "CREATE TABLE colmn (id INTEGER PRIMARY KEY, daid TEXT, "
         "coln TEXT, xy TEXT, name TEXT, unit TEXT, desc TEXT);";
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
    string ss = "update users set name='" + nn + "' where id='" + pr.prid + "'";
    db.execth(ss);
    return true;
}

void Phdb::access(string em)
{
    Dbo db;
    string tim  = os::Timer::getGmd() + os::Timer::getHms();
    string ss = "update users set last='" + tim + "' where mail='" + em + "'";
    db.execth(ss);

    ss = "update users set cntr=cntr+1 where mail='" + em + "'";
    db.execth(ss);
}

void Phdb::dataset_new(string prid)
{
    Dbo db;
    string ss = "insert into datas (prid) values ('" + prid + "')";
    db.execth(ss);
}


int Phdb::dataset_list(string prid, gl::vstr & ids, gl::vstr & tis)
{
    Dbo db;

    string ss = "select id,titl from datas where prid='" + prid + "'";
    db.execth(ss);

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
    if ( !auth(prid, daid) ) return;

    // FIXME check that there are no files
    // FIXME remove colmn records

    Dbo db;

    // removing keywords
    string ss = "delete from keyds where daid='$1'";
    args(ss, daid);
    db.execth(ss);

    // removing columns
    ss = "delete from colmn where daid='$1'";
    args(ss, daid);
    db.execth(ss);

    ss = "delete from datas where prid='$1' and id='$2'";
    args(ss, prid, daid);
    db.execth(ss);
}

void Phdb::dataset_upd(string prid, string daid, string field, string val)
{
    if (0) {}
    else if ( field == "title" ) field = "titl";
    else if ( field == "descr" ) field = "desc";
    else if ( field == "categ" ) field = "catg";

    else
        //if ( field != "title" && field != "descr" && field != "categ" )
    {
        os::Cout() << "Bad field in Phdb::dataset_upd [" << field << "]" << os::endl;
        return;
    }

    Dbo db;

    // first check if category is correct
    if ( field == "catg" )
    {
        string ss = "select id from categ where id='$1'";
        args(ss, val);
        db.execth(ss);
        if ( db.result.size() < 2 ) return;
    }

    string ss = "update datas set $1='$2' where prid='$3' and id='$4'";

    args(ss, field, val, prid, daid);

    db.execth(ss);
}

string Phdb::dataset_get(string prid, string daid)
{
    Dbo db;
    string ss = "select * from datas where prid='$1' and id='$2'";
    args(ss, prid, daid);
    db.execth(ss);

    dump(0, db);

    if ( db.result.size() != 2 )
    {
        os::Cout() << "Phdb::dataset_get failed" << os::endl;
        return "";
    }

    gl::vstr rz = *(++db.result.begin());

    // id, prid, title, descr, caid
    if ( rz.size() != 5 )
        throw gl::ex(string("Phdb::dataset_get") + " [" + ss + "] - bad size");

    string r;
    r += star(rz[0]) + ' '; // daid
    r += star(rz[2]) + ' '; // title
    r += star(rz[3]) + ' '; // descr
    //r += star(rc[4], "0");

    string caid = star(rz[4], "0");

    if ( caid == "0" ) r += ":";
    else
    {
        string cat_names;
        while (caid != "0")
        {
            ss = "select name,caid from categ where id='$1'";
            args(ss, caid);
            db.execth(ss);
            if ( db.result.size() != 2 )
            {
                os::Cout() << "Phdb::dataset_get failed - 2" << os::endl;
                cat_names = ":";
                break;
            }

            gl::vstr rc = *(++db.result.begin());

            if ( rc.size() != 2 ) // name, caid
                throw gl::ex("Phdb::dataset_get - bad size");

            string ptid = star(rc[1], "0");
            string name = star(rc[0]);
            cat_names += ":" + caid + ":" + name;
            caid = ptid;
        }

        r += cat_names;
    } // caid

    ss = "select keid from keyds where daid='$1'";
    args(ss, daid);
    db.execth(ss);

    Table result = db.result;

    r += ' ';

    if ( result.size() == 0 )
        r += ":";
    else
    {
        result.erase(result.begin());

        for ( auto & rc : result )
        {
            if ( rc.size() != 1 )
                throw gl::ex(string("Phdb::dataset_get") + " [" + ss + "] - failed 31");

            string keid = rc[0];

            ss = "select keyw from klist where id='" + keid + "'";
            db.execth(ss);

            if ( db.result.size() != 2 )
            {
                os::Cout() << "Phdb::dataset_get" << " [" << ss << "] - failed 41" << os::endl;
                break;
                //throw gl::ex(string("Phdb::keywords") + " [" + ss + "] - failed 4");
            }

            gl::vstr rx = *(++db.result.begin());
            if ( rx.size() != 1 ) continue;
            r += ":" + rx[0];
        }
    }

    return r;
}

string Phdb::keywords()
{
    Dbo db;
    string r;

    string ss = "select keyw from klist";
    db.execth(ss);

    if ( db.result.empty() ) return "0";

    if ( db.result.size() < 2 )
        throw gl::ex(string("Phdb::keywords") + " [" + ss + "] - failed 2");

    db.result.erase(db.result.begin());

    r += gl::tos(db.result.size());

    for ( auto & rc : db.result )
    {
        if ( rc.size() != 1 )
            throw gl::ex(string("Phdb::keywords") + " [" + ss + "] - failed 3");

        r += ' ';
        r += star(rc[0]);
    }

    return r;
}

void Phdb::keyw_new(string kw)
{
    Dbo db;
    string ss = "select keyw from klist where keyw='" + kw + "'";
    db.execth(ss);

    if ( !db.result.empty() ) return;

    ss = "insert into klist (keyw) values ('" + kw + "')";
    db.execth(ss);
}

void Phdb::keyw_ch(string kwo, string kwn)
{
    Dbo db;
    string ss = "update klist set keyw='$1' where keyw='$2'";
    args(ss, kwn, kwo);
    db.execth(ss);
}

void Phdb::cat_new(string cat, string par)
{
    Dbo db;
    string ss = "select name from categ where name='$1' and caid='$2'";
    args(ss, cat, par);
    db.execth(ss);

    if ( !db.result.empty() ) return;

    ss = "insert into categ (name,caid) values ('$1','$2')";
    args(ss, cat, par);
    db.execth(ss);
}

string Phdb::cat_kids(string parid)
{
    Dbo db;
    string r;

    string ss = "select * from categ where caid='$1'";
    args(ss, parid);
    db.execth(ss);

    if ( db.result.empty() ) return "0";

    if ( db.result.size() < 2 )
        throw gl::ex(string("Phdb::cat_kids") + " [" + ss + "] - failed 2");

    db.result.erase(db.result.begin());

    r += gl::tos(db.result.size());

    for ( auto & rc : db.result )
    {
        if ( rc.size() != 3 )
            throw gl::ex(string("Phdb::cat_kids") + " [" + ss + "] - failed 3");

        r += ' ';
        r += star(rc[0]);
        r += ' ';
        r += star(rc[1]);
        r += ' ';
        r += star(rc[2]);
    }

    return r;
}

void Phdb::cat_ch(string catid, string newname)
{
    Dbo db;
    string ss = "update categ set name='$1' where id='$2'";
    args(ss, newname, catid);
    db.execth(ss);
}

bool Phdb::auth(string prid, string daid)
{
    Dbo db;
    string ss = "select * from datas where prid='$1' and id='$2'";
    args(ss, prid, daid);
    db.execth(ss);

    if ( db.result.size() != 2 )
    {
        os::Cout() << "Phdb::auth failed" << os::endl;
        return false;
    }

    return true;
}

void Phdb::dataset_addkw(string prid, string daid, string kname)
{
    if ( !auth(prid, daid) ) return;

    Dbo db;
    string ss = "select id from klist where keyw='$1'";
    args(ss, kname);
    db.execth(ss);

    if ( db.result.size() != 2 )
    {
        os::Cout() << "Phdb::dataset_addkw failed" << os::endl;
        return;
    }

    gl::vstr rc = *(++db.result.begin());
    if ( rc.empty() ) return;
    string keid = rc[0];

    ss = "select * from keyds where daid='$1' and keid='$2'";
    args(ss, daid, keid);
    db.execth(ss);

    if ( db.result.size() > 1 ) return;

    ss = "insert into keyds (daid,keid) values ('$1','$2')";
    args(ss, daid, keid);
    db.execth(ss);
}

void Phdb::dataset_delkw(string prid, string daid, string kname)
{
    if ( !auth(prid, daid) ) return;

    Dbo db;
    string ss = "select id from klist where keyw='$1'";
    args(ss, kname);
    db.execth(ss);

    if ( db.result.size() != 2 )
    {
        os::Cout() << "Phdb::dataset_addkw failed" << os::endl;
        return;
    }

    gl::vstr rc = *(++db.result.begin());
    if ( rc.empty() ) return;
    string keid = rc[0];

    ss = "delete from keyds where daid='$1' and keid='$2'";
    args(ss, daid, keid);
    db.execth(ss);
}

string Phdb::ds_file_list(string daid, string fiid)
{
    Dbo db;
    string ss = "select id,desc from files where daid='$1'";
    args(ss, daid);

    if ( !fiid.empty() )
        ss += " and id='" + fiid + "'";

    db.execth(ss);

    if ( db.result.size() < 2 ) return "0";

    db.result.erase(db.result.begin());

    string r;

    r += gl::tos(db.result.size());

    for ( auto & rc : db.result )
    {
        if ( rc.size() != 2 )
            throw gl::ex(string("Phdb::ds_file_list") + " [" + ss + "] - failed 1");

        r += ' ' + star(rc[0]);
        r += ' ' + star(rc[1]);
    }

    return r;
}


string Phdb::ds_file_new(string prid, string daid)
{
    if ( !auth(prid, daid) ) return "0";

    Dbo db;
    string ss = "insert into files (daid) values ('$1')";
    args(ss, daid);
    db.execth(ss);

    ss = "select last_insert_rowid()";
    db.execth(ss);

    dump(0, db);

    if ( db.result.size() != 2 )
    {
        os::Cout() << "Phdb::ds_file_new failed" << os::endl;
        return "0";
    }

    gl::vstr rc = *(++db.result.begin());
    if ( rc.empty() ) return "0";
    return rc[0];
}

void Phdb::ds_file_del(string prid, string daid, string fiid)
{
    if ( !auth(prid, daid) ) return;

    Dbo db;
    string ss = "delete from files where daid='$1' and id='$2'";
    args(ss, daid, fiid);
    db.execth(ss);
}

string Phdb::dataset_cols(string daid)
{
    Dbo db;
    string ss = "select * from colmn where daid='$1'";
    args(ss, daid);

    db.execth(ss);

    if ( db.result.size() < 2 ) return "0";

    db.result.erase(db.result.begin());

    string r;

    r += gl::tos(db.result.size());

    // id, daid, coln, xy, name, unit, desc
    for ( auto & rc : db.result )
    {
        if ( rc.size() != 7 )
            throw gl::ex(string("Phdb::ds_file_list") + " [" + ss + "] - failed 1");

        r += ' ' + star(rc[2]);
        r += ' ' + star(rc[3]);
        r += ' ' + star(rc[4]);
        r += ' ' + star(rc[5]);
        r += ' ' + star(rc[6]);
    }

    return r;
}


void Phdb::dataset_setc(string daid, const std::vector<ColDesc> & v)
{
    for ( auto c : v )
    {
        Dbo db;
        string ss = "select id from colmn where daid='$1' and coln='$2'";
        args(ss, daid, c.n);
        db.execth(ss);

        if ( db.result.size() < 2 )
        {
            // no record
            ss = "insert into colmn (daid,coln,xy,name,unit,desc) "
                 "values ('$1','$2','$3','$4','$5','$6')";
        }
        else
        {
            // record exists
            ss = "update colmn set xy='$3',name='$4',unit='$5',"
                 "desc='$6' where daid='$1' and coln='$2'";
        }

        args(ss, daid, c.n, c.xy, c.name, c.unit, c.desc);
        db.execth(ss);
    }
}

