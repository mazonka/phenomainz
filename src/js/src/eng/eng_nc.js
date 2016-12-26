// (C) 2016


'use strict';

function eng_nc_ping(ext_cb, user_id, pulse) {
    var cmd = ['au', user_id, 'ping'].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);

        ext_cb(resp);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function eng_nc_login(ext_cb, email, url, pulse) {
    var cmd = ['login', email, url].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function eng_nc_logout(ext_cb, user_id, pulse) {
    var cmd = ['au', user_id, 'logout'].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function eng_nc_profile(ext_cb, user_id, pulse) {
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

function eng_nc_name(ext_cb, user_id, name, pulse) {
    var cmd = ['au', user_id, 'name', window.btoa(name)].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function eng_nc_ds_item_list(ext_cb, user_id) {
    var cmd = ['au', user_id, 'ds', 'list'].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let list = null;
        
        if (resp == PHENOD.OK) {
            list = eng_get_ds_list(data);
        }

        ext_cb(resp, list);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_item_create(ext_cb, user_id) {
    var cmd = ['au', user_id, 'ds', 'create'].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_item_delete(ext_cb, user_id, ds_id) {
    var cmd = ['au', user_id, 'ds', 'delete', ds_id].join(' ');
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_upd_title(ext_cb, user_id, ds_id, title) {
    var cmd = [
        'au', user_id, 'ds', 'update', ds_id, 'title', window.btoa(title)
    ].join(' ');
    
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}


function eng_nc_ds_upd_descr(ext_cb, user_id, ds_id, descr) {
    var cmd = [
        'au', user_id, 'ds', 'update', ds_id, 'descr', window.btoa(descr)
    ].join(' ');
    
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_upd_cat(ext_cb, user_id, ds_id, cat_id) {
    var cmd = [
        'au', user_id, 'ds', 'update', ds_id, 'categ', cat_id
    ].join(' ');
    
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_add_kwd(ext_cb, user_id, ds_id, kwd) {
    var cmd = [
        'au', user_id, 'ds', 'addkw', ds_id, window.btoa(kwd)
    ].join(' ');
    
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_del_kwd(ext_cb, user_id, ds_id, kwd) {
    var cmd = [
        'au', user_id, 'ds', 'delkw', ds_id, window.btoa(kwd)
    ].join(' ');
    
    var int_cb = function (data) {
        ext_cb(eng_get_main_response(data));
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_ds_get(ext_cb, user_id, ds_id) {
    var cmd = ['au', user_id, 'ds', 'get', ds_id].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        let ds = null;

        if (resp == PHENOD.OK) {
            ds = eng_get_ds_get(data);
        }

        ext_cb(resp, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_cat_kids(ext_cb, user_id, cat_id) {
    var cmd = ['au', user_id, 'cat', 'kids', cat_id].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        
        data = eng_get_cat_kids(data);

        ext_cb(resp, data);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function eng_nc_keywords(ext_cb, user_id) {
    var cmd = ['au', user_id, 'keywords'].join(' ');
    var int_cb = function (data) {
        let resp = eng_get_main_response(data);
        
        data = eng_get_keywords(data);

        ext_cb(resp, data);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

