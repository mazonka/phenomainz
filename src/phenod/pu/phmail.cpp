// Hasq Technology Pty Ltd (C) 2013-2016

#include <iostream>

#include "gl_protocol.h"

#include "os_net.h"
#include "os_thread.h"

#include "sg_cout.h"
#include "sg_testing.h"

#include "hq_logger.h"
#include "hq_config.h"
#include "hq_console.h"
#include "hq_publisher.h"

#include "hq_platform.h"

int main(int ac, const char * av[]) try
{
    if( ac != 3 ) throw gl::ex("Usage: phmain cmd arg");

    os::Cout()<<"AAA";

    return 0;
}
catch (gl::Exception e)
{
    std::cout << "Error: " << e.str() << '\n';

    return 0;
}
catch (string s)
{
    std::cout << s << '\n';
    return 0;
}
