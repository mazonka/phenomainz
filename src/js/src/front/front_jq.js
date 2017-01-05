// (C) 2016


'use strict';

function get_jq_user_email() {
    var $div = $('<div/>')
        .append($('<label/>', {
            text: L_TXT.EMAIL
        }))
        .append($('<input/>', {
                id: 'input_user_email'
            })
            .attr('maxlength', INPUT_MAX)
            .on('input', function () {
                wid_input_email($(this));
            }))
        .append($('<button/>', {
                id: 'button_user_email',
                text: B_TXT.SEND_EMAIL
            })
            .click(function () {
                wid_nc_login();
                wid_close_modal_window();
            }));

    return $div;
}

// gets object for change user name
function get_jq_user_profile(name)
{
    var $obj = $('<div/>')
        .append($('<label/>',
        {
            text: 'Name'
        }))
        .append($('<input/>',
            {
                val: name,
                id: 'input_user_name'
            })
            .attr('maxlength', INPUT_MAX)
            .on('input', function()
            {
                wid_input_name($(this))
            }))
        .append($('<button/>',
            {
                id: 'button_user_name',
                text: B_TXT.SUBMIT
            })
            .click(function()
            {
                wid_nc_name($(this));
                wid_close_modal_window();
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
    var $obj = $('<div/>', {
        id: DIV_DS_LIST
    });

    for (let i = 0; i < +l; i++) {
        let $h1 = get_jq_ds_h1(ds_id[i], title[i]);

        $obj.append($h1);

        $obj
            .append($('<div/>', {
                    id: DIV_DS + ds_id[i],
                })
                .attr('data-id', ds_id[i])
                .addClass('dsitem-content-div')
                .append($('<div/>')
                    .addClass('dsprops-div')
                )
                .append($('<div/>')
                    .addClass('dsfiles-div')
                )
            );
    }

    return $obj;
}

// gets dataset h3 title object
function get_jq_ds_h1(ds_id, title) {
    var $obj = $('<h1/>', {
            id: H1_DS + ds_id,
        })
        .attr('data-id', ds_id)
        .addClass('dsitem-header-h1');

    $obj
        .append($('<span/>', {
                text: eng_get_accordion_header(ds_id, title)
            })
            .addClass('dsitem-header-title')
        )
        .append(get_jq_ds_item_del(ds_id)
    )
    return $obj;
}

function get_jq_ds_item_del(ds_id) {
    var $span = $('<span/>', {
            title: TIP.DS_DEL
        })
        .append($('<img/>', {
            src: IMG.CROSS
        }))
        .addClass('dsitem-header-delete')
        .click(function (event) {
            event.stopPropagation();
            event.preventDefault();
            wid_click_ds_del_button(ds_id);
        });

    return $span;
}

// gets dataset item properties
function get_jq_dsitem_props(ds) {
    var $tbl = $('<table/>');
    var lines = [
        get_jq_dsitem_title(ds), get_jq_dsitem_descr(ds),
        get_jq_dsitem_categ(ds), get_jq_dsitem_keywd(ds)
    ];

    for (let i = 0, l = lines.length; i < l; i++) {
        $tbl.append(lines[i]);
    }

    $tbl.addClass('dsprops-table');

    return $tbl;
}

// gets "Title" row for dataset item
function get_jq_dsitem_title(ds) {
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .addClass('dsfiles')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                        text: B_TXT.TITLE
                    })
                    .attr('data-text', B_TXT.TITLE)
                    .attr('data-cmd', 'title')
                    .addClass('dsprops-button')
                    .click(function () {
                        wid_click_ds_button($(this), ds, true);
                    }))
            )
            .append($('<td/>')
                .append($('<input/>', {
                            value: ds.title
                    })
                    .prop('readonly', true)
                    .addClass('dsprops-title dsprops-data-area'))
            )
            .append($('<td/>')
                .append($('<button/>', {
                            text: B_TXT.CANCEL
                    })
                    .addClass('dsprops-cancel-button')
                    .click(function () {
                        wid_click_ds_button($(this), ds, false);
                    })
                    .hide())));

    $tr.append($td.append($tbl));

    return $tr;
}
// gets "Description" row for dataset item
function get_jq_dsitem_descr(ds) {
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
                .addClass('dsprops-button')
                .click(function () {
                        wid_click_ds_button($(this), ds, true);
                }))
            )
            .append($('<td/>')
                .append($('<textarea/>', {
                    val: ds.descr
                })
                .prop('readonly', true)
                .addClass('dsprops-description dsprops-data-area'))
            )
            .append($('<td/>')
                .append($('<button/>', {
                    text: B_TXT.CANCEL
                })
                .addClass('dsprops-cancel-button')
                .click(function () {
                    wid_click_ds_button($(this), ds, false);
                })
                .hide())));

    $tr.append($td.append($tbl));

    return $tr;
}


