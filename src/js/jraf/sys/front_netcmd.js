// (C) 2016
'use strict';

var g_sys_loaded_front_netcmd = 1;

function wid_nc_ping()
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_ui_login(true);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ping(cb, g_sid, g_pulse);
}

function wid_nc_admin_ping()
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_show_admin_panel(true);
        else wid_show_admin_panel(false);
    };

    nc_admin_ping(cb, g_sid, g_pulse);
}

function wid_nc_login(email)
{
    var url = document.URL;

    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_open_modal_window(M_TXT.EMAIL + email, true);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_login(cb, email, url, g_pulse)
}

function wid_nc_logout()
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_ui_login(false);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_logout(cb, g_sid, g_pulse)
}

function wid_nc_profile()
{
    var cb = function(resp, data, profile)
    {
        if (0)
        {}
        else if (resp) Boolean(profile) && wid_fill_profile(profile);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_profile(cb, g_sid, g_pulse);
}

function wid_nc_name(name)
{
    var cb = function(resp, data, profile)
    {
        if (0)
        {}
        else if (resp) Boolean(profile) && wid_fill_profile(profile);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_name(cb, g_sid, name, g_pulse);
}

function wid_nc_ds_list()
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp) wid_fill_ds_list(list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_item_list(cb, g_sid);
}

function wid_nc_ds_create()
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp) wid_fill_ds_list(list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_item_create(cb, g_sid);
}

function wid_nc_ds_delete(did)
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp) wid_fill_ds_list(list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_item_delete(cb, g_sid, did);
}

function wid_nc_ds_get(did)
{
    var cb = function(resp, data, ds)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_get(cb, g_sid, did);
}


function wid_nc_ds_upd_cmd(cmd, did, data)
{
    var cb = function(resp, data, ds)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    data = data || window.btoa('*');

    if (cmd == 'title')
    {
        nc_ds_upd_title(cb, g_sid, did, data);
    }
    else if (cmd == 'descr')
    {
        nc_ds_upd_descr(cb, g_sid, did, data);
    }
    else if (cmd == 'categ')
    {
        data = (data == '*') ? '0' : data;
        nc_ds_upd_cat(cb, g_sid, did, data);
    }
}


function wid_nc_cat_kids(pcat, ds)
{
    var cb = function(resp, data, kcat)
    {
        if (0)
        {}
        else if (resp) wid_categ_menu(ds, pcat, kcat);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_cat_kids(cb, g_sid, pcat.id);
}

function wid_nc_ds_upd_categ(did, cid)
{
    var cb = function(resp, data, ds)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_upd_cat(cb, g_sid, did, cid);
}

function wid_nc_keywords(f)
{
    var cb = function(resp, data, kwd)
    {
        if (0)
        {}
        else if (resp === false) return wid_ui_login(false);
        else if (resp === null)
            return wid_open_modal_window(M_TXT.ERROR + data, true);

        g_keywords = kwd;

        (Boolean(f)) && f();
    };

    nc_keywords(cb, g_sid);
}

function wid_nc_ds_del_kwd(did, kwd)
{
    var cb = function(resp, data, ds)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_del_kwd(cb, g_sid, did, kwd);
}

function wid_nc_add_kwd(did, kwd)
{
    var cb = function(resp, data, ds)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_add_kwd(cb, g_sid, did, kwd);
}

function wid_nc_ds_file_list(did)
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_files(did, list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_list(cb, g_sid, did);
}

function wid_nc_ds_file_new(did, file)
{
    var cb = function(resp, data, list, fid)
    {
        if (0)
        {}
        else if (resp) 
        {
            file.id = fid;
            
            let id = list.map(function(e)
            {
                return e.id;
            })
            .indexOf(fid);
            
            list[id].descr = file.name;
            
            console.log(file)
            console.log(list);

            wid_fill_dsitem_files(did, list);
        }
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_new(cb, g_sid, did);
}

function wid_nc_ds_file_del(did, fid)
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp) wid_fill_dsitem_files(did, list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_del(cb, g_sid, did, fid);
}

function wid_nc_ds_file_put(did, fid, file)
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp)
        {
            wid_fill_dsitem_files(did, list);
        } 
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_put(cb, g_sid, did, fid, file);
}

function wid_nc_ds_file_setdecr(did, fid, file)
{
    var cb = function(resp, data, list)
    {
        if (0)
        {}
        else if (resp)
        {
            wid_fill_dsitem_files(did, list);
        } 
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_setdescr(cb, g_sid, did, fid, file);
}

function wid_nc_ds_file_getdescr(did, fid, file)
{
    var cb = function(resp, data, list, descr)
    {
        if (0)
        {}
        else if (resp)
        {
            wid_fill_dsitem_files(did, list);
        } 
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_getdescr(cb, g_sid, did, fid, file);
}
