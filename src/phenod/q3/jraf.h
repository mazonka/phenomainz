#ifndef __JRAF_H
#define __JRAF_H

#include <string>
#include <vector>
#include <map>
#include "gl_utils.h"
#include "hq_access.h"

using std::string;

class Jraf
{
	hq::AccessController ac;
public:
	Jraf(){}

	string request();
};


#endif
