// (C) 2016


'use strict';

function wid_jq_ui_init_ds_accordion($obj) {
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

function wid_jq_init_autocomplete($obj, list) {
    $obj.autocomplete({
        source: list
    })
}

function wid_jq_init_button($obj) {
    $obj.find('button').button();
}