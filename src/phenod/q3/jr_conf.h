#ifndef __JR_CONF_H
#define __JR_CONF_H

#include <string>

using std::string;

namespace jraf
{
extern string ph_conf;
void testConf();
string loadConf(string name);
bool matchConf(string name, string val);
} // jraf

#endif
