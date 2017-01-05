// (C) 2016
'use strict';

function nc_get_resp(data)
{
    var _data = eng_get_resp_headers(data);

    if (_data.indexOf(PHENOD.REQ_MSG_BAD) > -1) return null;
    else if (_data.indexOf(PHENOD.AUTH) > -1) return false;
    else return true;
}

function nc_ping(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id, 
        'ping'
    ].join(' ');
    var int_cb = function(data)
    {
        ext_cb(nc_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_admin_ping(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id,
        'admin ping'
    ].join(' ')
    var int_cb = function(data)
    {
        eng_get_data(data);
        ext_cb(nc_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_login(ext_cb, email, url, pulse)
{
    var cmd = ['login', email, url].join(' ');
    var int_cb = function(data)
    {
        ext_cb(nc_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_logout(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id,
        'logout'
    ].join(' ');
    var int_cb = function(data)
    {
        ext_cb(nc_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_profile(ext_cb, user_id, pulse)
{
    var cmd = ['au', user_id,
        'profile'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let profile = (_data === null)
            ? _data
            : eng_get_parsed_profile(_data[0]);
            
        ;

        ext_cb(resp, data, profile);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_name(ext_cb, user_id, name, pulse)
{
    var cmd = ['au', user_id, 
        'name', window.btoa(name), '+',
        'profile'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let profile = (_data === null)
            ? _data
            : eng_get_parsed_profile(_data[0]);

        ext_cb(resp, data, profile);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_ds_item_list(ext_cb, user_id)
{
    var cmd = ['au', user_id,
        'ds list'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let list = (_data === null)
            ? _data
            : eng_get_ds_list(_data[0]);

        ext_cb(resp, data, list);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_item_create(ext_cb, user_id)
{
    var cmd = ['au', user_id,
        'ds create', '+',
        'ds list'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let list = (_data === null)
            ? _data
            : eng_get_ds_list(_data[0]);

        ext_cb(resp, data, list);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_item_delete(ext_cb, user_id, ds_id)
{
    var cmd = ['au', user_id,
        'ds delete', ds_id, '+',
        'ds list'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let list = (_data === null)
            ? _data
            : eng_get_ds_list(_data[0]);

        ext_cb(resp, data, list);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_get(ext_cb, user_id, ds_id)
{
    var cmd = ['au', user_id,
        'ds get', ds_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ds = (_data === null)
            ? _data
            : eng_get_ds_get(_data[0]);

        ext_cb(resp, data, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_upd_title(ext_cb, user_id, ds_id, title)
{
    var cmd = ['au', user_id,
        'ds update', ds_id, 'title', window.btoa(title), '+',
        'ds get', ds_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ds = (_data === null)
            ? _data
            : eng_get_ds_get(_data[0]);

        ext_cb(resp, data, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_upd_descr(ext_cb, user_id, ds_id, descr)
{
    var cmd = ['au', user_id, 
        'ds update', ds_id, 'descr', window.btoa(descr), '+',
        'ds get', ds_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ds = (_data === null)
            ? _data
            : eng_get_ds_get(_data[0]);

        ext_cb(resp, data, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_upd_cat(ext_cb, user_id, ds_id, cat_id)
{
    var cmd = [
        'au', user_id, 
        'ds update', ds_id, 'categ', cat_id, '+',
        'ds get', ds_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ds = (_data === null)
            ? _data
            : eng_get_ds_get(_data[0]);

        ext_cb(resp, data, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_add_kwd(ext_cb, user_id, ds_id, kwd)
{
    var cmd = [
        'au', user_id, 
        'ds addkw', ds_id, window.btoa(kwd), '+',
        'ds get', ds_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ds = (_data === null)
            ? _data
            : eng_get_ds_get(_data[0]);

        ext_cb(resp, data, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_del_kwd(ext_cb, user_id, ds_id, kwd)
{
    var cmd = [
        'au', user_id, 
        'ds delkw', ds_id, window.btoa(kwd), '+',
        'ds get', ds_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ds = (_data === null)
            ? _data
            : eng_get_ds_get(_data[0]);

        ext_cb(resp, data, ds);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}



function nc_cat_kids(ext_cb, user_id, cat_id)
{
    var cmd = ['au', user_id,
        'cat', 'kids', cat_id
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ckids = (_data === null)
            ? _data
            : eng_get_cat_kids(_data[0]);


        ext_cb(resp, data, ckids);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_keywords(ext_cb, user_id)
{
    var cmd = ['au', user_id, 'keywords'].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ckids = (_data === null)
            ? _data
            : eng_get_keywords(_data[0]);


        ext_cb(resp, data, ckids);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_list(ext_cb, user_id, ds_id)
{
    var cmd = ['au', user_id, 'ds', 'file', ds_id, 'list'].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);

        data = eng_get_file_list(data);

        ext_cb(resp, data);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_new(ext_cb, user_id, ds_id)
{
    var cmd = ['au', user_id, 'ds', 'file', ds_id, 'new'].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);

        data = eng_get_file_new_id(data);

        ext_cb(resp, data);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_del(ext_cb, user_id, ds_id, f_id)
{
    var cmd = ['au', user_id, 'ds', 'file', ds_id, 'del', f_id].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);

        ext_cb(resp);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}