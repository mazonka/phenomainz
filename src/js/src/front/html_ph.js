// (C) 2016


'use strict';


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=0>\n';

    r += get_html_tr(get_html_td_logo(), get_html_td_login());
    r += get_html_tr(get_html_td(''), get_html_td_google());
    r += get_html_tr(get_html_td_btn_send_raw());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}

function get_html_td_login() {
    var r = '<button id="btn_login" onclick="wid_open_login_window()">' +
        BTN_TEXT.LOGIN + '</button>\n';

    return get_html_td(r, 'td_login');
}

function get_html_td_google() {
    var r = '<button id="btn_google" onclick="wid_au_google()">' +
        BTN_TEXT.GOOGLE + '</button>\n';

    return get_html_td(r, 'td_google');
}


function get_html_login_window() {

    var r = '';

    r += '<label for="input_login_email">e-mail:<label>\n';
    r += '<input id="input_login_email" oninput="wid_oninput_login_email($(this))">\n';
    r += '<button id="btn_email_login" onclick="wid_send_email()">' +
        BTN_TEXT.SEND_EMAIL + '</button>\n';


    return get_html_tr(get_html_td(r, 'td_email'));
}


function get_html_td_btn_send_raw() {
    var r = '';

    r += '<td colspan="2">\n';
    r += '<button id="btn_send_raw" onclick="wid_send_raw(PH_CMD.PING)">' +
        BTN_TEXT.PING + '</button>\n';

    return r;
}
