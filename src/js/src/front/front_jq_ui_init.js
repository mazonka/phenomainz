// (C) 2016


'use strict';

function wid_init_ui_accordion($obj) {
    $obj.accordion({
        icons: {
            'header': 'ui-icon-plus',
            'activeHeader': 'ui-icon-minus'
        },
        active: false,
        heightStyle: 'content',
        collapsible: 'true',
        header: 'h3',
        activate: function (event, ui) {
            var ds_id = ($(this)
                .find('.ui-state-active')
                .attr('data-id'));

            if (typeof ds_id !== 'undefined') {
                wid_nc_ds_get(ds_id, false);
            }
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