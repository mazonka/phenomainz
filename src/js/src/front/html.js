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


function get_html_body() {
    var r = '';

    r += '<table id="table_body" border=1>\n';
    
    r += get_html_tr(get_html_td_logo());
    r += get_html_tr(get_html_td_auth());
    r += get_html_tr(get_html_td_profile());
    r += get_html_tr(get_html_td_button_open_file());
    r += get_html_tr(get_html_td_modal_window());

    r += '</table>\n';

    return r;
}


function get_html_td_logo() {
    var r = '';
    
    r += '<div id="div_logo"><img id="img_logo" src="'+ IMG.LOGO_DONE + '"></div>\n';
    
    return get_html_td(r, 'td_logo');
}


function get_html_td_modal_window() {
    var r = '';

    r += '<td>\n';
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


function get_html_td_auth() {
    var r = '';
    
    r += '<button id="button_pheno" onclick="wid_open_email_window()">' +
        BUTTON_TEXT.PHENO + '</button>\n';
    r += '<button id="button_google" onclick="wid_auth(\'google\')">' +
        BUTTON_TEXT.GOOGLE + '</button>\n';
    r += '<button id="button_facebook" onclick="wid_auth(\'facebook\')">' +
        BUTTON_TEXT.FACEBOOK + '</button>\n';
    r += '<button id="button_linkedin" onclick="wid_auth(\'linkedin\')">' +
        BUTTON_TEXT.LINKEDIN + '</button>\n';
    r += '<button id="button_windows" onclick="wid_auth(\'windows\')">' +
        BUTTON_TEXT.WINDOWS + '</button>\n';
    return get_html_td(r, 'td_login');
}


function get_html_email_window() {

    var r = '';

    r += '<label for="input_user_email">e-mail:<label>\n';
    r += '<input id="input_user_email" oninput="wid_oninput_email($(this))">\n';
    r += '<button id="button_user_email" onclick="wid_nc_login()">' +
        BUTTON_TEXT.SEND_EMAIL + '</button>\n';


    return get_html_tr(get_html_td(r, 'td_email'));
}


function get_html_name_window() {

    var r = '';

    r += '<label for="input_user_name">Name:<label>\n';
    r += '<input id="input_user_name" oninput="wid_oninput_name($(this))">\n';
    r += '<button id="button_user_name" onclick="wid_nc_name()">' +
        BUTTON_TEXT.CHANGE + '</button>\n';
    r += '<button id="button_user_logout" onclick="wid_nc_logout()">' +
        BUTTON_TEXT.LOGOUT + '</button>\n';
        
    return get_html_tr(get_html_td(r, 'td_name'));
}


function get_html_td_profile() {
    var r = '';
    r += '<div id="div_profile_name" onclick="wid_open_name_window()"></div></br>\n';
    r += '<div id="div_profile_email"></div></br>\n';
    r += '<div id="div_profile_lastdate"></div></br>\n';
    r += '<div id="div_profile_counter"></div></br>\n';

    return get_html_td(r, 'td_profile');
}


function get_html_td_button_open_file() {
    var r = '';

    r += '<td id="td_open_file">\n';
    r += '<label id="label_open_file" ' +
        'class="ui-button ui-widget ui-corner-all" ' +
        'for="input_open_file">' + LBL_TEXT.OPEN_FILE + '</label>\n';
    r += '<input id="input_open_file" type="file" ' +
        'accept=".txt,.csv,.zip" ' +    
        'onchange="return wid_open_file(this.files, $(this))"></input>';

    return r;
}


function get_html_td_button_upload_file() {
    var r = '';

    r += '<td id="td_open_file">\n';
    r += '<label id="label_open_file" ' +
        'class="ui-button ui-widget ui-corner-all" ' +
        'for="input_open_file">' + LBL_TEXT.UPLOAD_FILE + '</label>\n';
    r += '<input id="input_open_file" type="file" ' +
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
    r += get_html_td_button_upload_file();
    
    return r;
}