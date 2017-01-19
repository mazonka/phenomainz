// (C) 2016
'use strict';

function front_jq_js(){}

function jq_get_user_email()
{
    var $div = $('<div/>')
        .append($('<label/>',
        {
            text: L_TXT.EMAIL
        }))
        .append($('<input/>',
            {
                id: 'input_user_email'
            })
            .attr('maxlength', INPUT_MAX)
            .on('input', function()
            {
                evt_input_email($(this));
            }))
        .append($('<button/>',
            {
                id: 'button_user_email',
                text: B_TXT.SEND_EMAIL
            })
            .click(function()
            {
                wid_nc_login($(this).parent().find('input').val());
                wid_close_modal_window();
            }));

    return $div;
}

function jq_get_profile(profile)
{
    var $profile = $('<span/>');
    var $nt = $('<span/>',
    {
        text: L_TXT.USER_NAME
    });
    var $nm = $('<span/>',
    {
        id: 'span_user_name'
    });
    var $lo = $('<span/>',
        {
            id: 'span_pfl_logout'
        })
        .append($('<img/>',
        {
            id: 'img_user_logout',
            src: IMG.LOGOUT
        }))
        .click(function()
        {
            wid_open_logout_window()
        });
    var $ml = $('<span/>',
    {
        text: L_TXT.EMAIL + profile.ml
    });
    var $ls = $('<span/>',
    {
        text: L_TXT.LAST_LOGIN + profile.ls
    });
    var $cn = $('<span/>',
    {
        text: L_TXT.COUNTER + profile.cn
    });
    var $qt = $('<span/>',
        {
            text: L_TXT.VOLUME
        })
        .append($('<span/>',
        {
            id: 'span_pfl_volume',
            text: '0'
        }))
        .append($('<span/>',
        {
            text: '/' + profile.qt + 'Kb'
        }));

    $profile
        .append($nt)
        .append($nm)
        .append($lo)
        .append('<br/>')
        .append($ml)
        .append('<br/>')
        .append($cn)
        .append('<br/>')
        .append($ls)
        .append('<br/>')
        .append($qt)
        .append('<br/>')

    return $profile;
}

function jq_get_adm_panel()
{
    var $span = $('<span/>',
        {
            text: '__ADMIN PANEL MUST BE HERE__'
        });
        
    var $btn = $('<button/>', 
        {   
            text: 'Create users dir'
        })
        .click(function()
        {
            evt_click_create_users_dir();
        });
        
    $span.append('<br/>');
    $span.append($btn);
    return $span;
}

// gets object for change user name
function jq_get_chname(node, name)
{
    var $obj = $('<div/>')
        .append($('<label/>',
        {
            text: 'Name'
        }))
        .append($('<input/>',
            {
                val: name,
            })
            .attr('maxlength', INPUT_MAX)
            // .on('input', function()
            // {
                // evt_input_name($(this), node)
            // })
        )
        .append($('<button/>',
            {
                text: B_TXT.SUBMIT
            }));

    return $obj;
}

// gets yes/no object for the operation that needs to be confirmed
function jq_get_yes_no(msg)
{
    var $obj = $('<div/>');

    $obj.append($('<div/>',
        {
            text: msg
        }))
        .append($('<button/>',
            {
                text: B_TXT.NO
            })
            .addClass('button-no-button'))
        .append($('<button/>',
            {
                text: B_TXT.YES
            })
            .addClass('button-yes-button')
        );

    return $obj;
}

