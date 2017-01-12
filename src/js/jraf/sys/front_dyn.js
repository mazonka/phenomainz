// (C) 2016
'use strict';

var g_sys_loaded_front_dyn = 1;

function wid_pulse()
{
    var counter = 0;

    return {
        wait: function()
        {
            let $Logo = $('#img_logo');

            counter++;

            if (counter > 0)
            {
                wid_open_shell_window(true);
                return $Logo.attr('src', IMG.LOGO_WAIT);
            }
        },
        done: function()
        {
            let $Logo = $('#img_logo');

            Boolean(counter > 0) && counter--;

            if (counter == 0)
            {
                wid_open_shell_window(false);

                return setTimeout(function()
                {
                    $Logo.attr('src', IMG.LOGO_DONE);
                }, 200);
            }
        },
        fail: function()
        {
            let $Logo = $('#img_logo');

            counter = 0;
            console.log('Server fault!');
            wid_open_shell_window(false);

            return $Logo.attr('src', IMG.LOGO_FAIL);
        }
    }
}

function img_preload(container)
{
    if (document.images)
    {
        for (let i = 0; i < container.length; i++)
        {
            g_img_preload[i] = new Image();
            g_img_preload[i].onload = function() {};
            g_img_preload[i].src = container[i];
        }
    }
}

function wid_open_shell_window(toggle)
{
    var $window = $('#div_main_pwm');
    var $body = $('#div_main_pwm_content_body');
    var width = $('body')
        .outerWidth();

    if (toggle)
    {
        //$body.html('<img id="img_logo" src="' + IMG.AJAX_LOAD + '">');
        //$window.css('display', 'block');
    }
    else
    {
        //$body.empty();
        //$window.css('display', 'none');
    }
}

function wid_open_modal_window(data, click, f_init, f_close)
{
    var $window = $('#div_main_pwm');
    var $content = $('#div_main_pwm_content');
    var $body = $('#div_main_pwm_content_body');
    var width = $('body')
        .outerWidth();
    var $obj;
    var esc = function(e)
    {
        e.keyCode == 27 && wid_close_modal_window(f_close);
    };

    if (!Boolean(data))
    {
        return wid_close_modal_window(f_close);
    }

    $content.width(width);

    if (click)
    {
        $window.click(function()
            {
                wid_close_modal_window(f_close);
            })
            .children()
            .click(function()
            {
                wid_close_modal_window(f_close);
            });
    }
    else
    {
        $window.click(function()
            {
                wid_close_modal_window(f_close);
            })
            .children()
            .click(function(e)
            {
                return false;
            });
    }

    $(document)
        .keyup(function(event)
        {
            esc(event);
        })

    $(window)
        .on('beforeunload', function()
        {
            return M_TXT.RELOAD;
        })

    if (typeof data == 'string')
    {
        $obj = $('<p>',
        {
            text: data
        });
    }
    else
    {
        $obj = data;
    }

    $window.css('display', 'block');
    $body.html($obj);
    Boolean(f_init) && f_init();
}

function wid_close_modal_window(f)
{
    var $window = $('#div_main_pwm');
    var $body = $('#div_main_pwm_content_body');

    $body.children()
        .remove();
    $window.css('display', 'none');

    (Boolean(f)) && f();

    $window.off('click');
    $window.children()
        .off('click');

    $(document)
        .off('keyup');
    $(window)
        .off('beforeunload');
}


function wid_window_logout()
{
    var $obj = jq_get_yes_no(M_TXT.SURE);
    var init = function()
    {
        wid_click_logout($obj);
    }

    wid_open_modal_window($obj, false, init);
}

function wid_ui_login(au)
{
    $('#' + TD_PROFILE).hide();
    $('#td_admin').hide();
    $('#' + TD_DSITEM_CREATE).hide();
    $('#' + TD_LOGIN).show();
    $('#' + TD_DSLIST)
        .empty()
        .hide();

    if (au)
    {
        $('#' + TD_LOGIN).hide();
        $('#' + TD_PROFILE).show();
        $('#' + TD_DSITEM_CREATE).show();
        $('#' + TD_DSLIST).show();
        
        wid_nc_admin_ping();
        wid_nc_profile();
        wid_nc_ds_list();
    }

}

function wid_paint_borders($obj, color)
{
    var borders = [
        'borderLeftColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor'
    ];

    for (let i = 0; i < borders.length; i++)
    {
        (color !== undefined) ? $obj.css(borders[i], color): $obj.css(
            borders[i], '');
    }
}

function wid_show_admin_panel(au)
{
    if (au)
    {
        $('#td_admin').html($('<div/>',
            {
                text: 'I am ADMIN'
            }))
            .show();
        console.log('--admin user--');
    }
    else console.log('--common user--');
}

