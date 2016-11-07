// (C) 2016


'use strict';


const PHENOD_CMD = {
	PING: 'ping'
};

function doc_main_write() {
    document.write(doc_main());
}

function doc_main_init() {
    $(document).ready(function () {
        doc_init();
    });
}

function doc_init() {
	$('button').button();
	$('#div_modal_window').css('display', 'none');
	$('#btn_email_login').prop('disabled', true);
}

function doc_main() {
    return get_html_body();
}
