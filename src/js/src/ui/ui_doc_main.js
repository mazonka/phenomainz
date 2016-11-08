// (C) 2016


'use strict';


const PHENOD_CMD = {
    PING: 'ping',
    LOGIN: 'login'
};

const IMG = {
    LOGO_WAIT: 'img/logo_wt.gif',
    LOGO_DONE: 'img/logo_dn.png',
    LOGO_FAIL: 'img/logo_fl.png'
};

var g_img = [
    IMG.LOGO_WAIT, IMG.LOGO_DONE, IMG.LOGO_FAIL
];

var g_img_preload = [];

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
