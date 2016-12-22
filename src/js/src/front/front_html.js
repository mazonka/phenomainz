// (C) 2016


'use strict';


function html_get_table(data, id) {
    var r = (Boolean(id))
        ? '<table id="' + id +'">\n'
        : '<table>\n';

    r += data;
    r += '</table>\n';

    return r;
}


function html_get_tr() {
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


function html_get_td(data, id) {
    var r = (Boolean(id))
        ? '<td id="' + id +'">\n'
        : '<td>\n';

    r += data;

    return r;
}


function html_get_img(img_src) {
    return '<img src="' + img_src + '">\n';
}


function html_get_body() {
    var r = '';

    r += '<table id="table_body" border=1>\n';
    
    r += html_get_tr(html_get_td_logo());
    r += html_get_tr(html_get_td_auth());
    r += html_get_tr(html_get_td_admin());
    r += html_get_tr(html_get_td_profile());
    r += html_get_tr(html_get_td_ds_list());
    r += html_get_tr(html_get_td_ds_list_ctrl());
    r += html_get_tr(html_get_td_modal_window());

    r += '</table>\n';

    return r;
}


function html_get_td_logo() {
    var r = '';
    
    r += '<div id="div_logo"><img id="img_logo" src="' 
        + IMG.LOGO_DONE + '"></div>\n';
    
    return html_get_td(r, 'td_logo');
}


function html_get_td_modal_window() {
    var r = '';

    r += '<td id="td_modal_window">\n';
    r += '<div id="div_modal_window">\n';
    r += '<div id="div_modal_window_content">\n';
    r += '<div id="div_modal_window_content_header">\n</div>\n';
    r += '<div id="div_modal_window_content_body">\n</div>\n';
    r += '<div id="div_modal_window_content_footer">\n</div>\n';
    r += '</div>\n';
    r += '</div>\n';

    return r;
}


function html_get_td_auth() {
    var r = '';
    
    r += '<button id="button_pheno" onclick="wid_open_email_window()">' +
        B_TXT.PHENO + '</button>\n';
    r += '<button id="button_google" onclick="wid_auth(\'google\')">' +
        B_TXT.GOOGLE + '</button>\n';
    r += '<button id="button_facebook" onclick="wid_auth(\'facebook\')">' +
        B_TXT.FACEBOOK + '</button>\n';
    r += '<button id="button_linkedin" onclick="wid_auth(\'linkedin\')">' +
        B_TXT.LINKEDIN + '</button>\n';
    r += '<button id="button_windows" onclick="wid_auth(\'windows\')">' +
        B_TXT.WINDOWS + '</button>\n';
        
    return html_get_td(r, 'td_login');
}


function html_get_td_admin() {
    var r = '';
    
    return html_get_td(r, 'td_admin');
}


function html_get_td_profile() {
    var r = '';
    r += '<span id="span_profile_name">' + L_TXT.USER_NAME +
        '<span></span></span>\n';
    r += '<span id="span_profile_logout">';
    r += '<button>' + B_TXT.LOGOUT + '</button>\n';
    r += '</span>';
    r += '</br>\n';
    r += '<span id="span_profile_email">' + L_TXT.EMAIL +
        '<span></span></span>';
    r += '</br>\n';
    r += '<span id="span_profile_lastdate">' + L_TXT.LAST_LOGIN +
        '<span></span></span>';
    r += '</br>\n';
    r += '<span id="span_profile_counter">' + L_TXT.COUNTER +
        '<span></span></span>';
    r += '</br>\n';
    r += '<span id="span_profile_quote">' + L_TXT.VOLUME + 
        '<span></span></span>';
    r += '</br>\n';

    return html_get_td(r, 'td_profile');
}

function html_get_td_button_upload_file() {
    var r = '';

    r += '<td id="td_open_file">\n';
    r += '<label id="label_open_file" ' +
        'class="ui-button ui-widget ui-corner-all" ' +
        'for="input_open_file">' + L_TXT.UPLOAD_FILE + '</label>\n';
    r += '<input id="input_open_file" type="file" ' +
        'onchange="return wid_upload_file()"></input>';

    return r;
}


function html_get_td_ds_list_ctrl() {
    var r = '';

    r += '<td id="td_ds_ctrl">\n';
    r += '<button id="button_ds_create" ' +
        ' onclick="wid_nc_ds_create()">' +
        B_TXT.CREATE_NEW + '</button>\n';
    
    return r;
}

function html_get_td_ds_list() {
    var r = '';

    r += '<td id="td_ds_list">\n';
    
    return r;
}

/*
function html_get_file_metadata(file) {
    var r = '';
    var t = '';

    r += '<div id="div_open_file">\n';
    r += 'File: ' + file.name + '\n';
    r += '</br>\n';
    r += 'Size: ' + (file.size/1024).toFixed(2) + ' Kbytes\n';
    r += '</br>\n';
    r += '</div>\n';

    t += html_get_tr(
        html_get_td('<label for="input_file_title">Title</label>\n'),
        html_get_td('<input id="input_file_title">\n')
    );

    t += html_get_tr(
        html_get_td('<label for="input_file_author">Author</label>\n'),
        html_get_td('<input id="input_file_author">\n')
    );

    t += html_get_tr(
        html_get_td('<label for="input_file_theme">Theme</label>\n'),
        html_get_td('<input id="input_file_theme">\n')
    );

    t += html_get_tr(
        html_get_td('<label for="input_file_keywords">Keywords</label>\n'),
        html_get_td('<input id="input_file_keywords">\n')
    );

    r += html_get_table(t, 'table_file_properties');
    r += html_get_td_button_upload_file();
    
    return r;
}
*/
