// (C) 2016
'use strict';

function front_evt_hdl_js(){}
var g_sys_loaded_front_evt_hdl = 1;

function wid_click_logout(_this)
{
    _this.find('.button-yes-button')
        .button()
        .click(function ()
        {
            wid_nc_logout();
            wid_close_modal_window();
        });
    
    _this.find('.button-no-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window();
        });
}

function wid_input_email($obj)
{
    var $btn = $('#button_user_email');
    var data = $obj.val();
    
    if (eng_is_email(data))
    {
        $btn.button('enable');
        wid_paint_borders($obj);

        $obj.on('keypress', function(event)
        {
            if (Boolean(event.keyCode === 13))
            {
                wid_nc_login(data);
                wid_close_modal_window();
            }
            
            $obj.off('keypress');
        });
    }
    else
    {
        (Boolean(data)) 
            ? wid_paint_borders($obj, 'red')
            : wid_paint_borders($obj);

        $btn.button('disable');
        $obj.off('keypress');
    }
}

function wid_input_name($obj)
{
    var $btn = $('#button_user_name');
    var name = $('#input_user_name').val();

    name = name.replace(/^\s+|\s+$/g, '');
    
    if (eng_is_valid_str(name))
    {
        wid_paint_borders($obj);

        $btn.button('enable');
        $obj.on('keypress', function(event)
        {
            if (event.keyCode === 13)
            {
                wid_nc_name(name || '*');
                wid_close_modal_window();
            }
            $obj.off('keypress');
        });
    }
    else
    {
        if (Boolean(name)) wid_paint_borders($obj, 'red');
        else wid_paint_borders($obj);

        $btn.button('disable');
        $obj.off('keypress');
    }
}

function wid_click_ds_list_header(_this)
{
    var active = _this.accordion('option', 'active');

    if (active !== false)
    {
        let did = _this
            .find('h1.ui-accordion-header-active')
            .attr('data-id');
        let $dsitem_content = _this.find('div.ui-accordion-content-active');
        let $dsitem_props = $dsitem_content.find('div.dsprops-div');
        let $dsitem_files = $dsitem_content.find('div.dsfiles-div');

        Boolean($dsitem_props.html() == '') && wid_nc_ds_get(did);
        Boolean($dsitem_files.html() == '') && wid_nc_ds_file_list(did);
    }
}

function wid_click_ds_button($btn, ds, submit)
{
    var $cnl;
    var $fld;
    var toggle = function ($b, $f, $c, turn)
    {
        if (turn)
        {
            $f.prop('readonly', false)
            $b.text(B_TXT.SUBMIT);
            $c.show();
            $f.focus();
        }
        else
        {
            $f.prop('readonly', true);
            $b.text($btn.attr('data-text'));
            $c.hide();
        }
    };

    if (submit)
    {
        $fld = $btn
            .closest('tr')
            .find('.dsprops-data-area');
        $cnl = $fld
            .closest('tr')
            .find('.dsprops-cancel-button');
    }
    else
    {
        $cnl = $btn;
        $fld = $cnl
            .closest('tr')
            .find('.dsprops-data-area');
        $btn = $fld
            .closest('tr')
            .find('.dsprops-button');
    }
    if ($fld.prop('readonly') && !submit)
    {
        toggle($btn, $fld, $cnl, false);
        return alert('don\'t do that again!');
    }
    else if ($fld.prop('readonly'))
    {
        toggle($btn, $fld, $cnl, true)
    }
    else
    {
        let cmd = $btn.attr('data-cmd');
        toggle($btn, $fld, $cnl, false);

        if (cmd !== 'title' && cmd !== 'descr')
        {
            return;
        }
        else if (submit)
        {
            wid_nc_ds_upd_cmd(cmd, ds.id, $fld.val());
        }
        else if (!submit)
        {
            wid_nc_ds_get(ds.id);
        }
    }
}

function wid_click_ds_categ_button($obj, ds)
{
    var c = {};

    if (Boolean(ds.categ.length))
    {
        c.id = ds.categ[ds.categ.length - 1].id;
        c.path = eng_get_cat_path(ds.categ);
    }
    else
    {
        c.id = '0';
        c.path = '\u002f';
    }

    wid_nc_cat_kids(c, ds);
}

function wid_click_ds_del_button(did)
{
    var $obj = jq_get_yes_no(M_TXT.SURE);
    var init = function ()
    {
        $obj.find('.button-yes-button')
        .button()
        .click(function ()
        {
            wid_nc_ds_delete(did);
            wid_close_modal_window();
        });
        
        $obj.find('.button-no-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window();
        });

    }

    wid_open_modal_window($obj, false, init);
}

function wid_click_ds_del_kwd(did, kwd)
{
    var $obj = jq_get_yes_no(M_TXT.DEL_KWD);
    var init = function ()
    {
        $obj.find('.button-yes-button')
        .button()
        .click(function ()
        {
            wid_nc_ds_del_kwd(did, kwd);
            wid_close_modal_window();
        }
        );
        $obj.find('.button-no-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window();
        }
        );
    };

    wid_open_modal_window($obj, false, init);
}

function wid_click_ds_kwd_button(ds, force)
{
    var show_kwd = function ()
    {
        wid_keywd_menu(ds);
    };

    if (!Boolean(g_keywords.length) || force)
    {
        wid_nc_keywords(show_kwd);
    }
    else
    {
        show_kwd();
    }
}

function wid_click_ds_file_add(files, did)
{
    var file;

    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        // Great success! All the File APIs are supported.
    }
    else
    {
        let msg = 'The File APIs are not fully supported in this browse!';
        wid_open_modal_window(msg, true);
        return false;
    }

    if (!Boolean(files[0])) return false;

    var cb = function (file)
    {
        var table;

        if (file.error !== 0)
            return wid_open_modal_window(M_TXT.FILE_READ_ERROR, true);

        table = eng_is_table(file.raw);

        if (!table.is_table)
            return wid_open_modal_window(M_TXT.TABLE_ERROR + table.err_row,
                true);

        file.id = null;

        wid_nc_ds_file_new(did, file);
    };

    var progress = function (data)
    {
        console.log(data + '%');
    };

    var done = function (data)
    {
        if (!data)
        {
            let f = function ()  {};
            wid_open_modal_window('loading...', false.null, f);
        }
        else wid_close_modal_window();
    };

    file = files[0];

    if (file.size > G_MAX_FILE_SIZE)
        return wid_open_modal_window(M_TXT.FILE_IS_HUGE, true);

    if (file.size === 0)
        return wid_open_modal_window(M_TXT.FILE_IS_EMPTY, true);

    eng_open_file(file, cb, progress, done);
}

function wid_click_ds_file_del(did, fl_id)
{
    var $obj = jq_get_yes_no(M_TXT.SURE);
    var init = function ()
    {
        $obj.find('.button-yes-button')
        .button()
        .click(function ()
        {
            wid_nc_ds_file_del(did, fl_id);
            wid_close_modal_window();
        }
        );
        $obj.find('.button-no-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window();
        }
        );

    }

    wid_open_modal_window($obj, false, init);
}
