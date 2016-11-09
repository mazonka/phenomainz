// (C) 2016


'use strict';


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=0>\n';

    r += get_html_tr(get_html_td_logo(), get_html_td('user', 'td_username'));
    r += get_html_tr(get_html_td_btn_send_raw());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}


function get_html_td_btn_send_raw() {
    var r = '';

    r += '<td colspan="2">';
    r += '<button id="btn_send_raw" onclick="wid_send_raw(PHENOD_CMD.PING)">' + BTN_TEXT.PING + '</button>\n';

    return r;
}
