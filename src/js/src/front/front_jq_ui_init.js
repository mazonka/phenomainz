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

function wid_init_ui_tooltip($obj) {
    $obj.tooltip({
        show: {
            effect: 'slideDown',
            delay: 250
        }
    });
}

function wid_init_ui_cat_menu($obj, ds, pcat)
{
    let $b = $obj.find('button');
    let $m = $obj.find('select');

    $b
        .button()
        .click(function()
        {
            let cat_id = $(this).parent().find(
                'select :selected').attr('value');

            wid_close_modal_window();
            wid_nc_ds_upd_categ(ds.id, cat_id);
        });

    $m.selectmenu(
    {
        select: function(event, ui)
        {
            let ncat = {};
            ncat.id = ui.item.value;

            if (ncat.id == '0') ncat.path = '\u002f';
            else if (ncat.id == pcat.id) ncat.path = pcat.path;
            else ncat.path = (pcat.id == '0')
                ? pcat.path + ui.item.label 
                : pcat.path + '\u002f' + ui.item.label;

            wid_nc_cat_kids(ncat, ds);

        }
    });
};
