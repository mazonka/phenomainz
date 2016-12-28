// (C) 2016


'use strict';

function wid_init_ui_accordion($obj, f) {
    $obj.accordion({
        icons: {
            'header': 'ui-icon-triangle-1-e', //'ui-icon-plus',
            'activeHeader': 'ui-icon-triangle-1-s' //'ui-icon-minus'
        },
        active: false,
        heightStyle: 'content',
        collapsible: 'true',
        activate: function (event, ui) {
            (Boolean(f)) && f($(this));
        }
    })
}

function wid_init_ui_kwd_autocomplete($obj, list, ds) {
    list = eng_compare_lists(list, ds.kwd);
    
    $obj.find('input').autocomplete({
        source: list,
        select: function( event, ui ) {
            let val = ui.item.value;
            if (list.indexOf(val) > '-1' || val != '') {
                wid_nc_add_kwd(ds.id, val);
                wid_close_modal_window();
            }
        }
    })
}

function wid_init_ui_button($obj) {
    $obj.find('button').button();
}

function wid_init_ui_progressbar($obj) {
    $obj.find('.ds-file-progressbar').progressbar({
      value: false
    });
}