function wid_file_is_open(toggle)
{
    var $Input = $('#input_open_file');
    var $Label = $('#label_open_file');

    if (toggle)
    {
        $Input.attr('type', 'text');
        $Label.css('background', '#FF0000');
        $Label.hover(
            function()
            {
                $(this)
                    .css('background', '#FF0000')
            },
            function()
            {
                $(this)
                    .css('background', '#FF0000')
            });
    }
    else
    {
        $Input.attr('type', 'file');
        $Input.val('');
        $Input.off('click');
        $Label.css('background', '#FCFCFC');
        $Label.hover(
            function()
            {
                $(this)
                    .css('background', '#87CEEB')
            },
            function()
            {
                $(this)
                    .css('background', '#FCFCFC')
            });

        return false;
    }
}

function wid_upload_file()
{
    return false;
}

function wid_open_email_window()
{
    var $obj = jq_get_user_email();
    var ui_init = function()
    {
        $obj.find('button')
            .button()
            .button('disable');
        $obj.find('input').focus();
    };

    wid_open_modal_window($obj, false, ui_init);
}

function wid_open_profile_window(name)
{
    var $obj = jq_get_user_profile(name);
    var ui_init = function()
    {
        $obj
            .find('button')
            .button()
            .button('disable');
        $obj
            .find('input')
            .focus();
    };

    wid_open_modal_window($obj, false, ui_init);
}


function wid_auth(auth_network)
{}


function wid_input_kwd($inp)
{
    var $b = $inp.parent().find('button');
    var val = $inp.val();
    var list = $inp.autocomplete('option', 'source');

    (list.indexOf(val) == '-1' || val == '') ? $b.button('disable'): $b.button(
        'enable');
}

function wid_fill_profile(profile)
{
    /// zateret' dannye v profile v sluchae logout
    (profile.su) ? $('#div_main_adm').show() : $('#div_main_adm').hide();

    if (profile.email === '*') return $('#div_main_dsl, #div_main_pfl').hide();
        
    let ts = eng_get_lastdate(profile.last);
    let date = [ts.yyyy, ts.mm, ts.dd].join('.');
    let time = [ts.h, ts.m, ts.s].join(':');
    let last = date + ', ' + time;

    $('#span_profile_logout button')
        .click(function()
        {
            wid_window_logout();
        });

    $('#span_pfl_email span').html(profile.email);
    $('#span_pfl_quote').html('/' + profile.quote + 'Kb');
    $('#span_pfl_timestamp span').html(last);
    $('#span_pfl_logcounter span').html(profile.cntr);
    
    $('#div_main_pfl').show();
    $('#div_main_dsl').show();
}

function wid_fill_ds_list(list)
{
    $('#' + TD_DSLIST)
        .children()
        .remove();
    
/*     for (let i = 0; i < list.n; i++) {
        g_ds[i] = {};
        g_ds[i].id = list.id[i];
        g_ds[i].title = list.title[i];
    }
    
    console.log(
        g_ds.map(function(e)
        {
            return e.id;
        }).indexOf('2')); */
        
    if (Boolean(list) && list.n > 0)
    {
        
        let $div = jq_get_ds_list(list.n, list.id, list.title);

        $('#span_pfl_volume').html(list.usage);

        $('#' + TD_DSLIST).append($div);

        wid_init_ui_accordion($div, function(_this)
        {
            wid_click_ds_list_header(_this);
        });

        wid_init_ui_tooltip($div.find('.dsitem-header-delete'));
    }
    else
    {
        return wid_open_modal_window(M_TXT.HELLO, true);
    }
}

function wid_fill_dsitem_props(ds)
{
    var $ds_h1_header = $('#' + H1_DS + ds.id).find('.dsitem-header-title');
    var $dsitem = $('#' + DIV_DS + ds.id);
    var $props_row = $dsitem.find('.dsprops-div')
    var $props = jq_get_dsitem_props(ds);

    $ds_h1_header.html(eng_get_accordion_header(ds.id, ds.title));
    $props_row.html($props);

    wid_init_ui_button($props);
}


function wid_fill_dsitem_files(did, list, file)
{
    var $dsitem = $('#' + DIV_DS + did);
    var $files_row = $dsitem.find('.dsfiles-div');
    var $files = jq_get_files_table(did, list, file);

    if ($files_row.html() == '')
    {
        let $accdn = jq_get_dsitem_files();

        $files_row.html($accdn);
        $files_row.find('.dsfiles-content').html($files);

        wid_init_ui_accordion($accdn, null);
    }
    else
    {
        $files_row.find('.dsfiles-content').html($files);
    }

    wid_init_ui_button($files_row);
    wid_init_ui_tooltip($files_row.find('.dsfiles-delete'));
};

function wid_categ_menu(ds, pcat, kcat)
{
    var $obj = jq_get_cat_menu(pcat, kcat);

    var init = function()
    {
        wid_init_ui_cat_menu($obj, ds, pcat);
    }

    wid_open_modal_window($obj, false, init);
}

function wid_keywd_menu(ds)
{
    var list = eng_compare_lists(g_keywords, ds.kwd);
    var $obj = jq_get_ds_kwd_add(ds, list);

    var init = function()
    {
        wid_init_ui_kwd_autocomplete($obj, g_keywords, ds);
    };

    wid_open_modal_window($obj, false, init);
}

