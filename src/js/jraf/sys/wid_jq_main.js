// (C) 2016
'use strict';

function wid_jq_main_js(){}

function jq_get_main_adm()
{
    return $('<div/>', { id: 'div_main_adm' });
}

function jq_get_main_pfl()
{
    return $('<div/>', { id: 'div_main_pfl' });
}

function jq_get_main_brs()
{
    return $('<div/>', { id: 'div_main_brs' });
}

function jq_get_main_hdr()
{
    var $hdr = $('<div/>', { id: 'div_main_hdr' });
    var $phi = $('<span/>', { id: 'span_main_phi' })
        .append($('<img/>',
        {
            id: 'img_logo',
            src: IMG.LOGO_DONE
        }));

    var $log = $('<span/>', { id: 'span_main_log' })
        .append(jq_get_login_button(IMG.LOGO_DONE, 'phenomainz'))
        .append(jq_get_login_button(IMG.LOGO_GOOGLE, 'google'))
        .append(jq_get_login_button(IMG.LOGO_FB, 'facebook'))
        .append(jq_get_login_button(IMG.LOGO_LI, 'linkedin'))
        .append(jq_get_login_button(IMG.LOGO_WINDOWS, 'windows'));

    $hdr.append($phi).append($log);

    return $hdr;
}

function jq_get_login_button(img, srv)
{
    return $('<label/>')
        .addClass('auth-button')
        .append($('<img/>', { src: img }))
        .click(function () { wid_fill_auth(srv) });
}

function jq_get_main_dsl()
{
    return $('<div/>', { id: 'div_main_dsl' })
        .append($('<div/>', { id: 'div_main_dsl_list' }))
        .append($('<div/>', { id: 'div_main_dsl_create' })
            .append($('<button/>', { text: B_TXT.CREATE_NEW })
                .click(function() { wid_jraf_create_ds(); })
            )
        );
}

function jq_get_main_pmw()
{
    return $('<div/>', { id: 'div_main_pwm' })
        .append($('<div/>', { id: 'div_main_pwm_content' })
            .append($('<div/>', { id: 'div_main_pwm_content_header' }))
            .append($('<div/>', { id: 'div_main_pwm_content_body'   }))
            .append($('<div/>', { id: 'div_main_pwm_content_footer' }))
        );
}
