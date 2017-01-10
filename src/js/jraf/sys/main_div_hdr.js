// (C) 2016
'use strict';

var g_sys_loaded_main_div_hdr = 1;

function jq_get_main_hdr()
{
    var $hdr = $('<div/>',
    {
        id: 'div_main_hdr'
    });

    var $phi = $('<span/>',
        {
            id: 'span_main_phi'
        })
        .append($('<img/>',
        {
            id: 'img_logo',
            src: IMG.LOGO_DONE
        }));


    var $log = $('<span/>',
        {
            id: 'span_main_log'
        })
        .append(jq_get_p_button())
        .append(jq_get_g_button())
        .append(jq_get_f_button())
        .append(jq_get_l_button())
        .append(jq_get_w_button());

    $hdr
        .append($phi)
        .append($log);

    return $hdr;
}

function jq_get_p_button()
{
    return $('<label/>')
        .addClass('auth-button')
        .append($('<img/>',
        {
            src: IMG.LOGO_DONE
        }))
        .click(function ()
        {
            wid_open_email_window()
        });
}

function jq_get_g_button()
{
    return $('<label/>')
        .addClass('auth-button')
        .append($('<img/>',
        {
            src: IMG.LOGO_GOOGLE
        }))
        .click(function ()
        {
            wid_auth('google')
        });
}

function jq_get_f_button()
{
    return $('<label/>')
        .addClass('auth-button')
        .append($('<img/>',
        {
            src: IMG.LOGO_FB
        }))
        .click(function ()
        {
            wid_auth('facebook')
        });
}

function jq_get_l_button()
{
    return $('<label/>')
        .addClass('auth-button')
        .append($('<img/>',
        {
            src: IMG.LOGO_LI
        }))
        .click(function ()
        {
            wid_auth('linkedin')
        });
}

function jq_get_w_button()
{
    return $('<label/>')
        .addClass('auth-button')
        .append($('<img/>',
        {
            src: IMG.LOGO_WINDOWS
        }))
        .click(function ()
        {
            wid_auth('windows')
        });
}
