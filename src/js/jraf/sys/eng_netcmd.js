// (C) 2016
'use strict';

function eng_netcmd_js(){}
var g_sys_loaded_eng_netcmd = 1;

function nc_profile(ext_cb, sid, pulse)
{
    var cmd = ['jraf profile', sid].join(' ');
    var int_cb = function(data)
    {
        let resp = eng_get_resp(data);
        let _data = eng_get_data(data);
        let profile = eng_get_parsed_profile(_data[0]);

        ext_cb(resp, data, profile);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_login(ext_cb, email, url, pulse)
{
    var cmd = ['jraf login', email].join(' ');
    var int_cb = function(data)
    {
        ext_cb(eng_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_logout(ext_cb, sid, pulse)
{
    var cmd = ['jraf logout', sid].join(' ');
    var int_cb = function(data)
    {
        ext_cb(eng_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_ping(ext_cb, sid, pulse)
{
    var cmd = 'jraf ping';
    var int_cb = function(data)
    {
        let resp = eng_get_resp(data);
        let _data = eng_get_data(data);
        let profile = eng_get_parsed_profile(_data[0]);

        ext_cb(resp, data, profile);
    };

    ajx_send_command(cmd, int_cb, pulse);
}