// gets datset list object
function jq_get_ds_list(l, did, title)
{
    var $obj = $('<div/>',
    {
        id: DIV_DS_LIST
    });

    for (let i = 0; i < +l; i++)
    {
        let $h1 = jq_get_ds_h1(did[i], title[i]);

        $obj.append($h1);

        $obj.append($('<div/>',
            {
                id: DIV_DS + did[i],
            })
            .attr('data-id', did[i])
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
function jq_get_ds_h1(did, title)
{
    var $obj = $('<h1/>',
        {
            id: H1_DS + did,
        })
        .attr('data-id', did)
        .addClass('dsitem-header-h1');

    $obj.append($('<span/>',
            {
                text: eng_get_accordion_header(did, title)
            })
            .addClass('dsitem-header-title')
        )
        .append(jq_get_ds_item_del(did));
        
    return $obj;
}
function jq_get_ds_item_del(did)
{
    var $span = $('<span/>',
        {
            title: TIP.DS_DEL
        })
        .append($('<img/>',
        {
            src: IMG.CROSS
        }))
        .addClass('dsitem-header-delete')
        .click(function(event)
        {
            event.stopPropagation();
            event.preventDefault();
            wid_click_ds_del_button(did);
        });

    return $span;
}

// gets dataset item properties
function jq_get_dsitem_props(ds)
{
    var $tbl = $('<table/>');
    var lines = [
        jq_get_dsitem_title(ds), jq_get_dsitem_descr(ds),
        jq_get_dsitem_categ(ds), jq_get_dsitem_keywd(ds)
    ];

    for (let i = 0, l = lines.length; i < l; i++)
        $tbl.append(lines[i]);

    $tbl.addClass('dsprops-table');

    return $tbl;
}

// gets "Title" row for dataset item
function jq_get_dsitem_title(ds)
    {
        var $tr = $('<tr/>');
        var $td = $('<td/>');
        var $tbl = $('<table/>')
            .addClass('dsfiles')
            .append($('<tr/>')
                .append($('<td/>')
                    .append($('<button/>',
                        {
                            text: B_TXT.TITLE
                        })
                        .attr('data-text', B_TXT.TITLE)
                        .attr('data-cmd', 'title')
                        .addClass('dsprops-button')
                        .click(function()
                        {
                            wid_click_ds_button($(this), ds, true);
                        }))
                )
                .append($('<td/>')
                    .append($('<input/>',
                        {
                            value: ds.title
                        })
                        .prop('readonly', true)
                        .addClass('dsprops-title dsprops-data-area'))
                )
                .append($('<td/>')
                    .append($('<button/>',
                        {
                            text: B_TXT.CANCEL
                        })
                        .addClass('dsprops-cancel-button')
                        .click(function()
                        {
                            wid_click_ds_button($(this), ds, false);
                        })
                        .hide())));

        $tr.append($td.append($tbl));

        return $tr;
    }
    // gets "Description" row for dataset item
function jq_get_dsitem_descr(ds)
{
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>',
                    {
                        text: B_TXT.DSC
                    })
                    .attr('data-text', B_TXT.DSC)
                    .attr('data-cmd', 'descr')
                    .addClass('dsprops-button')
                    .click(function()
                    {
                        wid_click_ds_button($(this), ds, true);
                    }))
            )
            .append($('<td/>')
                .append($('<textarea/>',
                    {
                        val: ds.descr
                    })
                    .prop('readonly', true)
                    .addClass('dsprops-description dsprops-data-area'))
            )
            .append($('<td/>')
                .append($('<button/>',
                    {
                        text: B_TXT.CANCEL
                    })
                    .addClass('dsprops-cancel-button')
                    .click(function()
                    {
                        wid_click_ds_button($(this), ds, false);
                    })
                    .hide())));

    $tr.append($td.append($tbl));

    return $tr;
}


// gets "Category" row for dataset item
function jq_get_dsitem_categ(ds)
{
    var cat = eng_get_cat_path(ds.categ);
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>',
                    {
                        text: B_TXT.CAT
                    })
                    .click(function()
                    {
                        wid_click_ds_categ_button($(this), ds);
                    })))
            .append($('<td/>')
                .append($('<input/>',
                    {
                        val: cat
                    })
                    .click(function()
                    {
                        wid_click_ds_categ_button($(this), ds);
                    })
                    .hover(function()
                        {
                            $(this).animate(
                                {
                                    'scrollLeft': this.scrollWidth
                                },
                                this.value.length * 50)
                        },
                        function()
                        {
                            $(this).stop();
                            this.scrollLeft = 0;
                        })
                    .prop('readonly', true)
                    .addClass('dsprops-category'))));

    $tr.append($td.append($tbl));

    return $tr;
}

