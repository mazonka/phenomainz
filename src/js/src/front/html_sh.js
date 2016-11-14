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


