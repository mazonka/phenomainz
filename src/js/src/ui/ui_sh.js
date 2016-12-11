// (C) 2016


'use strict';


function dyn_obj_init ($Obj) {
    $Obj.ready(function () {
        obj_init();
    });
}


function dyn_dataset_init() {
    $('#div_dataset_list').accordion({
        icons: {
            'header': 'ui-icon-plus',
            'activeHeader': 'ui-icon-minus'
        },
        active: 0,
        heightStyle: 'content',
        collapsible: 'true',
        header: 'h3',
        activate: function(event, ui) {
            
        }
    });
}


function obj_init () {
    $('button').button();
    $('#button_user_email').prop('disabled', true);
    $('#button_user_name').prop('disabled', true);
    $('#input_user_name, #input_user_email').val('').attr('maxlength', '40');
}

