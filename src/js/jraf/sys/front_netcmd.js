// (C) 2016
'use strict';

var g_sys_loaded_front_netcmd = 1;

function wid_nc_profile()
{
    var cb = function(resp, data, profile)
    {
        if (0)
        {}
        else if (resp) Boolean(profile) && wid_fill_profile(profile);
        //else if (resp === false) wid_ui_login(false); //Needs for AUTH
        else wid_open_modal_window(M_TXT.ERROR + data, true);
    };

    nc_profile(cb, g_sid, g_pulse);
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
