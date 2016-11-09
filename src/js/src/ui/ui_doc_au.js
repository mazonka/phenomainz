// (C) 2016


'use strict';


function doc_main_write() {
    document.write(main_write());
}


function main_write() {
    return get_html_body();
}


function doc_main_init() {
    $(document).ready(function () {
        main_init();
    });
}


function main_init() {
    $('button').button();
    $('#div_modal_window').css('display', 'none');
}


function doc_obj_init ($Obj) {
    $Obj.ready(function () {
        obj_init();
    });
}


function obj_init () {
    $('button').button();
    $('#btn_email_login').prop('disabled', true);
}
