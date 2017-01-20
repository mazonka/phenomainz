// (C) 2016
'use strict';

function wid_netcmd_js(){}

function wid_nc_profile(sid)
{
    var cb = function(resp, data, profile)
    {
        if (0)
        {}
        else if (resp) Boolean(profile) && wid_init_ui(true, profile);
        else if (resp === null) wid_init_ui(false);
        else wid_init_modal_window(true, M_TXT.ERROR + data);
    };
    
    nc_profile(cb, g_session, g_pulse);
}

function wid_nc_login(email)
{
    var url = document.URL;

    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_init_modal_window(true, M_TXT.EMAIL + email);
        else if (resp === null) wid_init_ui(false);
        else wid_init_modal_window(true, M_TXT.ERROR + data);
    };

    nc_login(cb, email, url, g_pulse)
}

function wid_nc_logout()
{
    var cb = function(resp, data)
    {
        if (0)
        {}
        else if (resp) wid_init_ui(false);
        else if (resp === null) wid_init_ui(false);
        else wid_init_modal_window(true, M_TXT.ERROR + data);
    };

    nc_logout(cb, g_session, g_pulse)
}

function wid_nc_ds_create()
{
    log('create dataset');
}