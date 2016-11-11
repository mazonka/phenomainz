// Copyright (c) 2007 Davtec IT Pty Ltd. All Rights Reserved.
//

// Reviewed 0

#include <iostream>
#include <fstream>
#include <string>
#include <stdlib.h>
#include <stdio.h>
using std::string;

#include "os_filesys.h"
#include "gl_utils.h"


#include "dbo.h"

using namespace std;

istream * in = &cin;

int main(int ac, char * av[])
{

    int ret = 0;

    try
    {
        string dbname = "phenod.db";

        if ( dbname == "" ) throw string() + "Empty database name";

        if ( !os::isFile(dbname) )
        {
            ofstream of(dbname.c_str());
        }

        Dbo db(dbname);

        if ( ac > 1 ) // assume filename provided
        {
            in = new ifstream(av[1]);
            if ( !*in ) throw string("Failed to open [") + av[1] + "]";
        }

        int line = 1;
        while (1)
        {
            string ss, s;
readmore:
            getline(*in, s);
            if ( !*in ) return ret;

            cout << line++ << " [" << s << "] ";

            if ( s == "" || s[0] == '#' ) { cout << '\n'; continue; }

            gl::eatEndl(s);

            if ( s[s.size() - 1] == '\\' )
            {
                s.erase(s.size() - 1, 1);
                ss += s;
                goto readmore;
            }
            else ss += s;

            if ( !db.exec(ss) )
            {
                cout << "FAILED " << db.err() << '\n';
                ret = 2;
                continue;
            }

            cout << "OK\n";

            for (Table::iterator i = db.result.begin();
                    i != db.result.end(); ++i )
            {
                for (gl::vstr::iterator j = i->begin(); j != i->end(); ++j )
                {
                    if ( j != i->begin() ) cout << ',';
                    cout << *j;
                }
                cout << '\n';
                if ( i == db.result.begin() ) cout << "--------------\n";
            }


        }
    }
    catch (string err)
    {
        std::cout << "ERROR " << err;
        return 7;
    }


    return ret;
}

