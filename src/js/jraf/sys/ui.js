// (C) 2016
'use strict';

var g_sys_loaded_ui = 1;

function doc_write()
{
    document.write(ui_write());
}

function ui_write()
{
    return html_get_body();
}

function doc_init(sid)
{
    $(document).ready(function()
    {
        ui_init(sid);
    });
}

function ui_init(sid)
{
    g_sid = sid;
    console.log(sid);

/* 
    $('#button_google, #button_facebook, #button_linkedin, #button_windows')
        .hide();
*/
    $('input, select, textarea').attr('autocomplete', 'off');

    $('#' + TD_PROFILE).hide();
    $('#' + TD_LOGIN).hide();
    $('#' + TD_DSLIST).hide();
    $('#' + TD_DSITEM_CREATE).hide();

    $('button').button();

    $('#button_user_email').prop('disabled', true);
    $('#div_main_pwm').css('display', 'none');

    wid_nc_ping();

    //debug

    $('#cmd_prompt')
        .keydown(function(event)
        {
            if (Boolean(event.keyCode === 37)) return false;
            if (Boolean(event.keyCode === 38)) return false;
        });
}
