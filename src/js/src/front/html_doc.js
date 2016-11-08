// (C) 2016


'use strict';


function get_html_tr() {
    var r = '';
    var l = arguments.length;

    if (l == 0) {
        return r;
    }

    r += '<tr>\n';

    for (let i = 0; i < arguments.length; i++) {
        r += arguments[i];
    }

    r += '</tr>\n';

    return r;
}


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=0>\n';
    
    r += get_html_tr(get_html_td_logo(), get_html_td_login());
    r += get_html_tr(get_html_td_btn_send_raw());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}

function get_html_td_logo() {
    var r = '';

    r += '<td id="td_logo">';
    r += '<img id="img_logo" src="'+ IMG.LOGO_DONE + '">';
    return r;
}


function get_html_td_login() {
    var r = '';

    r += '<td id="td_login">';
    r += '<button id="btn_login" onclick="wid_open_login_window()">' + BTN_TEXT.LOGIN + '</button>';

    return r;
}


function get_html_login_window() {

    var r = '';

    r += '<td id="td_email">';
    r += '<label for="input_email">e-mail:<label>';
    r += '<input id="input_email" oninput="wid_oninput_email($(this))">';
    r += '<button id="btn_email_login" onclick="wid_send_email()">' + BTN_TEXT.SEND_EMAIL + '</button>';


    return get_html_tr(r);
}


function get_html_td_btn_send_raw() {
    var r = '';

    r += '<td colspan="2">';
    r += '<button id="btn_send_raw" onclick="wid_send_raw(PHENOD_CMD.PING)">' + BTN_TEXT.PING + '</button>\n';

    return r;
}


function get_html_td_modal_window() {
    var r = '';

    r += '<td colspan="2">';
    r += '<div id="div_modal_window">\n';
    r += '<div id="div_modal_window_content">\n';
    r += '<div id="div_modal_window_content_header"></div>\n';
    r += '<div id="div_modal_window_content_body">\n';
    r += '<p></p>\n';
    r += '</div>\n';
    r += '<div id="div_modal_window_content_footer"></div>\n';
    r += '</div>\n';
    r += '</div>\n';

    return r;
}
