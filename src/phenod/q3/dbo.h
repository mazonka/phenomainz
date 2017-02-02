#ifndef DBO_H
#define DBO_H

#include <string>
#include <list>
#include <vector>


// the following ifdefs are only compilation workaround to disable
// ms warnings from sqlite3 library
// the ifdef blocks can be removed without any functional change
#ifdef _CRT_SECURE_NO_DEPRECATE
#pragma warning(push)
#pragma warning(disable:4510)
#pragma warning(disable:4512)
#pragma warning(disable:4610)
#endif

#include "sqlite3.h"

#ifdef _CRT_SECURE_NO_DEPRECATE
#pragma warning(pop)
#endif


using std::string;

typedef std::list< std::vector<string> > Table;

class Dbo
{
        static const bool LOG = true;
        static const bool SEL = true;

        sqlite3 * db;
        char * zErrMsg;
        int zErrNum;
        string zErrCmd;

        // forbid copy construction and assigment
        Dbo & operator=(const Dbo & rhs);
        Dbo(const Dbo & rhs);

    public:
        static string dbname;

        Table result;


        //! @b function which is called on select. It populates data in result table
        //! @p o Dbo object
        //! @p argc number of elements
        //! @p argv pointer to a vector of strings - calls
        //! @p azColName pointer to a vector of strings - column names
        //! @r 0 to proceed, non-0 to abort
        static int callback(void * o, int argc, char ** argv, char ** azColName);


        //! @b adds a record to the result table
        //! @p rc record to add
        void add2res(const std::vector<string> & rc) { result.push_back(rc); }

    public:

        //! @b ctor. Thorws the exception if database file is not accessible
        //! @p name is the name of database file
        explicit Dbo(const string & name);
        explicit Dbo() : Dbo(dbname) {}

        //! @b dtor
        ~Dbo();

        //! @b execute SQL command
        //! @p cmd command, e.g. "select * from tbl"
        //! @r true if success, false if not (use err() to get error message)
        bool exec(const string & cmd);
        void execth(const string & ss)
        {
            if ( !exec(ss) )
                throw "SQL failed [" + ss + "]";
        }

        //! @b obtain last error message
        //! @r message
        string err();

        //! @b swap the result table. This is useful way to export the result
        //! to the client execution space
        //! @p t bogus table
        void swap(Table & t) { result.swap(t); }

        string getid(string tbl, string fld, string val);
};

#endif
