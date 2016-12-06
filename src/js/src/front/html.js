// (C) 2016


'use strict';


function get_html_table(data, id) {
    var r = (Boolean(id))
        ? '<table id="' + id +'">\n'
        : '<table>\n';

    r += data;
    r += '</table>\n';

    return r;
}


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


function get_html_td(data, id) {
    var r = (Boolean(id))
        ? '<td id="' + id +'">\n'
        : '<td>\n';

    r += data;

    return r;
}

function get_html_img(img_src) {
    return '<img src="' + img_src + '">\n';
}

function get_html_td_logo() {
    var r = '<img id="img_logo" src="'+ IMG.LOGO_DONE + '">\n';
    
    return get_html_td(r, 'td_logo');
}


function get_html_td_modal_window() {
    var r = '';

    r += '<td colspan="2">\n';
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


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=0>\n';

    r += get_html_tr(get_html_td_pheno(), get_html_td_google(), get_html_td_fb(), get_html_td_linkedin(), get_html_td_windows());
    r += get_html_tr(get_html_td_btn_send_raw());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}


function get_html_td_pheno() {
    var r = '<button id="btn_login" onclick="wid_open_login_window()">' +
        BTN_TEXT.LOGIN + '</button>\n';

    return get_html_td(r, 'td_login');
}


function get_html_td_google() {
    var r = '<button onclick="wid_auth(\'google\')">google</button>';

    return get_html_td(r, 'td_google');
}


function get_html_td_fb() {
    var r = '<button onclick="wid_auth(\'facebook\')">facebook</button>';

    return get_html_td(r, 'td_facebook');
}


function get_html_td_linkedin() {
    var r = '<button onclick="wid_auth(\'linkedin\')">linkedin</button>';

    return get_html_td(r, 'td_linkedin');
}


function get_html_td_windows() {
    var r = '<button onclick="wid_auth(\'windows\')">windows</button>';

    return get_html_td(r, 'td_windows');
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

    r += '<td colspan="5">\n';
    r += '<button id="btn_send_raw" onclick="wid_send_raw(PH_CMD.PING)">' +
        BTN_TEXT.PING + '</button>\n';

    return r;
}
