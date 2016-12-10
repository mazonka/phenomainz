#ifndef __PH_DB_H
#define __PH_DB__H

#include <string>
#include "gl_utils.h"

using std::string;

struct Profile
{
    string prid;
    string name;
    string mail;
    string last;
    string cntr;

    string str() const;  // for net comm
    string dump() const; // for debug output
};

class Phdb
{
        void schema();
    public:
        bool get_by_email(string email, Profile & pr);
        bool new_email(string email);
        bool update_name(const Profile & pr, string newname);
        void access(string mail);

        void dataset_new(string prid);
        int dataset_list(string prid, gl::vstr & ids, gl::vstr & tis);
        void dataset_del(string prid, string daid);
        void dataset_tit(string prid, string daid, string tit);
};

#endif
