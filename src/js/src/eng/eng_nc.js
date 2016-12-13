// (C) 2016


'use strict';


function eng_nc_ping(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id, 'ping'].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        
        ext_cb(resp);
    };

    ajx_send_command(cmd, int_cb, pulse);
}


function eng_nc_login(ext_cb, email, url, pulse)
{
    var cmd = ['login', email, url].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}


function eng_nc_logout(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id, 'logout'].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}


function eng_nc_profile(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id, 'profile'].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let profile = null;

        if (resp == PHENOD.OK) {
            profile = eng_get_parsed_profile(data);
        }

        ext_cb(resp, profile);
    };

    ajx_send_command(cmd, int_cb, pulse);
}


function eng_nc_name(ext_cb, user_id, name, pulse)
{
    //console.log(window.btoa(name));
    var cmd = ['au', user_id, 'name', window.btoa(name)].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function eng_nc_ds_list(ext_cb, user_id) {
    var cmd = ['au', user_id, 'dataset', 'list' ].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let list = {};

        list.n = 0;
        list.id = [];
        list.title = [];

        if (resp == PHENOD.OK) {
            list = eng_get_ds_list(data);        
        }
        
        ext_cb(resp, list);
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}


function eng_nc_ds_create(ext_cb, user_id) {
    var cmd = ['au', user_id, 'dataset', 'create' ].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}


function eng_nc_ds_delete(ext_cb, user_id, ds_id) {
    var cmd = ['au', user_id, 'dataset', 'delete', ds_id].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}


function eng_nc_ds_get(ext_cb, user_id, ds_id) {
    var cmd = ['au', user_id, 'dataset', 'get', ds_id].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let ds = {};
        
        ds.id = '';
        ds.title = '';
        ds.descr = '';
        
        if (resp = PHENOD.OK) {
            ds = eng_get_ds_get(data);
        }
        
        ext_cb(ds);
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}

