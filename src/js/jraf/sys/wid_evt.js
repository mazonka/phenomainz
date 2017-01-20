// (C) 2016
'use strict';

function wid_evt_js(){}

function evt_click_name()
{
    wid_open_name_window(name, $(this).html());
}

function evt_keyup_esc(e)
{
    e.keyCode == 27 && wid_init_modal_window(false);
}

function evt_click_create_users_dir()
{
    var dpath = '/.jraf.sys/users';
    
    jraf_create_dir(g_jraf_root, dpath, function () {console.log() })
}
