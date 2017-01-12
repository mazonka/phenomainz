// (C) 2016
'use strict';

var g_sys_loaded_main_div_pfl = 1;

function jq_get_main_pfl()
{
    var $div = $('<div/>',
    {
        id: 'div_main_pfl'
    });

    var $name = $('<span/>',
        {
            id: 'span_pfl_name',
            text: L_TXT.USER_NAME
        })
        .append($('<span/>'));

    var $logout = $('<span/>',
        {
            id: 'span_pfl_logout',
        })
        .append($('<button/>',
        {
            text: B_TXT.LOGOUT
        }));

    var $email = $('<span/>',
        {
            id: 'span_pfl_email',
            text: L_TXT.EMAIL
        })
        .append($('<span/>'));

    var $timestamp = $('<span/>',
        {
            id: 'span_pfl_timestamp',
            text: L_TXT.LAST_LOGIN
        })
        .append($('<span/>'));

    var $logcounter = $('<span/>',
        {
            id: 'span_pfl_logcounter',
            text: L_TXT.COUNTER
        })
        .append($('<span/>'));

    var $quote = $('<span/>',
        {
            text: L_TXT.VOLUME
        })
        .append($('<span/>',
        {
            id: 'span_pfl_volume',
            text: '0'
        }))
        .append($('<span/>',
        {
            id: 'span_pfl_quote',
        }));

    $div
        .append($name)
        .append($logout)
        .append('<br/>')
        .append($email)
        .append('<br/>')
        .append($logcounter)
        .append('<br/>')
        .append($timestamp)
        .append('<br/>')
        .append($quote)
        .append('<br/>')

    return $div;
}
