// (C) 2016


'use strict';


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=1>\n';

    r += get_html_tr(get_html_td_logo(), get_html_td_profile());
    r += get_html_tr(get_html_td_btn_send_raw(), get_html_td_btn_upload_file());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}


function get_html_td_profile() {
    var r = '';

    r += '<td id="td_profile">\n';
    r += '<button id="btn_profile" onclick="wid_open_profile_window()">' + BTN_TEXT.PROFILE + '</button>\n';

    return r;
}


function get_html_profile_window() {

    var r = '';

    r += '<td id="td_name">\n';
    r += '<label for="input_name">Name:<label>\n';
    r += '<input id="input_name">\n';
    


    return get_html_tr(r);
}

function get_html_td_btn_send_raw() {
    var r = '';

    r += '<td width="50%">\n';
    r += '<button id="btn_send_raw" onclick="wid_send_raw(eng_au_cmd(PH_CMD.PING, g_pfx, g_uid))">' + BTN_TEXT.PING + '</button>\n';

    return r;
}

function get_html_td_btn_upload_file() {
    var r = '';

    r += '<td>\n';
    r += '<button id="btn_upload_file" onclick="">' + BTN_TEXT.UPLOAD + '</button>\n';

    return r;
}
