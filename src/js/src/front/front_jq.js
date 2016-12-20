// (C) 2016


'use strict';

function wid_get_jq_user_email() {
    var $obj = $('<div/>');
    //$obj = $obj.add('<div/>');

    $obj.append($('<label/>')
            .text('E-mail: ')
            .attr('for', 'input_user_email'))
        .append($('<input/>', {
                id: 'input_user_email'
            })
            .on('input', function () {
                wid_input_email($(this))
            })
            .attr('maxlength', '40'))
        .append($('<button/>', {
                id: 'button_user_email',
                text: B_TXT.SEND_EMAIL
            })
            .click(function () {
                let $window = $('#div_modal_window');

                wid_nc_login();
                $window.click();
            }));
            
    return $obj;
}

function wid_get_jq_user_profile(name) {
    var $obj = $('<div/>', {
        id: 'div_user_profile'
    });

    $obj.append($('<label/>')
            .text('Name')
            .attr('for', 'input_user_name'))
        .append($('<input/>', {
                id: 'input_user_name',
                value: name
            })
            .on('input', function () {
                wid_input_name($(this))
            })
            .attr('maxlength', '40'))
        .append($('<button/>', {
                id: 'button_user_name',
                text: B_TXT.CHANGE,
            })
            .click(function () {
                let $window = $('#div_modal_window');

                wid_nc_name();
                $window.click();
            }))
        .append($('<button/>', {
            id: 'button_user_logout',
            text: B_TXT.LOGOUT,
            click: function () {
                let $window = $('#div_modal_window');

                wid_nc_logout();
                $window.click();
            }
        }));

    return $obj;
}

function wid_get_jq_ds_list(l, ds_id, title) {
    var $obj = $();

    $obj = $obj.add($('<div/>', {
                id: 'div_ds_list'
            }));

    for (let i = 0; i < +l; i++) {
        $obj.append($('<h3/>', {
                id: 'h3_ds_' + ds_id[i],
                text: ds_id[i] + '. ' + title[i]
            }).attr('data-id', ds_id[i]));

        $obj.append($('<div/>', {
                id: 'div_ds_' + ds_id[i],
            }));
    }

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
            var ds_id = ($(this).find('.ui-state-active').attr('data-id'));

            if (typeof ds_id !== 'undefined') {
                wid_nc_ds_get(ds_id, false);
            }
        }
    });

    return $obj;
}

function wid_get_jq_ds_item(ds) {
    var title = wid_get_jq_ds_item_title(ds);
    var descr = wid_get_jq_ds_item_descr(ds);
    var cat = wid_get_jq_ds_item_cat(ds);
    var keyw = wid_get_jq_ds_item_keyw(ds);
    var del = wid_get_jq_ds_delete(ds.id);
    
    var $obj_data = $('<table/>', {
            id: 'table_ds_' + ds.id
        })
        .addClass('dataset-item-table');
    
    $obj_data = wid_get_ds_item_add_row_span($obj_data, del, 'delete');
    $obj_data = wid_get_ds_item_add_row($obj_data, title, 'title');
    $obj_data = wid_get_ds_item_add_row($obj_data, descr, 'descr');
    $obj_data = wid_get_ds_item_add_row($obj_data, cat, 'cat');
    $obj_data = wid_get_ds_item_add_row($obj_data, keyw, 'keyw');

    return $obj_data;
}


function wid_get_ds_item_add_row($obj, td, data_id) {
    $obj.append($('<tr/>')
        .attr('data-id', data_id)
        .append($('<td/>')
            .css('width', '80px')
            .append(td.$name))
        .append($('<td/>')
            .css('width', '160px')
            .append(td.$val))
        .append($('<td/>')
            .css('width', '60px')
            .append(td.$ctrl)));
        
    return $obj;
}

function wid_get_ds_item_add_row_span($obj, td_data, data_id) {
    $obj.append($('<tr/>')
        .attr('data-id', data_id)
        .append($('<td/>')
            .attr('colspan', '3')
            .append(td_data)));
        
    return $obj;
}

