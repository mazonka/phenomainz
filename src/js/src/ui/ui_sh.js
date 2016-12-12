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
        active: false,
        heightStyle: 'content',
        collapsible: 'true',
        header: 'h3',
        activate: function(event, ui) {
            var id = ($(this).find('.ui-state-active').attr('id'));
            uuu(id);

        }
    });
}


function obj_init () {
    $('button').button();
    $('button').prop('disabled', true);
    $('input').attr('maxlength', '40');
}