// gets menu object for select category
function jq_get_cat_menu(pcat, kcat)
{
    var $span = $('<span/>');
    var $select = $('<select/>',
    {
        id: 'select_ds_cat'
    });
    var $button = $('<button/>',
    {
        text: B_TXT.UPDATE,
    });
    var $rcat = $('<optgroup/>',
        {
            label: L_TXT.NSPCAT
        })
        .append($('<option/>',
        {
            value: '0',
            text: '\u002f'
        }));
    var $pcat = $('<optgroup/>',
        {
            label: L_TXT.CURCAT
        })
        .append($('<option/>',
            {
                value: pcat.id,
                text: pcat.path
            })
            .prop('selected', true));
    var $kcat = $('<optgroup/>',
    {
        label: L_TXT.SUBCAT
    });

    for (let i = 0; i < kcat.length; i++)
        $kcat.append($('<option/>',
        {
            value: kcat[i].id,
            text: kcat[i].name
        }));

    if (pcat.id != '0') $select
            .append($rcat)
            .append($pcat)
            .append($kcat);
    else $select
            .append($rcat)
            .append($kcat);

    $span
        .append($select)
        .append($button);

    return $span;
}

// gets "Keywords" row for dataset item
function jq_get_dsitem_keywd(ds)
{
    var $tr = $('<tr/>');
    var $td = $('<td/>');
    var $tbl = $('<table/>')
        .append($('<tr/>')
            .append($('<td/>')
                .append($('<button/>',
                    {
                        text: B_TXT.KWD
                    })
                    .click(function(e)
                    {
                        if (e.shiftKey) wid_click_ds_kwd_button(ds, true);
                        else wid_click_ds_kwd_button(ds, false);
                    })))
            .append($('<td/>')
                .append(jq_get_ds_kwd_list($('<div/>'), ds, ds.kwd)
                    .addClass('dsprops-keywords'))));

    $tr.append($td.append($tbl));

    return $tr;
}

// gets "Add keyword" windows
function jq_get_ds_kwd_add()
{
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
function jq_get_ds_kwd_list($obj, ds, list)
{
    for (let i = 0, l = list.length; i < l; i++)
    {
        $obj.append($('<span/>')
            .html('[' + list[i] + '] ')
            .addClass('ds-span-kwd')
            .click(function()
            {
                wid_click_ds_del_kwd(ds.id, list[i]);
            }));
    }

    return $obj;
}

// gets accordion with with file list
function jq_get_dsitem_files(ds)
{
    var $div = $('<div/>');
    var $h2 = $('<h2/>',
        {
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
function jq_get_files_table(did, files)
{
    var $div = $('<div/>');

    $div
        .append(jq_get_files_add(did))
        .append(jq_get_files_files(did, files));
    return $div;
}

function jq_get_files_add(did)
{
    var $div = $('<div/>')
        .addClass('dsfiles-add-button');
    var $lb = $('<label/>',
        {
            text: B_TXT.ADD_FILE
        })
        .addClass('ui-button ui-widget ui-corner-all');
    var $in = $('<input>',
        {
            type: 'file',
            accept: '.txt,.csv'
        })
        .change(function()
        {
            wid_click_ds_file_add(this.files, did);
        })
        .appendTo($lb);

    $div.append($lb);

    return $div;
}

function jq_get_files_files(did, files)
{
    var $o = $();
    
    for (let i = 0, l = files.length; i < l; i++)
    {
        $o = $o.add($('<div/>')
            .append($('<span/>')
                .html('Description:')
            )
            .append($('<span/>')
                .html(jq_get_ds_file_descr(did, files[i].descr)))
            .append($('<span/>')
                .html(files[i].size)
            )
            .append($('<span/>')
                .html(jq_get_ds_file_delete(did, files[i].id))
            )
            .addClass('dsfiles-placeholder')
        );
    }

    return $o;
}

function jq_get_ds_file_descr(did, descr)
{
    var $i = $('<input/>',
    {
        val: descr
    });

    return $i;
}

function jq_get_ds_file_delete(did, fl_id)
{
    var $span = $('<span/>',
        {
            title: TIP.FL_DEL
        })
        .append($('<img/>',
        {
            src: IMG.CROSS
        }))
        .addClass('dsfiles-delete')
        .click(function(event)
        {
            wid_click_ds_file_del(did, fl_id);
        });

    return $span;
}
