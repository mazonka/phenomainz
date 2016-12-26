// (C) 2016


'use strict';

function wid_get_jq_user_email() {
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

function wid_get_jq_user_profile(name) {
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

function wid_get_jq_yes_no(msg) {
    var $obj = $('<div/>');
    
    $obj.append($('<div/>', {
                text: msg
            }))
        .append($('<button/>', {
                text: B_TXT.NO
            })
            .addClass('button-no-button'))
        .append($('<button/>', {
                text: B_TXT.YES
            })
            .addClass('button-yes-button')
        );

    return $obj;
}

function wid_get_jq_ds_h3(ds_id, title) {
    var $obj = $('<h3/>', {
            id: 'h3_ds_' + ds_id,
        })
        .attr('data-id', ds_id);
    
    $obj
        .append($('<span/>', {
                text: eng_get_accordion_header(ds_id, title)
            })
            .addClass('accordion-header'));

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
    var title = wid_get_jq_ds_title(ds);
    var descr = wid_get_jq_ds_descr(ds);
    var categ = wid_get_jq_ds_cat(ds);
    var kwd = wid_get_jq_ds_kwd(ds);
    var add = wid_get_jq_ds_add(ds);
    var files = wid_get_jq_ds_files(ds);
    var del = wid_get_jq_ds_delete(ds.id);
    
    var $obj_data = $('<table/>')
        .addClass('ds-item-table');
    
    $obj_data = wid_get_ds_item_row($obj_data, title);
    $obj_data = wid_get_ds_item_row($obj_data, descr);
    $obj_data = wid_get_ds_item_row($obj_data, categ);
    $obj_data = wid_get_ds_item_row($obj_data, kwd);
    $obj_data = wid_get_ds_item_row($obj_data, add);
    $obj_data = wid_get_ds_item_row_span($obj_data, files);
    $obj_data = wid_get_ds_item_row($obj_data, del);
    
    return $obj_data;
}


function wid_get_ds_item_row($obj, td) {
    $obj.append($('<tr/>')
        .append($('<td/>')
            .addClass('ds-item-table-td-b')
            .append(td.$b))
        .append($('<td/>')
            .addClass('ds-item-table-td-f')
            .append(td.$f))
        .append($('<td/>')
            .addClass('ds-item-table-td-c')
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
function wid_get_jq_ds_title(ds) {
    var obj = {};

    obj.$b = $('<button/>', {
            text: B_TXT.TITLE
        })
        .attr('data-text', B_TXT.TITLE)
        .attr('data-cmd', 'title')
        .click(function () {
            wid_click_ds_button($(this), ds, true);
        });

    obj.$f = $('<input/>', {
            value: ds.title
        })
        .prop('readonly', true);

    obj.$c = $('<button/>', {
            text: B_TXT.CANCEL
        })
        .click(function () {
            wid_click_ds_button($(this), ds, false);
        })
        .hide();

    return obj;
}

function wid_get_jq_ds_descr(ds) {
    var obj = {};

    obj.$b = $('<button/>', {
            text: B_TXT.DSC
        })
        .attr('data-text', B_TXT.DSC)
        .attr('data-cmd', 'descr')
        .click(function () {
            wid_click_ds_button($(this), ds, true);
        });

    obj.$f = $('<textarea/>', {
            val: ds.descr
        })
        .prop('readonly', true)
        .addClass('ds-item-textarea-dsc');

    obj.$c = $('<button/>', {
            text: B_TXT.CANCEL
        })
        .click(function () {
            wid_click_ds_button($(this), ds, false);
        })
        .hide();

    return obj;
}

function wid_get_jq_ds_cat(ds) {
    var obj = {};
    var cat = eng_get_cat_path(ds.categ);
  
    obj.$b = $('<button/>', {
            text: B_TXT.CAT
        })
        .attr('data-text', B_TXT.CAT)
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
        .prop('readonly', true)
        .addClass('ds-item-div-cat');
    
    obj.$c = $();

    return obj;
}

//returns "Keywords" row for dataset item
function wid_get_jq_ds_kwd(ds) {
    var obj = {};
    
    obj.$b = $('<button/>', {
            text: B_TXT.KWD
        })
        .click(function (e) {
            if (e.shiftKey) {
                wid_click_ds_kwd_button(ds, true);
            } else {
                wid_click_ds_kwd_button(ds, false);
            }
        });
 
    obj.$f = $('<div/>')
        .html(wid_get_jq_span_keywords(ds, ds.kwd))
        .addClass('ds-item-div-kwd');
        
    obj.$c = $();

    return obj;
}

// returns "Add keyword" windows
function wid_get_jq_kwd_add() {
    //wid_nc_add_kwd(ds.id, $i.val());
    var $s = $('<span/>');
    var $d = $('<div/>')
        .html(L_TXT.KWD_SEL);
    var $i = $('<input/>');
    
    $s
        .append($d)
        .append($i);
    return $s;
}

//returns span with [keyword]
function wid_get_jq_span_keywords(ds, list) {
    var $div = $('<div/>');
    
    for (let i = 0, l = list.length; i < l; i++) {
        $div.append($('<span/>')
                .html('[' + list[i] + ']')
                .addClass('ds-item-span-kwd')
                .click(function(){
                    wid_click_ds_del_kwd(ds.id, list[i]);
                }));
    }
    
    return $div;    
}

function wid_get_jq_ds_add(ds_id) {
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
                        .html(wid_get_jq_ds_files_load()))
                    .append($('<td/>')
                        .html(wid_get_jq_ds_files_descr()))
                    .append($('<td/>')
                        .html()))
        });

    obj.$f = $();
    obj.$c = $();

    return obj;
}

function wid_get_jq_ds_files(ds_id) {
    var $tbl = $('<table/>')

    return $tbl;
}

function wid_get_jq_ds_files_load() {
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

function wid_get_jq_ds_files_descr() {
    var $input = $('<input/>', {
        });

    return $input;
}

function wid_get_jq_ds_delete(ds_id) {
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

function wid_get_jq_cat_menu(cat, sub_cat) {
    var $span = $('<span/>');
    var $select = $('<select/>', {
        id: 'select_ds_cat'
    });
    var $button = $('<button/>', {
            text: B_TXT.UPDATE,
        });
    var $r_cat = $('<optgroup/>', {
            label: L_TXT.NSPCAT
        })
        .append($('<option/>', {
            value: '0',
            text: '\u002f'
        }));
    var $c_cat = $('<optgroup/>', {
            label: L_TXT.CURCAT
        })
        .append($('<option/>', {
                value: cat.id,
                text: cat.path
            })
            .prop('selected', true));
    var $s_cat = $('<optgroup/>', {
            label: L_TXT.SUBCAT
        });

    for (let i = 0; i < sub_cat.length; i++) {
        $s_cat.append($('<option/>', {
            value: sub_cat[i].id,
            text: sub_cat[i].name
        }));
    }

    if (cat.id != '0') {
        $select
            .append($r_cat)
            .append($c_cat)
            .append($s_cat);
    } else {
        $select
            .append($r_cat)
            .append($s_cat);        
    }
        
    $span
        .append($select)
        .append($button);

    return $span;
}
