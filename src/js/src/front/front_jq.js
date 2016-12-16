// (C) 2016


'use strict';

function wid_get_jq_user_email() {
    var $obj = $();
    $obj = $obj.add('<div/>');

    $obj.append($('<label/>')
        .text('E-mail: ')
        .attr('for', 'input_user_email'));

    $obj.append($('<input/>', {
            id: 'input_user_email'
        })
        .on('input', function () {
            wid_input_email($(this))
        })
        .attr('maxlength', '40'));

    $obj.append($('<button/>', {
            id: 'button_user_email',
            text: B_TXT.SEND_EMAIL
        })
        .click(function () {
            let $window = $('#div_modal_window');

            wid_nc_login();
            $window.click();
        })
        .button()
        .button('disable'));

    return $obj;
}

function wid_get_jq_user_profile(name) {
    var $obj = $();

    $obj = $obj.add('<div/>', {
            id: 'div_user_profile'
        });

    $obj.append($('<label/>')
        .text('Name')
        .attr('for', 'input_user_name'));

    $obj.append($('<input/>', {
            id: 'input_user_name',
            value: name
        })
        .on('input', function () {
            wid_input_name($(this))
        })
        .attr('maxlength', '40'));

    $obj.append($('<button/>', {
            id: 'button_user_name',
            text: B_TXT.CHANGE,
        })
        .click(function () {
            let $window = $('#div_modal_window');

            wid_nc_name();
            $window.click();
        })
        .button()
        .button('disable'));

    $obj.append($('<button/>', {
            id: 'button_user_logout',
            text: B_TXT.LOGOUT,
            click: function () {
                let $window = $('#div_modal_window');

                wid_nc_logout();
                $window.click();
            }
        })
        .button());

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
    var del = wid_get_jq_ds_delete(ds.id);
    var $obj_data = $('<table/>', {
            id: 'table_ds_' + ds.id
        })
        .addClass('dataset-item-table');
    
    $obj_data = wid_get_ds_item_add_row_span($obj_data, del, 'delete');
    $obj_data = wid_get_ds_item_add_row($obj_data, title, 'title');
    $obj_data = wid_get_ds_item_add_row($obj_data, descr, 'descr');

    return $obj_data;
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
            .click(function() { 
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
            .prop('disabled', true)

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
