#ifndef __PH_DB_H
#define __PH_DB_H

#include <string>
#include <vector>
#include <map>
#include "gl_utils.h"

using std::string;

struct Profile
{
    string prid;
    string name;
    string mail;
    string last;
    string cntr;
    string quot;

    string str() const;  // for net comm
    string dump() const; // for debug output
};

class Phdb
{
        void schema();
        static void args(string & ss, string s1, string s2 = "",
                         string s3 = "", string s4 = "",
                         string s5 = "", string s6 = "");

    public:
        Phdb(string dbf);

        bool auth(string prid, string daid);

        bool get_by_email(string email, Profile & pr);
        bool new_email(string email);
        bool update_name(const Profile & pr, string newname);
        void access(string mail);

        int dataset_list(string prid, gl::vstr & ids, gl::vstr & tis,
                         std::map<string, gl::vstr> & fnames);

        void dataset_new(string prid);
        void dataset_del(string prid, string daid);
        void dataset_upd(string prid, string daid, string field, string val);
        string dataset_get(string prid, string daid);
        string keywords();
        void keyw_new(string kw);
        void keyw_ch(string kwo, string kwn);
        void cat_new(string cat, string par);
        string cat_kids(string parid);
        void cat_ch(string catid, string newname);
        void dataset_addkw(string prid, string daid, string kname);
        void dataset_delkw(string prid, string daid, string kname);
        int ds_file_list(string daid, string fiid, gl::vstr & ids, gl::vstr & des);
        string ds_file_new(string prid, string daid);
        void ds_file_del(string prid, string daid, string fiid);
        string dataset_cols(string daid);

        struct ColDesc { string n, xy, name, unit, desc; };
        void dataset_setc(string daid, const std::vector<ColDesc> & v);

        string ds_file_descr(string daid, string fiid);
        void ds_file_descr(string daid, string fiid, string descr);
};

inline string star(string s, string d = "Kg==")
{
    return s.empty() ? d : s;
}

class Dbo;
void dump(bool y, Dbo & db);

#endif
