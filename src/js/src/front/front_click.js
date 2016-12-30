// (C) 2016


'use strict';

function wid_click_ds_list_header(_this) {
    var active = _this.accordion('option', 'active');
    
    if (active !== false) {
        let ds_id = _this
            .find('h1.ui-accordion-header-active')
            .attr('data-id');
            
        wid_nc_ds_get(ds_id, false);
        wid_nc_ds_file_list(ds_id, false);
    }
}
            
function wid_click_ds_button($btn, ds, submit) {
    var $cnl;
    var $fld;
    var toggle = function ($b, $f, $c, turn) {
        if (turn) {
            $f.prop('readonly', false)
            $b.text(B_TXT.SUBMIT);
            $c.show();
            $f.focus();
        } else {
            $f.prop('readonly', true);
            $b.text($btn.attr('data-text'));
            $c.hide();
        }
    };
    
    if (submit) {
        $fld = $btn
            .closest('tr')
            .find('.ds-data-area');
        $cnl = $fld
            .closest('tr')
            .find('.ds-cancel-button');
    } else {
        $cnl = $btn;
        $fld = $cnl
            .closest('tr')
            .find('.ds-data-area');
        $btn = $fld
            .closest('tr')
            .find('.ds-prop-button');
    }
    if ($fld.prop('readonly') && !submit) {
        toggle($btn, $fld, $cnl, false);
        return alert('don\'t do that again!');
    } else if ($fld.prop('readonly')) {
        toggle($btn, $fld, $cnl, true)
    } else {
        let cmd = $btn.attr('data-cmd');
        toggle($btn, $fld, $cnl, false);

        if (cmd !== 'title' && cmd !== 'descr') {
            return;
        } else if (submit) {
            wid_nc_ds_upd_cmd(cmd, ds.id, $fld.val());
        } else if (!submit) {
            wid_nc_ds_get(ds.id, true);
        }
    }
}

function wid_click_ds_categ_button($obj, ds) {
    var c = {};
    
    if (Boolean(ds.categ.length)) {
        c.id = ds.categ[ds.categ.length - 1].id;
        c.path = eng_get_cat_path(ds.categ);
    } else {
        c.id = '0';
        c.path = '\u002f';
    }

    wid_nc_cat_kids(c, ds);
}

function wid_click_ds_del_button(ds_id) {
    var $obj = get_jq_yes_no(M_TXT.SURE);
    var init = function () {
        $obj.find('.button-yes-button')
            .button()
            .click(function () {
                wid_nc_ds_delete(ds_id);
                wid_close_modal_window();
            });
        $obj.find('.button-no-button')
            .button()
            .click(function () {
                wid_close_modal_window();
            });

    }

    wid_open_modal_window($obj, false, init);
}


function wid_click_ds_del_kwd(ds_id, kwd) {
    var $obj = get_jq_yes_no(M_TXT.DEL_KWD);
    var init = function () {
        $obj.find('.button-yes-button')
            .button()
            .click(function () {
                wid_nc_ds_del_kwd(ds_id, kwd);
                wid_close_modal_window();
            });
        $obj.find('.button-no-button')
            .button()
            .click(function () {
                wid_close_modal_window();
            });
    };

    wid_open_modal_window($obj, false, init);
}

function wid_click_ds_kwd_button(ds, force) {
    var list = eng_compare_lists(g_keywords, ds.kwd);
    var $obj = get_jq_ds_kwd_add(ds, list);
    var init = function() {
        wid_init_ui_kwd_autocomplete($obj, g_keywords, ds);
    };
    var f = function () {
        wid_open_modal_window($obj, false, init);
    };
    
    if (!Boolean(g_keywords.length) || force) {
        wid_nc_keywords(f);
    } else {
        f();
    }
}

function wid_click_ds_file_new(ds_id) {
    console.log('1. add file');

    //wid_nc_ds_file_new(ds_id);
}

function wid_click_add_file(files, ds_id) {
    var file;

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        let msg = 'The File APIs are not fully supported in this browse!';
        wid_open_modal_window(msg, true);
        return false;
    }

    if (!Boolean(files[0])) {
        return false;
    }

    var cb = function (file) {
        var table;

        if (file.error !== 0) {
            return wid_open_modal_window(M_TXT.FILE_READ_ERROR, true);
        }

        table = eng_is_table(file.raw);

        if (!table.is_table) {
            return wid_open_modal_window(M_TXT.TABLE_ERROR + table.err_row,
                true);
        }

        file.id = null;

        wid_nc_ds_file_new(ds_id, file);
    };

    var progress = function (data) {
        console.log(data + '%');
    };
    
    var done = function (data) {
        if (!data) {
            let f = function () {};
            wid_open_modal_window('loading...', false. null, f);
        } else {
            wid_close_modal_window();
        }
    };


    file = files[0];

    if (file.size > G_MAX_FILE_SIZE) {
        return wid_open_modal_window(M_TXT.FILE_IS_HUGE, true);
    }

    if (file.size === 0) {
        return wid_open_modal_window(M_TXT.FILE_IS_EMPTY, true);
    }

    eng_open_file(file, cb, progress, done);
}