function wid_get_jq_ds_item_title(ds) {
    var obj = {};

    obj.$name = $('<label/>', {
            id: 'label_ds_' + ds.id + '_title',
            text: 'Title'
        })
        .attr('for', 'input_ds_' + ds.id + '_title');

    obj.$val = $('<input/>', {
            id: 'input_ds_' + ds.id + '_title',
            value: ds.title
        })
        .prop('disabled', true);

    obj.$ctrl = $('<div/>')
        .append($('<div/>', {
                //id: 'div_ds_' + ds.id + '_title_edit',
                text: '(e)',
                title: 'Edit'
            })
            .click(function () {
                wid_click_ds_ctrl(ds, 'edit', $(this));
            })
            .addClass('dataset-edit-button'))
        .append($('<div/>', {
                text: '(c)',
                title: 'Cancel'
            })
            .prop('disabled', true)
            .addClass('dataset-cancel-button dataset-disabled-button'));

    return obj;
}

function wid_get_jq_ds_item_descr(ds) {
    var obj = {};

    obj.$name = $('<label/>', {
                id: 'label_ds_' + ds.id + '_descr',
                text: 'Description'
            })
            .attr('for', 'input_ds_' + ds.id + '_descr');
        
    obj.$val = $('<textarea/>', {
                id: 'textarea_ds_' + ds.id + '_descr',
                val: ds.descr
            })
            .prop('disabled', true);

    obj.$ctrl = $('<div/>')
        .append($('<div/>', {
                //id: 'div_ds_' + ds.id + '_descr_edit',
                text: '(e)',
                title: 'Edit'
            })
            .click(function() {
                wid_click_ds_ctrl(ds, 'edit', $(this));
            })
            .addClass('dataset-edit-button'))
        .append($('<div/>', {
                text: '(c)',
                title: 'Cancel'
            })
            .addClass('dataset-cancel-button dataset-disabled-button')
            .prop('disabled', true));

    return obj;
}


function wid_get_jq_ds_item_cat(ds) {
    var obj = {};
    var cat = '[' + ds.cat.join('/') + ']';
    
    
    obj.$name = $('<button/>', {
            id: 'button_ds_' + ds.id + '_cat',
            text: 'Category'
        }).click(function () {
            wid_nc_ds_cat(ds, 0);
        });
    
    
    obj.$val = $('<span/>', {
            id: 'span_ds_' + ds.id + '_cat',
            text: cat
        })

    obj.$ctrl = $('<div/>');
            
    return obj;
    
}

function wid_get_jq_ds_item_keyw(ds) {
    var obj = {};
    
    obj.$name = $('<button/>', {
            id: 'button_ds_' + ds.id + '_keyw',
            text: 'Keywords'
        }).click(function () {
            wid_click_ds_modal(ds, $(this));
        });
            
    obj.$val = $('<span/>', {
                id: 'span_ds_' + ds.id + '_keyw',
                text: '[' + ds.keyw.join('/') + ']'
    })

    obj.$ctrl = $('<div/>');
 
    return obj;
    
}

function wid_get_jq_ds_delete(ds_id) {
    var $obj = $('<button/>', {
            text: B_TXT.DS_DELETE,
            id: 'button_ds_delete_' + ds_id,
            click: function () {
                wid_nc_ds_delete(ds_id);
            }
        }).button();

    return $obj;
}

function wid_get_jq_cat_menu(ds, cat) {
    var $span = $('<span/>');
    var $menu = $('<select/>', {
            id: 'select_ds_cat'
        });
    var $button = $('<button/>', {
            text: 'Change',
        });
    
    $menu.append($('<option/>', {
            value: 0,
            text: '/'
        }));        
        
    for (let i = 0; i < cat.length; i++) {
        $menu.append($('<option/>', {
            value: cat[i].id,
            text: cat[i].name
        }));
        //r += cat[i].id + ':' + cat[i].name + '\n';
    }
    
    $span.append($menu).append($button);
    
    return $span;
}