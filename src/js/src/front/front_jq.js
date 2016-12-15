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
        .on('click', function () {
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
        .on('click', function () {
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
                wid_nc_ds_get(ds_id);
            }
        }
    });

    return $obj;
}

function wid_get_jq_ds_item_title(ds) {
    var obj = {};

    obj.$label = $('<label/>', {
                id: 'label_ds_' + ds.id + '_title',
                text: 'Title'
            })
            .attr('for', 'input_ds_' + ds.id + '_title');
        
    obj.$input = $('<input/>', {
                id: 'input_ds_' + ds.id + '_title',
                value: ds.title
            })
            .attr('for', 'input_ds_' + ds.id + '_title');

    obj.$ctrl = $('<div/>')
        .append($('<div/>', {
                id: 'div_ds_' + ds.id + '_title_edit',
                text: ' e '
            })
            .addClass('dataset-item-button'))
        .append($('<div/>', {
                id: 'div_ds_' + ds.id + '_title_submit',
                text: ' s '
            })
            .addClass('dataset-item-button'))
        .append($('<div/>', {
                id: 'div_ds_' + ds.id + '_title_clear',
                text: ' c '
            })
            .addClass('dataset-item-button'));

    return obj;
}

function wid_get_jq_ds_item_descr(ds) {
    var obj = {};

    obj.$label = $('<label/>', {
                id: 'label_ds_' + ds.id + '_descr',
                text: 'Description'
            })
            .attr('for', 'input_ds_' + ds.id + '_descr');
        
    obj.$input = $('<input/>', {
                id: 'input_ds_' + ds.id + '_descr',
                value: ds.title
            })
            .attr('for', 'input_ds_' + ds.id + '_descr');

    obj.$ctrl = $('<div/>')
        .append($('<div/>', {
                id: 'div_ds_' + ds.id + '_descr_edit',
                text: ' e '
            })
            .addClass('dataset-item-button'))
        .append($('<div/>', {
                id: 'div_ds_' + ds.id + '_descr_submit',
                text: ' s '
            })
            .addClass('dataset-item-button'))
        .append($('<div/>', {
                id: 'div_ds_' + ds.id + '_descr_clear',
                text: ' c '
            })
            .addClass('dataset-item-button'));

    return obj;
}


function wid_get_jq_ds_item(ds) {
    var $obj = $('#div_ds_' + ds.id);
    var $obj_data;
    var $obj_files = $();
    var title = wid_get_jq_ds_item_title(ds);
    var descr = wid_get_jq_ds_item_descr(ds);
    
    $obj_data = $('<table/>', {
            id: 'table_ds_' + ds.id
        })
        .addClass('dataset-item-table');
    
    $obj_data
        .append($('<tr/>')
            .append($('<td/>')
                .css('width', '80px')
                .append(title.$label ))
            .append($('<td/>')
                .css('width', '160px')
                .append(title.$input ))
            .append($('<td/>')
                .css('width', '60px')
                .append(title.$ctrl ))
        );

    $obj_data
        .append($('<tr/>')
            .append($('<td/>')
                .css('width', '80px')
                .append(descr.$label ))
            .append($('<td/>')
                .css('width', '160px')
                .append(descr.$input ))
            .append($('<td/>')
                .css('width', '60px')
                .append(descr.$ctrl ))
        );

    $obj_files = $obj_files.add($('<div/>', {
                id: 'div_ds_' + ds.id + '_files',
            }));

    $obj.append($obj_data);
    //$obj.append($obj_files);

    return $obj;
}

function wid_get_jq_ds_item_ctrl(ds_id) {
    var $obj = $();

    $obj = $obj.add($('<div/>'));

    $obj.append($('<button/>', {
            text: B_TXT.DS_DELETE,
            id: 'button_ds_delete_' + ds_id,
            click: function () {
                wid_nc_ds_delete(ds_id);
            }
        }).button());

    return $obj;
}
