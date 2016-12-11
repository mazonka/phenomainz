// (C) 2016


'use strict';


function eng_nc_ping(ext_cb, uid, pulse)
{
    var cmd = ['au', uid, 'ping'].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let sign_in = false;
        
        if (resp == PHENOD.OK) {
            sign_in = true;
        }
        
        ext_cb(eng_get_main_response(data), sign_in);
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


function eng_nc_logout(ext_cb, uid, pulse)
{
    var cmd = ['au', uid, 'logout'].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}


function eng_nc_profile(ext_cb, uid, pulse)
{
    var cmd = ['au', uid, 'profile'].join(' ');
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


function eng_nc_name(ext_cb, uid, name, pulse)
{
    //console.log(window.btoa(name));
    var cmd = ['au', uid, 'name', window.btoa(name)].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function eng_nc_dataset_list(ext_cb, uid) {
    var cmd = ['au', uid, 'dataset', 'list' ].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let r = {};

        r.n = 0;
        r.id = [];
        r.title = [];

        if (resp == PHENOD.OK) {
            r = eng_get_list(data);        
        }
        
        ext_cb(r);
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_dataset_create(ext_cb, uid) {
    var cmd = ['au', uid, 'dataset', 'create' ].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_dataset_get(ext_cb, uid, ds_id) {
    var cmd = ['au', uid, 'dataset', 'get', ds_id].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let ds = {};
        ds.id = '';
        ds.title = '';
        ds.descr = '';
        
        if (resp = PHENOD.OK) {
            ds = eng_get_list(resp);
        }
        
        ext_cb(ds);
    };
    
    ajx_send_command(cmd, int_cb, g_pulse);
}