// gets "Category" row for dataset item
function get_jq_dsitem_categ(ds) {
    var cat = eng_get_cat_path(ds.categ);
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>', {
                    text: B_TXT.CAT
                })
                .click(function () {
                    wid_click_ds_categ_button($(this), ds);
                })))
            .append($('<td/>')
                .append($('<input/>', {
                    val: cat
                })
                .click(function () {
                    wid_click_ds_categ_button($(this), ds);
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
                .addClass('dsprops-category'))));

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
function get_jq_dsitem_keywd(ds) {
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
                    .addClass('dsprops-keywords'))));

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
function get_jq_dsitem_files(ds) {
    var $div = $('<div/>');
    var $h2 = $('<h2/>', {
            text: M_TXT.FILES
        })
        .addClass('dsfiles-header');
    var $acc = $('<div/>')
        .addClass('dsfiles-list')
        .append($h2)
        .append($div
            .addClass('dsfiles-content')
        );

    return $acc;
}

// gets empty table for datasets file list
function get_jq_files_table(ds_id, files, new_file) {
    var $div = $('<div/>');

    $div
        .append(get_jq_files_add(ds_id))
        .append(get_jq_files_files(ds_id, files, new_file));
    return $div;
}


function get_jq_files_add(ds_id) {
    var $div = $('<div/>')
        .addClass('dsfiles-add-button')
            ;
    var $lb = $('<label/>', {
            text: B_TXT.ADD_FILE
        })
        .addClass('ui-button ui-widget ui-corner-all');
    var $in = $('<input>', {
            type: 'file',
            accept: '.txt,.csv'
        })
        .change(function () {
            wid_click_ds_file_add(this.files, ds_id);
        })
        .appendTo($lb);

    $div.append($lb);

    return $div;
}

function get_jq_files_files(ds_id, files, new_file) {
    var $o = $('<div/>');

    for (let i = 0, l = files.length; i < l; i++) {
        let size = files[i].size;
        let descr = files[i].descr;
        let fl_id = files[i].id;

        if (Boolean(new_file) && files[i].id == new_file.id) {
            size = new_file.size;
            descr = new_file.name;
            fl_id = new_file.id;
        }
        
        $o
            .append($('<div/>')
                .append($('<span/>')
                    .html('Description:')
                )
                .append($('<span/>')
                    .html(get_jq_ds_file_descr(ds_id, descr)))
                .append($('<span/>')
                    .html(size)
                )
                .append($('<span/>')
                    .html(get_jq_ds_file_delete(ds_id, fl_id))
                )
                .addClass('dsfiles-placeholder')
            );

    }

    return $o;
}

function get_jq_ds_file_descr(ds_id, descr) {
    var $i = $('<input/>', {
            val: descr
        });

    return $i;
}

function get_jq_ds_file_delete(ds_id, fl_id) {
    var $span = $('<span/>', {
        title: TIP.FL_DEL
        })   
        .append($('<img/>', {
            src: IMG.CROSS
        }))
        .addClass('dsfiles-delete')
        .click(function (event) {
            wid_click_ds_file_del(ds_id, fl_id);
        });
        
    return $span;
}
