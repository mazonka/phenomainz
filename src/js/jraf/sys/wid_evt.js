// (C) 2016
'use strict';

function wid_evt_js(){}

function evt_click_name()
{
    wid_open_name_window(name, $(this).html());
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
