// (C) 2016


'use strict';


function doc_ph_write() {
    document.write(ph_write());
}


function ph_write() {
    return get_html_body();
}


function doc_ph_init() {
    $(document).ready(function () {
        ph_init();
    });
}


function ph_init() {
    $('button').button();
    $('#div_modal_window').css('display', 'none');
}


function ph_obj_init ($Obj) {
    $Obj.ready(function () {
        obj_init();
    });
}


function obj_init () {
    $('button').button();
    $('#btn_email_login').prop('disabled', true);
}
