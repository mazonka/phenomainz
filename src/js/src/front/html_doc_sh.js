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


function get_html_td(data, id) {
    var r = '';
    
    r += '<td id="' + id +'">';
    r += data;
    
    return r;
}


function get_html_td_logo() {
    var r = '';

    r += '<td id="td_logo">';
    r += '<img id="img_logo" src="'+ IMG.LOGO_DONE + '">';
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
