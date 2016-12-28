// (C) 2016


'use strict';

function get_jq_user_email() {
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

// gets object for change user name
function get_jq_user_profile(name) {
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

// gets yes/no object for the operation that needs to be confirmed
function get_jq_yes_no(msg) {
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

// gets datset list object
function get_jq_ds_list(l, ds_id, title) {
    var $obj = $();

    $obj = $obj.add($('<div/>', {
        id: 'div_ds_list'
    }));

    for (let i = 0; i < +l; i++) {
        let $h3 = get_jq_ds_h3(ds_id[i], title[i]);

        $obj.append($h3);

        $obj
            .append($('<div/>', {
                id: 'div_ds_' + ds_id[i],
            })
            .addClass('ds-accordion-content'));
    }

    return $obj;
}

// gets dataset h3 title object
function get_jq_ds_h3(ds_id, title) {
    var $obj = $('<h3/>', {
            id: 'h3_ds_' + ds_id,
        })
        .attr('data-id', ds_id)
        .addClass('ds-accordion-header');
    
    $obj
        .append($('<span/>', {
                text: eng_get_accordion_header(ds_id, title)
            })
            .addClass('accordion-title'));

    return $obj;
}

// gets dataset item properties
function get_jq_ds_get_obj(ds) {
    var $ds_table = $('<table/>');
    var lines = [
        get_jq_ds_item_title(ds), get_jq_ds_item_descr(ds),
        get_jq_ds_item_cat(ds), get_jq_ds_item_keywd(ds),
        get_jq_ds_item_files(ds), get_jq_ds_del_item(ds)//.addClass('ds-item-delete')
    ];

    for (let i = 0, l = lines.length; i < l; i++) {
        $ds_table.append(lines[i]);
    }
    
    $ds_table.addClass('ds-item-table');
    //FIX
    //$ds_table.find('.ds-item-delete').parent().addClass('ds-item-delete-row');
    
    return $ds_table;
}

// gets "Title" row for dataset item
function get_jq_ds_item_title(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                        text: B_TXT.TITLE
                    })
                    .attr('data-text', B_TXT.TITLE)
                    .attr('data-cmd', 'title')
                    .click(function () {
                        wid_click_ds_button($(this), ds, true);
                    }))
                .addClass('ds-item-td-a'))
            .append($('<td/>')
                .append($('<input/>', {
                            value: ds.title
                    })
                    .prop('readonly', true)
                    .addClass('ds-item-title-input'))
                .addClass('ds-item-td-b'))
            .append($('<td/>')
                .append($('<button/>', {
                            text: B_TXT.CANCEL
                    })
                    .click(function () {
                        wid_click_ds_button($(this), ds, false);
                    })
                    .hide())));
    
    $tr.append($td.append($tbl));
    
    return $tr;
}

// gets "Description" row for dataset item
function get_jq_ds_item_descr(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                    text: B_TXT.DSC
                })
                .attr('data-text', B_TXT.DSC)
                .attr('data-cmd', 'descr')
                .click(function () {
                        wid_click_ds_button($(this), ds, true);
                })))
            .append($('<td/>')
                .append($('<textarea/>', {
                    val: ds.descr
                })
                .prop('readonly', true)
                .addClass('ds-item-description-textarea')))
            .append($('<td/>')
                .append($('<button/>', {
                    text: B_TXT.CANCEL
                })
                .click(function () {
                    wid_click_ds_button($(this), ds, false);
                })
                .hide())));
    
    $tr.append($td.append($tbl));
    
    return $tr;
}

// gets "Category" row for dataset item
function get_jq_ds_item_cat(ds) {
    var cat = eng_get_cat_path(ds.categ);
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                    text: B_TXT.CAT
                })
                .attr('data-text', B_TXT.CAT)
                .attr('data-cmd', 'categ')
                .click(function () {
                    wid_click_ds_categ_button($(this), ds);
                })))
            .append($('<td/>')
                .append($('<input/>', {
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
                .addClass('ds-item-category-input'))));
    
    $tr.append($td.append($tbl));
    
    return $tr;
}

