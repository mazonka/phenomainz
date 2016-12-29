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
        id: DIV_DS_LIST
    }));

    for (let i = 0; i < +l; i++) {
        let $h1 = get_jq_ds_h1(ds_id[i], title[i]);

        $obj.append($h1);

        $obj
            .append($('<div/>', {
                id: DIV_DS + ds_id[i],
            })
            .attr('data-id', ds_id[i])
            .addClass('dslist-accordion-content'));
    }

    return $obj;
}

// gets dataset h3 title object
function get_jq_ds_h1(ds_id, title) {
    var $obj = $('<h1/>', {
            id: H1_DS + ds_id,
        })
        .attr('data-id', ds_id)
        .addClass('dslist-accordion-header');
    
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
        get_jq_ds_item_files(ds), get_jq_ds_del_item(ds)//.addClass('ds-delete')
    ];

    for (let i = 0, l = lines.length; i < l; i++) {
        $ds_table.append(lines[i]);
    }
    
    $ds_table.addClass('ds-table');
    //FIX
    //$ds_table.find('.ds-delete').parent().addClass('ds-delete-row');
    
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
                .addClass('ds-td-a'))
            .append($('<td/>')
                .append($('<input/>', {
                            value: ds.title
                    })
                    .prop('readonly', true)
                    .addClass('ds-title-input'))
                .addClass('ds-td-b'))
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
                .addClass('ds-description-textarea')))
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
                .addClass('ds-category-input'))));
    
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
                    .addClass('ds-keyword-div'))));
    
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
                .addClass('ds-span-kwd')
                .click(function(){
                    wid_click_ds_del_kwd(ds.id, list[i]);
                }));
    }
    
    return $obj;    
}

// gets accordion with with file list
function get_jq_ds_item_files(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $div = $('<div/>');
    var $h2 = $('<h2/>', {
            text: M_TXT.FILES
        });
    var $acc = $('<div/>')
        .append($h2)
        .append($div
            .addClass('files-accordion-content')
        )
        .addClass('files-accordion');
    
    $tr.append($td.append($acc));
    
    return $tr;
}

// gets empty table for datasets file list
function get_jq_ds_files_table(ds_id, files, new_file) {
    var $tbl = $('<table/>');
    
    $tbl
        .append(get_jq_ds_files_add(ds_id))
        .append(get_jq_ds_item_file_rec(ds_id, files, new_file));
    return $tbl;
}

// gets row with button for files accordion
function get_jq_ds_files_add(ds_id) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $lb = $('<label/>', {
            text: B_TXT.ADD_FILE
        })
        .addClass('ui-button ui-widget ui-corner-all ds-add-file');
    var $in = $('<input>', {
            type: 'file',
            accept: '.txt,.csv'
        })
        .change(function () {
            wid_click_add_file(this.files, ds_id);
        })
        .appendTo($lb);
        
    $tr.append($td.append($lb));
   
    return $tr;
}
    
function get_jq_ds_item_file_rec(ds_id, files, new_file) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');    
    var $tbl = $('<table/>');

    for (let i = 0, l = files.length; i < l; i++) {
        let size = files[i].size;
        let descr = files[i].descr;
        let id = files[i].id;

        if (Boolean(new_file) && files[i].id == new_file.id) {
            console.log('1');
            size = new_file.size;
            descr = new_file.name;
            id = new_file.id;
        } 
        
        $tbl
            .append($('<tr/>')
                .append($('<td/>')
                    .html('Size: ' + size)
                )
                .append($('<td/>')
                    .html('Descr')
                )
                .append($('<td/>')
                    .html(get_jq_ds_file_descr(ds_id, descr)
                ))                
                .append($('<td/>')
                    .html(get_jq_ds_file_delete(ds_id, id))
                )
            );
    }
        $tr.append($td.append($tbl));

    
    return $tr;
}

function get_jq_ds_file_descr(ds_id, descr) {
    var $i = $('<input/>', {
            val: descr
        });

    return $i;
}

function get_jq_ds_file_delete(ds_id, fl_id) {
    var $b = $('<button/>', {
            text: B_TXT.DELETE
        })
        .click(function () {
            wid_nc_ds_file_del(ds_id, fl_id);
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
