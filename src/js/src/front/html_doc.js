// (C) 2016


'use strict';


function get_html_body() {
    var r = '';

    r += '<table id="table_body">\n';
	
	r += get_html_tr_user_login();
	r += get_html_tr_btn_send_raw();
	r += get_html_tr_modal_window();

    r += '</table>\n';
    
	return r;
}

function get_html_tr_user_login() {
	var r = '';
	
	r += '<tr>';
	r += '<td id="td_email">';
	r += '<label for="input_email">e-mail:<label>';
	r += '<input id="input_email" oninput="wid_oninput_email($(this).val())">';
	r += '<button id="btn_email_login" onclick="wid_send_email()">' + BTN_TEXT.LOGIN + '</button>';
	r += '</tr>';
	
	return r;
}

function get_html_tr_btn_send_raw() {
	var r = '';
	
	r += '<tr>';
	r += '<td>'; 
	r += '<button id="btn_send_raw" onclick="wid_send_raw(PHENOD_CMD.PING)">' + BTN_TEXT.PING + '</button>\n';
	r += '</tr>\n';
	
	return r;
}


function get_html_tr_modal_window() {
    var r = '';
	
	r += '<tr>';
	r += '<td>'; 
    r += '<div id="div_modal_window">\n';
    r += '<div id="div_modal_window_content">\n';
    r += '<div id="div_modal_window_content_header"></div>\n';
    r += '<div id="div_modal_window_content_body">\n';
    r += '<p></p>\n';
    r += '</div>\n';
    r += '<div id="div_modal_window_content_footer"></div>\n';
    r += '</div>\n';
    r += '</div>\n';
	r += '</tr>';

    return r;
}