// gets menu object for select category
function get_jq_cat_menu(cat, sub_cat) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
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
    
    $tr.append($td.append($span));
    
    return $tr;
}

// gets "Keywords" row for dataset item
function get_jq_ds_item_keywd(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                    text: B_TXT.KWD
                })
                .click(function (e) {
                    if (e.shiftKey) {
                        wid_click_ds_kwd_button(ds, true);
                    } else {
                        wid_click_ds_kwd_button(ds, false);
                    }
                })))
            .append($('<td/>')
                .append(get_jq_ds_kwd_list($('<div/>'), ds, ds.kwd)
                    .addClass('ds-item-keyword-div'))));
    
    $tr.append($td.append($tbl));
    
    return $tr;
}

// gets "Add keyword" windows
function get_jq_ds_kwd_add() {
    var $s = $('<span/>');
    var $d = $('<div/>')
        .html(L_TXT.KWD_SEL);
    var $i = $('<input/>');
    
    $s
        .append($d)
        .append($i);
    return $s;
}

// gets span with [keyword]
function get_jq_ds_kwd_list($obj, ds, list) {
    for (let i = 0, l = list.length; i < l; i++) {
        $obj.append($('<span/>')
                .html('[' + list[i] + '] ')
                .addClass('ds-item-span-kwd')
                .click(function(){
                    wid_click_ds_del_kwd(ds.id, list[i]);
                }));
    }
    
    return $obj;    
}

function get_jq_ds_item_files(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $div = $('<div/>');
    var $h3 = $('<h3/>', {
            text: M_TXT.FILES
        });
    var $acc = $('<div/>')
        .append($h3)
        .append($div.append(get_jq_ds_files_table(ds)))
        .addClass('ds-item-file-list-accordion');
    
    $tr.append($td.append($acc));
    
    return $tr;
}

function get_jq_ds_files_table(ds) {
    var $tbl = $('<table/>', {
        id: 'table_ds_item_' + ds.id + '_file_list'
    });
    
    return $tbl;
}

function get_jq_ds_files_add(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                        text: B_TXT.ADD_FILE,
                    })
                    .click(function () {
                        wid_click_ds_add_file_rec(ds);
                        //set_jq_ds_item_new_file_rec(ds);
                    }))
            )
        );
    
    $tr.append($td.append($tbl));
    
    return $tr;
}

function get_jq_ds_item_file_rec(ds, files) {
    var $t = $('<table/>');
    
    for (let i = 0, l = files.length; i < l; i++) {
        $t
            .append($('<tr/>')
                .append($('<td/>')
                    .html(get_jq_ds_file_put(ds, files[i])))
                .append($('<td/>')
                    .html(get_jq_ds_file_descr(ds, files[i])))
                .append($('<td/>')
                    .html(get_jq_ds_file_delete(ds, files[i]))))    
    }
    
    return $t;
}

function get_jq_ds_file_put(ds, file) {
    var $l = $('<label/>', {
            text: '+'
        })
        .addClass('ui-button ui-widget ui-corner-all ds-add-file');
        
    var $i = $('<input>', {
            type: 'file',
            accept: '.txt,.csv'
        })
        .change(function () {
            wid_open_file(this.files, $(this));
        })
        .appendTo($l);
    
    var $d = $('<div/>')
        .append($l)
        .addClass('ds-file-progresbar');
        
    return $d;
}

function get_jq_ds_file_descr(ds, file) {
    var $i = $('<input/>', {
            val: file.descr
        });

    return $i;
}

function get_jq_ds_file_delete(ds, file) {
    var $b = $('<button/>', {
            text: B_TXT.DELETE
        });

    return $b;
}



function get_jq_ds_del_item(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $btn = $('<button/>', {
            text: B_TXT.DELETE,
        })
        .click(function () {
            wid_click_ds_del_button(ds.id);
        });
    
    $tr.append($td.append($btn));
    
    return $tr;
}
