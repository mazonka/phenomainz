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
    var r = '<button id="btn_profile" onclick="wid_open_profile_window()">' +
        BTN_TEXT.PROFILE + '</button>\n';

    return get_html_td(r, 'td_profile');
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
    r += '<label id="label_open_file" ' +
        'class="ui-button ui-widget ui-corner-all" ' +
        'for="input_open_file">' + LBL_TEXT.OPEN_FILE + '</label>\n';
    r += '<input id="input_open_file" type="file"' +
        'onchange="return wid_open_file(this.files, $(this))"></input>';

    return r;
}

function get_html_td_btn_upload_file() {
    var r = '';

    r += '<td id="td_open_file" colspan="2">\n';
    r += '<label id="label_open_file" ' +
        'class="ui-button ui-widget ui-corner-all" ' +
        'for="input_open_file">' + LBL_TEXT.UPLOAD_FILE + '</label>\n';
    r += '<input id="input_open_file" type="file"' +
        'onchange="return wid_upload_file()"></input>';

    return r;
}

function get_html_open_file(file) {
    var r = '';
    var t = '';

    r += '<div id="div_open_file">\n';
    r += 'File: ' + file.name + '\n';
    r += '</br>\n';
    r += 'Size: ' + (file.size/1024).toFixed(2) + ' Kbytes\n';
    r += '</br>\n';
    r += '</div>\n';

    t += get_html_tr(
        get_html_td('<label for="input_file_title">Title</label>\n'),
        get_html_td('<input id="input_file_title">\n')
    );

    t += get_html_tr(
        get_html_td('<label for="input_file_author">Author</label>\n'),
        get_html_td('<input id="input_file_author">\n')
    );

    t += get_html_tr(
        get_html_td('<label for="input_file_theme">Theme</label>\n'),
        get_html_td('<input id="input_file_theme">\n')
    );

    t += get_html_tr(
        get_html_td('<label for="input_file_keywords">Keywords</label>\n'),
        get_html_td('<input id="input_file_keywords">\n')
    );

    r += get_html_table(t, 'table_file_properties');
    r += get_html_td_btn_upload_file();
    
    return r;
}
