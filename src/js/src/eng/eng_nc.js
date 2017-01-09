// (C) 2016
'use strict';

function nc_get_resp(data)
{
    var _data = eng_get_resp_headers(data);

    if (_data.indexOf(PHENOD.REQ_MSG_BAD) > -1) return null;
    else if (_data.indexOf(PHENOD.AUTH) > -1) return false;
    else return true;
}

function nc_ping(ext_cb, sid, pulse)
{
    var cmd = ['au', sid, 
        'ping'
    ].join(' ');
    var int_cb = function(data)
    {
        ext_cb(nc_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_admin_ping(ext_cb, sid, pulse)
{
    var cmd = ['au', sid,
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

function nc_logout(ext_cb, sid, pulse)
{
    var cmd = ['au', sid,
        'logout'
    ].join(' ');
    var int_cb = function(data)
    {
        ext_cb(nc_get_resp(data), data);
    };

    ajx_send_command(cmd, int_cb, pulse);
}

function nc_profile(ext_cb, sid, pulse)
{
    var cmd = ['au', sid,
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

function nc_name(ext_cb, sid, name, pulse)
{
    var cmd = ['au', sid, 
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

function nc_ds_item_list(ext_cb, sid)
{
    var cmd = ['au', sid,
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

function nc_ds_item_create(ext_cb, sid)
{
    var cmd = ['au', sid,
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

function nc_ds_item_delete(ext_cb, sid, did)
{
    var cmd = ['au', sid,
        'ds delete', did, '+',
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

function nc_ds_get(ext_cb, sid, did)
{
    var cmd = ['au', sid,
        'ds get', did
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

function nc_ds_upd_title(ext_cb, sid, did, title)
{
    var cmd = ['au', sid,
        'ds update', did, 'title', window.btoa(title), '+',
        'ds get', did
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

function nc_ds_upd_descr(ext_cb, sid, did, descr)
{
    var cmd = ['au', sid, 
        'ds update', did, 'descr', window.btoa(descr), '+',
        'ds get', did
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

function nc_cat_kids(ext_cb, sid, cid)
{
    var cmd = ['au', sid,
        'cat', 'kids', cid
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

function nc_ds_upd_cat(ext_cb, sid, did, cid)
{
    var cmd = [
        'au', sid, 
        'ds update', did, 'categ', cid, '+',
        'ds get', did
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

function nc_ds_add_kwd(ext_cb, sid, did, kwd)
{
    var cmd = [
        'au', sid, 
        'ds addkw', did, window.btoa(kwd), '+',
        'ds get', did
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

function nc_ds_del_kwd(ext_cb, sid, did, kwd)
{
    var cmd = [
        'au', sid, 
        'ds delkw', did, window.btoa(kwd), '+',
        'ds get', did
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

function nc_keywords(ext_cb, sid)
{
    var cmd = ['au', sid, 'keywords'].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let kwd = (_data === null)
            ? _data
            : eng_get_keywords(_data[0]);

        ext_cb(resp, data, kwd);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_list(ext_cb, sid, did)
{
    var cmd = ['au', sid, 
        'ds file', did, 'list'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ls = eng_get_file_list(_data[0]);

        ext_cb(resp, data, ls);

    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_new(ext_cb, sid, did)
{
    var cmd = ['au', sid,
        'ds file', did, 'new', '+',
        'ds file', did, 'list'
    ].join(' ');
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let fid = eng_get_file_new_id(_data[0]);
        let ls = eng_get_file_list(_data[1]);

        ext_cb(resp, data, ls, fid);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_del(ext_cb, sid, did, fid)
{
    var cmd = ['au', sid,
        'ds file', did, 'del', fid, '+',
        'ds file', did, 'list'
    ].join(' ');    
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ls = eng_get_file_list(_data[0]);

        ext_cb(resp, data, ls);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_put(ext_cb, sid, did, fid, file)
{
    var cmd = ['au', sid,
        'ds file', did, 'put', fid, '+',
        'ds file', did, 'list'
    ].join(' ');    
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let sz = eng_get_file_put(_data[0]);
        let ls = eng_get_file_list(_data[1]);

        ext_cb(resp, data, ls);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_setdescr(ext_cb, sid, did, fid, file)
{
    var cmd = ['au', sid,
        'ds file', did, 'setdescr', fid, descr, '+',
        'ds file', did, 'list'
    ].join(' ');    
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let ls = eng_get_file_list(_data[0]);

        ext_cb(resp, data, ls);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}

function nc_ds_file_getdescr(ext_cb, sid, did, fid, file)
{
    var cmd = ['au', sid,
        'ds file', did, 'getdescr', fid, '+',
        'ds file', did, 'list'
    ].join(' ');    
    var int_cb = function(data)
    {
        let resp = nc_get_resp(data);
        let _data = eng_get_data(data);
        let descr = eng_get_file_descr(_data[0]);
        let ls = eng_get_file_list(_data[1]);

        ext_cb(resp, data, ls, descr);
    };

    ajx_send_command(cmd, int_cb, g_pulse);
}
