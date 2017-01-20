// (C) 2016
'use strict';

function wid_jraf_js(){}


function wid_jraf_create_udir()
{
    var dir = '.jraf.sys/users';
    
    jraf_create_dir(g_jraf_root, dir, function (a) { console.log(a)})
}
