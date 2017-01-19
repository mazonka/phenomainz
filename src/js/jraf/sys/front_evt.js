// (C) 2016
'use strict';

function front_evt_js(){}

function evt_click_logout($obj)
{
    $obj.find('.button-yes-button')
        .button()
        .click(function ()
        {
            wid_nc_logout();
            wid_close_modal_window();
        });
    
    $obj.find('.button-no-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window();
        });
}

function evt_input_email($obj)
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

function evt_click_name()
{
    wid_open_chname_window(name, $(this).html());
}

function evt_keyup_esc(e)
{
    e.keyCode == 27 && wid_init_modal_window(false);
}

function evt_input_name($obj, node)
{
    var $div = $obj.parent();
    var $btn = $div.find('button');
    var $inp = $div.find('input');
    var text = $inp
        .val()
        .replace(/^\s+|\s+$/g, '');
    
    if (eng_is_valid_str(text))
    {
        wid_paint_borders($inp);
        
        $btn
            .off('click')
            .button('enable')
            .click(function()
            {
                jraf_write_name(node, text || '*');
                wid_close_modal_window();
            });
        
        $inp
            .off('keyup')
            .keyup(function(event)
            {
                if (event.keyCode === 13)
                {
                    jraf_write_name(node, text || '*');
                    wid_close_modal_window();
                }
            });
    }
    else
    {
        wid_paint_borders($inp, 'red');
        
        $btn.button('disable');
        $inp.off('keyup');
    }
}

function evt_click_create_users_dir()
{
    var dpath = '/.jraf.sys/users';
    
    jraf_create_dir(g_jraf_root, dpath, function () {console.log() })
}
