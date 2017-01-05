// (C) 2016
'use strict';

function wid_nc_ping()
{
    var cb = function(resp, data)
    {
        if (0) {}
        else if (resp) wid_ui_login(true);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ping(cb, g_user_id, g_pulse);
}

function wid_nc_admin_ping()
{
    var cb = function(resp, data)
    {
        if (0) {}
        else if (resp) wid_show_admin_panel(true);
        else wid_show_admin_panel(false);
        //wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_admin_ping(cb, g_user_id, g_pulse);
}

function wid_nc_login(email)
{
    var url = document.URL;

    var cb = function(resp, data)
    {
        if (0) {}
        else if (resp) wid_open_modal_window(M_TXT.EMAIL + email, true);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_login(cb, email, url, g_pulse)
}

function wid_nc_logout()
{
    var cb = function(resp, data)
    {
        if (0) {}
        else if (resp) wid_ui_login(false);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_logout(cb, g_user_id, g_pulse)
}

function wid_nc_profile()
{
    var cb = function(resp, data, profile)
    {
        if (0) {}
        else if (resp) Boolean(profile) && wid_fill_profile(profile);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_profile(cb, g_user_id, g_pulse);
}

function wid_nc_name(name)
{
    var cb = function(resp, data, profile)
    {
        if (0) {}
        else if (resp) Boolean(profile) && wid_fill_profile(profile);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_name(cb, g_user_id, name, g_pulse);
}

function wid_nc_ds_list()
{
    var cb = function(resp, data, list)
    {
        if (0) {}
        else if (resp) wid_fill_ds_list(list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_item_list(cb, g_user_id);
}

function wid_nc_ds_create()
{
    var cb = function(resp, data, list)
    {
        if (0) {}
        else if (resp) wid_fill_ds_list(list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_item_create(cb, g_user_id);
}

function wid_nc_ds_delete(ds_id)
{
    var cb = function(resp, data, list)
    {
        if (0) {}
        else if (resp) wid_fill_ds_list(list);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_item_delete(cb, g_user_id, ds_id);
}

function wid_nc_ds_get(ds_id)
{
    var cb = function(resp, data, ds)
    {
        if (0) {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_get(cb, g_user_id, ds_id);
}


function wid_nc_ds_upd_cmd(cmd, ds_id, data)
{
    var cb = function(resp, data, ds)
    {
        if (0) {}
        else if (resp) wid_fill_dsitem_props(ds);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    data = data || window.btoa('*');

    if (cmd == 'title')
    {
        nc_ds_upd_title(cb, g_user_id, ds_id, data);
    }
    else if (cmd == 'descr')
    {
        nc_ds_upd_descr(cb, g_user_id, ds_id, data);
    }
    else if (cmd == 'categ')
    {
        data = (data == '*') ? '0' : data;
        nc_ds_upd_cat(cb, g_user_id, ds_id, data);
    }
}


function wid_nc_cat_kids(pcat, ds)
{
    var cb = function(resp, data, kcat)
    {
        if (0) {}
        else if (resp) wid_cat_menu(ds, pcat, kcat);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_cat_kids(cb, g_user_id, pcat.id);
}

function wid_nc_ds_upd_categ(ds_id, cat_id)
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_nc_ds_get(ds_id);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_upd_cat(cb, g_user_id, ds_id, cat_id);
}

function wid_nc_ds_del_kwd(ds_id, kwd)
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_nc_ds_get(ds_id);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_del_kwd(cb, g_user_id, ds_id, kwd);
}

function wid_nc_add_kwd(ds_id, kwd)
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_nc_ds_get(ds_id);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_add_kwd(cb, g_user_id, ds_id, kwd);
}

function wid_nc_keywords(f)
{
    var cb = function(resp, data)
    {
        if (resp == PHENOD.AUTH)
        {
            return wid_ui_login(resp);
        }
        else if (resp != PHENOD.OK)
        {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        g_keywords = data;

        (Boolean(f)) && f();
    };

    nc_keywords(cb, g_user_id);
}

function wid_nc_ds_file_list(ds_id, file)
{
    var $content = $('#' + DIV_DS + ds_id).find('.dsfiles-content');
    var cb = function(resp, data)
    {
        if (resp == PHENOD.AUTH)
        {
            return wid_ui_login(resp);
        }
        else if (resp != PHENOD.OK)
        {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        file = file || null;

        wid_fill_dsitem_files(ds_id, data, file);
    };

    nc_ds_file_list(cb, g_user_id, ds_id);
}

function wid_nc_ds_file_new(ds_id, file)
{
    var cb = function(resp, data)
    {
        if (resp == PHENOD.AUTH)
        {
            return wid_ui_login(resp);
        }
        else if (resp != PHENOD.OK)
        {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        file.id = data;
        wid_nc_ds_file_list(ds_id, file);
    };

    nc_ds_file_new(cb, g_user_id, ds_id);
}

function wid_nc_ds_file_del(ds_id, f_id)
{
    var cb = function(resp)
    {
        if (0)
        {}
        else if (resp) wid_nc_ds_file_list(ds_id);
        else if (resp === false) wid_ui_login(false);
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_ds_file_del(cb, g_user_id, ds_id, f_id);
}