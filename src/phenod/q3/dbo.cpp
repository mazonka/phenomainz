#include <iostream>

#include "os_filesys.h"
#include "gl_utils.h"

#include "dbo.h"
///#include "ut.h"

using namespace std;

Dbo::Dbo(const string &name):
	db(), zErrMsg(0), zErrNum(0), zErrCmd(), result()
{
	if( name=="" )
	throw string()+"database not specified";

	if( !os::isFile(name) ) throw "Bad database ["+name+"]";

	int rc = sqlite3_open(name.c_str(), &db);
	if( rc )
	{
		sqlite3_close(db);
		throw string()+"Can't open database: "+sqlite3_errmsg(db);
	}
}

bool Dbo::exec(const string &cmd)
{
  gl::vstr arr = gl::str2vstr(cmd,';');

  if( arr.size() == 1 )
  {
    result.clear();
    zErrNum = sqlite3_exec(db, cmd.c_str(), callback, this, &zErrMsg);
    if( zErrNum != SQLITE_OK ){ zErrCmd = cmd; return false; }

    return true;
  }

  // here we have several commands

  zErrNum = sqlite3_exec(db, "BEGIN TRANSACTION", callback, this, &zErrMsg);
  if( zErrNum != SQLITE_OK ){ zErrCmd = "BEGIN"; return false; } 

  for( gl::vstr::iterator i=arr.begin(); i!=arr.end(); ++i )
  {
    result.clear();
    zErrNum = sqlite3_exec(db, i->c_str(), callback, this, &zErrMsg);
    if( zErrNum != SQLITE_OK )
    {
	zErrNum = sqlite3_exec(db, "ROLLBACK TRANSACTION", callback, this, 0);
	zErrCmd = *i;
	return false;
    }
  }

  zErrNum = sqlite3_exec(db, "COMMIT TRANSACTION", callback, this, 0);
  if( zErrNum != SQLITE_OK ){ zErrCmd = "COMMIT"; return false; }

  return true;
}

Dbo::~Dbo()
{
  sqlite3_close(db);
}


int Dbo::callback(void *data, int argc, char **argv, char **col)
{
  Dbo * db = static_cast<Dbo*>(data);

  vector<string> v;

  if( db->result.empty() )
  {
    for(int i=0; i<argc; i++)
      v.push_back(col[i]);

    db->add2res(v);
    v.clear();
  }

  for(int i=0; i<argc; i++)
  {
    if( argv[i] ) v.push_back(argv[i]);
    else v.push_back("");
  }

  db->add2res(v);

  return 0; // proceed (not abort)
}

string Dbo::getid(string s)
{
  int rt = sqlite3_exec(db, "begin transaction", 0, 0, 0);
  if( rt!=SQLITE_OK ) throw string("Dbo::getid")+ " - 'begin transaction' failed";

	string cmd = string()+ "select mid from maxid where tbl='" + s +"'";

	if( !exec(cmd) )
		throw string("Dbo::getid")+ " ["+cmd+"] - failed 1";

	if( result.size() != 2 )
		throw string("Dbo::getid")+ " ["+cmd+"] - failed 2";

	gl::vstr rc = *(++result.begin());

	if( rc.size() != 1 )
		throw string("Dbo::getid")+ " ["+cmd+"] - failed 3";

	string r = rc[0];

	cmd = string()+
	"update maxid set mid=" + gl::tos(gl::toi(r)+1) + " where tbl='"+s+"'";

	if( !exec(cmd) )
		throw string("Dbo::getid")+" failed 4";

	rt = sqlite3_exec(db, "commit transaction", 0, 0, 0);
	if( rt!=SQLITE_OK ) throw string("Dbo::getid")+ " - 'commit transaction' failed";

	return r;
}

string Dbo::err()
{
	string e = "Command={";
	e += zErrCmd + "} ";
	e += gl::int2str(zErrNum) + " (" + (zErrMsg?zErrMsg:"") +")";
	return e;
}

