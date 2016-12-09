// (C) 2016


'use strict';


function dyn_obj_init ($Obj) {
    $Obj.ready(function () {
        obj_init();
    });
}


function obj_init () {
    $('button').button();
    $('#button_user_email').prop('disabled', true);
    $('#button_user_name').prop('disabled', true);
    $('#input_user_name, #input_user_email').val('').attr('maxlength', '40');
}
