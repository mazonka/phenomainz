// (C) 2016


'use strict';

function wid_get_jq_user_email() {
    var $obj = $('<div/>');
    //$obj = $obj.add('<div/>');

    $obj.append($('<label/>', {
            text: 'E-mail: '
        }))
        .append($('<input/>', {
                id: 'input_user_email'
            })
            .attr('maxlength', INPUT_MAX))
        .append($('<button/>', {
            id: 'button_user_email',
            text: B_TXT.SEND_EMAIL
        }));

    return $obj;
}

function wid_get_jq_user_profile(name) {
    var $obj = $('<div/>', {
        id: 'div_user_profile'
    });

    $obj.append($('<label/>', {
            text: 'Name'
            }))
        .append($('<input/>', {
                id: 'input_user_name',
                value: name
            })
            .attr('maxlength', INPUT_MAX))
        .append($('<button/>', {
                id: 'button_user_name',
                text: B_TXT.SUBMIT
            }));

    return $obj;
}

function wid_get_jq_yes_no(msg) {
    var $obj = $('<div/>');
    
    $obj.append($('<div/>', {
                text: msg
            }))
        .append($('<button/>', {
                text: 'No'
            })
            .addClass('button-no-button'))
        .append($('<button/>', {
                text: 'Yes'
            })
            .addClass('button-yes-button')
        );

    return $obj;
}

function wid_get_jq_ds_h3(ds_id, title) {
    var $obj = $('<h3/>', {
            id: 'h3_ds_' + ds_id,
            text: ds_id + '. ' + title
        })
        .attr('data-id', ds_id);

    return $obj;
}

function wid_get_jq_ds_list(l, ds_id, title) {
    var $obj = $();

    $obj = $obj.add($('<div/>', {
        id: 'div_ds_list'
    }));

    for (let i = 0; i < +l; i++) {
        let $h3 = wid_get_jq_ds_h3(ds_id[i], title[i]);

        $obj.append($h3);

        $obj.append($('<div/>', {
            id: 'div_ds_' + ds_id[i],
        }));
    }

    return $obj;
}

function wid_get_jq_ds_div(ds) {
    var title = wid_get_jq_ds_item_title(ds);
    var descr = wid_get_jq_ds_item_descr(ds);
    var cat = wid_get_jq_ds_item_cat(ds);
    var keyw = wid_get_jq_ds_item_keyw(ds);
    var del = wid_get_jq_ds_delete(ds.id);
    
    var $obj_data = $('<table/>', {
            id: 'table_ds_' + ds.id
        })
        .addClass('ds-item-table');
    
    $obj_data = wid_get_ds_item_row($obj_data, title, 'title');
    $obj_data = wid_get_ds_item_row($obj_data, descr, 'descr');
    $obj_data = wid_get_ds_item_row($obj_data, cat, 'cat');
    $obj_data = wid_get_ds_item_row($obj_data, keyw, 'keyw');
    $obj_data = wid_get_ds_item_row_span($obj_data, del, 'delete');
    
    $obj_data
        .find('button')
        .css('width', '100');
        
    return $obj_data;
}


function wid_get_ds_item_row($obj, td, data_id) {
    $obj.append($('<tr/>')
        .attr('data-id', data_id)
        .append($('<td/>')
            .css('width', '80px')
            .append(td.$name))
        .append($('<td/>')
            .css('width', '240px')
            .append(td.$val))
        .append($('<td/>')
            .css('width', '60px')
            .append(td.$ctrl)));
        
    return $obj;
}

function wid_get_ds_item_row_span($obj, td_data, data_id) {
    $obj.append($('<tr/>')
        .attr('data-id', data_id)
        .append($('<td/>')
            .attr('colspan', '3')
            .append(td_data)));
        
    return $obj;
}

function wid_get_jq_ds_item_title(ds) {
    var obj = {};

    obj.$name = $('<button/>', {
            text: 'Title'
        })
        .attr('data-text', 'Title')
        .attr('data-cmd', 'title')
        .addClass('ds-prop-button');

    obj.$val = $('<input/>', {
            id: 'input_ds_' + ds.id + '_title',
            value: ds.title
        })
        .prop('disabled', true);

    obj.$ctrl = $('<button/>', {
            text: 'Cancel'
        })
        .addClass('ds-cancel-button')
        .hide();
        
    return obj;
}

function wid_get_jq_ds_item_descr(ds) {
    var obj = {};

    obj.$name = $('<button/>', {
                text: 'Description'
            })
            .attr('data-text', 'Description')
            .attr('data-cmd', 'descr')
            .addClass('ds-prop-button');
        
    obj.$val = $('<textarea/>', {
                id: 'textarea_ds_' + ds.id + '_descr',
                val: ds.descr
            })
            .prop('disabled', true);

    obj.$ctrl = $('<button/>', {
            text: 'Cancel'
        })
        .addClass('ds-cancel-button')
        .hide();

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
        })
        .click(function () {
            wid_nc_ds_delete(ds_id)
        });

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
    }

    $span.append($menu)
        .append($button);

    return $span;
}