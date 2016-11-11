#ifndef __PH_DB_H
#define __PH_DB__H

#include <string>

using std::string;

struct Profile
{
    string pro_id;
    string name;
    string email;
    string last;
    string cnt;
    string dump() const;
};

class Phdb
{
    public:
        bool get_by_email(string email, Profile & pr);
        bool new_email(string email);
};

#endif
