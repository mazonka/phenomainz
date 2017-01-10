// (C) 2016
'use strict';

var g_sys_loaded_file8 = 1;


function jq_get_main_pfl()
{
    var $div = $('<div/>',
    {
        id: 'div_main_pfl'
    });

    var $name = $('<span/>',
        {
            id: 'span_profile_name',
            text: L_TXT.USER_NAME
        })
        .append($('<span/>'));

    var $logout = $('<span/>',
        {
            id: 'span_profile_logout',
        })
        .append($('<button/>',
        {
            text: B_TXT.LOGOUT
        }));

    var $email = $('<span/>',
        {
            id: 'span_profile_email',
            text: L_TXT.EMAIL
        })
        .append($('<span/>'));

    var $lastlog = $('<span/>',
        {
            id: 'span_profile_lastdate',
            text: L_TXT.LAST_LOGIN
        })
        .append($('<span/>'));

    var $logcounter = $('<span/>',
        {
            id: 'span_profile_counter',
            text: L_TXT.COUNTER
        })
        .append($('<span/>'));

    var $quote = $('<span/>',
        {
            id: 'span_profile_quote',
            text: L_TXT.VOLUME
        })
        .append($('<span/>',
        {
            id: 'span_profile_vol_usg',
            text: '0/'
        }))
        .append($('<span/>',
        {
            id: 'span_profile_vol_lim',
        }));

    $div
        .append($name)
        .append($logout)
        .append('<br/>')
        .append($email)
        .append('<br/>')
        .append($logcounter)
        .append('<br/>')
        .append($lastlog)
        .append('<br/>')
        .append($quote)
        .append('<br/>')

    return $div;
}
