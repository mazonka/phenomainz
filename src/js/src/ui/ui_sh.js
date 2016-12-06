// (C) 2016


'use strict';


function dyn_obj_init ($Obj) {
    $Obj.ready(function () {
        obj_init();
    });
}


function obj_init () {
    $('button').button();
    $('#btn_email_login').prop('disabled', true);
}
