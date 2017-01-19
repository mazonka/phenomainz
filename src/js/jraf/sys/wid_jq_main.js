// (C) 2016
'use strict';

function wid_jq_main_js(){}

function jq_get_main_adm()
{
    return $('<div/>',
        {
            id: 'div_main_adm'        
        });
}

function jq_get_main_pfl()
{
    var $div = $('<div/>',
    {
        id: 'div_main_pfl'
    });

    return $div;
}

function jq_get_main_brs()
{
    return $('<div/>',
        {
            id: 'div_main_brs'        
        });
}

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

function jq_get_main_dsl()
{
    return $('<div/>',
        {
            id: 'div_main_dsl'
        })
        .append($('<div/>',
            {
                id: 'div_main_dsl_list'
            }))
        .append($('<div/>',
            {
                id: 'div_main_dsl_create'
            })
                .append($('<button/>',
                    {
                        text: B_TXT.CREATE_NEW
                    })
                    .click(function()
                    {
                        wid_nc_ds_create();
                    })));
}

function jq_get_main_pmw()
{

    return $('<div/>',
        {
            id: 'div_main_pwm'
        })
        .append($('<div/>',
            {
                id: 'div_main_pwm_content'
            })
            .append($('<div/>',
            {
                id: 'div_main_pwm_content_header'
            }))
            .append($('<div/>',
            {
                id: 'div_main_pwm_content_body'
            }))
            .append($('<div/>',
            {
                id: 'div_main_pwm_content_footer'
            })));
}
