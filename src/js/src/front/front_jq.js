// (C) 2016


'use strict';

function jq_get_user_email() {
    var $obj = $('<div/>');
    //$obj = $obj.add('<div/>');

    $obj.append($('<label/>', {
            text: L_TXT.EMAIL
        }))
        .append($('<input/>', {
                id: 'input_user_email'
            })
            .attr('maxlength', INPUT_MAX)
            .on('input', function () {
                wid_input_email($(this))
            }))
        .append($('<button/>', {
                id: 'button_user_email',
                text: B_TXT.SEND_EMAIL
            })
            .click(function () {
                wid_nc_login();
            }));

    return $obj;
}

function jq_get_user_profile(name) {
    var $obj = $('<div/>', {
        id: 'div_user_profile'
    });

    $obj.append($('<label/>', {
            text: 'Name'
            }))
        .append($('<input/>', {
                val: name
            })
            .attr('maxlength', INPUT_MAX)
            .on('input', function () {
                wid_input_name($(this))
            }))
        .append($('<button/>', {
                id: 'button_user_name',
                text: B_TXT.SUBMIT
            })
            .click(function () {
                wid_nc_name($(this));
            }));

    return $obj;
}

function jq_get_yes_no(msg) {
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

function jq_get_ds_h3(ds_id, title) {
    var $obj = $('<h3/>', {
            id: 'h3_ds_' + ds_id,
            text: ds_id + '. ' + title
        })
        .attr('data-id', ds_id);

    return $obj;
}

function jq_get_ds_list(l, ds_id, title) {
    var $obj = $();

    $obj = $obj.add($('<div/>', {
        id: 'div_ds_list'
    }));

    for (let i = 0; i < +l; i++) {
        let $h3 = jq_get_ds_h3(ds_id[i], title[i]);

        $obj.append($h3);

        $obj.append($('<div/>', {
            id: 'div_ds_' + ds_id[i],
        }));
    }

    return $obj;
}

function jq_get_ds_div(ds) {
    var title = jq_get_ds_title(ds);
    var descr = jq_get_ds_descr(ds);
    var categ = jq_get_ds_cat(ds);
    var keywd = jq_get_ds_keyw(ds);
    var add = jq_get_ds_add(ds);
    var files = jq_get_ds_files(ds);
    var del = jq_get_ds_delete(ds.id);
    
    var $obj_data = $('<table/>')
        .addClass('ds-item-table');
    
    $obj_data = wid_get_ds_item_row($obj_data, title);
    $obj_data = wid_get_ds_item_row($obj_data, descr);
    $obj_data = wid_get_ds_item_row($obj_data, categ);
    $obj_data = wid_get_ds_item_row($obj_data, keywd);
    $obj_data = wid_get_ds_item_row($obj_data, add);
    $obj_data = wid_get_ds_item_row_span($obj_data, files);
    $obj_data = wid_get_ds_item_row($obj_data, del);
    
    $obj_data
        .find('button')
        .css('width', '100');
        
    return $obj_data;
}


function wid_get_ds_item_row($obj, td) {
    $obj.append($('<tr/>')
        .append($('<td/>')
            .css('width', '80px')
            .append(td.$b))
        .append($('<td/>')
            .css('width', '240px')
            .append(td.$f))
        .append($('<td/>')
            .css('width', '60px')
            .append(td.$c)));
        
    return $obj;
}

function wid_get_ds_item_row_span($obj, td_data) {
    $obj.append($('<tr/>')
        .append($('<td/>')
            .attr('colspan', '3')
            .append(td_data)));
        
    return $obj;
}
function jq_get_ds_title(ds) {
    var obj = {};

    obj.$b = $('<button/>', {
            text: 'Title'
        })
        .attr('data-text', 'Title')
        .attr('data-cmd', 'title')
        .click(function () {
            wid_click_ds_button($(this), ds.id, true);
        });

    obj.$f = $('<input/>', {
            value: ds.title
        })
        .prop('readonly', true);

    obj.$c = $('<button/>', {
            text: 'Cancel'
        })
        .click(function () {
            wid_click_ds_button($(this), ds.id, false);
        })
        .hide();

    return obj;
}

function jq_get_ds_descr(ds) {
    var obj = {};

    obj.$b = $('<button/>', {
            text: 'Description'
        })
        .attr('data-text', 'Description')
        .attr('data-cmd', 'descr')
        .click(function () {
            wid_click_ds_button($(this), ds.id, true);
        });

    obj.$f = $('<textarea/>', {
            val: ds.descr
        })
        .prop('readonly', true);

    obj.$c = $('<button/>', {
            text: 'Cancel'
        })
        .click(function () {
            wid_click_ds_button($(this), ds.id, false);
        })
        .hide();

    return obj;
}

function jq_get_ds_cat(ds) {
    var obj = {};
    var cat = eng_get_cat_path(ds.categ);
  
    obj.$b = $('<button/>', {
            text: 'Category'
        })
        .attr('data-text', 'Category')
        .attr('data-cmd', 'categ')
        .click(function () {
            wid_click_ds_categ_button($(this), ds);
        });

    obj.$f = $('<input/>', {
            val: cat
        })
        .hover(function() {
                $(this).animate({
                    'scrollLeft': this.scrollWidth
                }, 
                this.value.length * 50)
            },
            function() {
                $(this).stop();
                this.scrollLeft = 0;
            })
        .prop('readonly', true);
    
    obj.$c = $();

    return obj;
}

function jq_get_ds_keyw(ds) {
    var obj = {};

    obj.$b = $('<button/>', {
            text: 'Keywords'
        })
        .attr('data-text', 'Keywords')
        .attr('data-cmd', 'addkw')
        .click(function () {
            wid_click_ds_keywd_button($(this), ds);
        });
    
    obj.$f = $('<textarea/>', {
            val: ds.keywd.join(';')
        })
        .prop('readonly', true);

    obj.$c = $();

    return obj;
}

function jq_get_ds_add(ds_id) {
    var obj = {};

    obj.$b = $('<button/>', {
            text: B_TXT.FILE,
        })
        .click(function () {
            $(this)
                .closest('tr')
                .next('tr')
                .find('table')
                .append($('<tr/>')
                    .append($('<td/>')
                        .html(jq_get_ds_files_load()))
                    .append($('<td/>')
                        .html(jq_get_ds_files_descr()))
                    .append($('<td/>')
                        .html()))
        });

    obj.$f = $();
    obj.$c = $();

    return obj;
}

function jq_get_ds_files(ds_id) {
    var $tbl = $('<table/>')

    return $tbl;
}

function jq_get_ds_files_load() {
    var $label = $('<label/>', {
            text: '+'
        })
        .addClass('ui-button ui-widget ui-corner-all ds-add-file');
        
    var $input = $('<input>', {
            type: 'file',
            accept: '.txt,.csv'
        })
        .change(function () {
            wid_open_file(this.files, $(this));
        })
        .appendTo($label);

    return $label;
}

function jq_get_ds_files_descr() {
    var $input = $('<input/>', {
        });

    return $input;
}

function jq_get_ds_delete(ds_id) {
    var obj = {};
    
    obj.$b = $('<button/>', {
            text: B_TXT.DELETE,
        })
        .click(function () {
            wid_click_ds_del_button(ds_id);
        });
    obj.$f = $();
    obj.$c = $();

    return obj;
}

function jq_get_cat_menu(cat, sub_cat) {

    var $span = $('<span/>');
    var $select = $('<select/>', {
        id: 'select_ds_cat'
    });
    var $button = $('<button/>', {
        text: 'View',
    });
    var $r_cat = $('<optgroup/>', {
            label: 'Root category'
        })
        .append($('<option/>', {
            value: 0,
            text: '\\'
        }));
    var $c_cat = $('<optgroup/>', {
            label: 'Current category'
        })
        .append($('<option/>', {
            value: cat.id,
            text: cat.path
        }));
    var $s_cat = $('<optgroup/>', {
        label: 'Subcategory'
    });

    for (let i = 0; i < sub_cat.length; i++) {
        $s_cat.append($('<option/>', {
            value: sub_cat[i].id,
            text: sub_cat[i].name
        }));
    }

    $span
        .append($select
            .append($r_cat)
            .append($c_cat)
            .append($s_cat))
        .append($button);

    return $span;
}