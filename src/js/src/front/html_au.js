// (C) 2016


'use strict';


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=1>\n';

    r += get_html_tr(get_html_td_logo(), get_html_td_profile());
    r += get_html_tr(get_html_td_btn_open_file());
    r += get_html_tr(get_html_td_btn_send_raw());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}


function get_html_td_profile() {
    var r = '';

    r += '<td id="td_profile">\n';
    r += '<button id="btn_profile" onclick="wid_open_profile_window()">' +
        BTN_TEXT.PROFILE + '</button>\n';

    return r;
}


function get_html_profile_window() {

    var r = '';

    r += '<div id="div_profile">\n';
    r += '<label for="input_profile_name">Name:<label>\n';
    r += '<input id="input_profile_name">\n';
    r += '<label for="input_profile_email">E-mail:<label>\n';
    r += '<input id="input_profile_email">\n';
    r += '<div>\n';
 
    return r;
}

function get_html_td_btn_send_raw() {
    var r = '';

    r += '<td colspan="2">\n';
    r += '<button id="btn_send_raw" onclick="wid_send_raw(eng_au_cmd' +
        '(PH_CMD.PING, g_pfx, g_uid))">' + BTN_TEXT.PING + '</button>\n';

    return r;
}

function get_html_td_btn_open_file() {
    var r = '';

    r += '<td id="td_open_file" colspan="2">\n';
/*
    r += '<label id="label_open_file" for="input_open_file">' +
        get_html_img(IMG.FILE_LOAD) + '</label>\n';
*/
    r += '<label id="label_open_file" class="ui-button ui-widget ui-corner-all" ' +
        'for="input_open_file">' + LBL_TEXT.OPEN_FILE + '</label>\n';
    r += '<input id="input_open_file" type="file"' +
        'onchange="return wid_open_file(this.files, $(this))"></input>';

    return r;
}
