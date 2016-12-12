// (C) 2016


'use strict';


function dyn_ds_init($obj) {
    $obj.ready(function () {
        ds_init($obj);
    });
}

function ds_init() {
    $('#div_ds_list').accordion({
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
            wid_ds_init(id);
        }
    });
    
}



