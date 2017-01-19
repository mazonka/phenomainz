// (C) 2016
'use strict';

function front_dyn_js(){}

var g_pulse = wid_pulse();

function wid_pulse()
{
    var counter = 0;

    return {
        wait: function()
        {
            let $Logo = $('#img_logo');

            counter++;

            if (counter > 0) return $Logo.attr('src', IMG.LOGO_WAIT);
        },
        done: function()
        {
            let $Logo = $('#img_logo');

            Boolean(counter > 0) && counter--;

            if (counter == 0)
                return setTimeout(function()
                {
                    $Logo.attr('src', IMG.LOGO_DONE);
                }, 200);
        },
        fail: function()
        {
            let $Logo = $('#img_logo');

            counter = 0;
            console.log('Server fault!');

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
        (color !== undefined) 
            ? $obj.css(borders[i], color)
            : $obj.css(borders[i], '');
    }
}

function wid_init_modal_window(cl, ifn, cfn)
{
    wid_fill_modal(cl, ifn, cfn);
}

function wid_close_modal_window(fn)
{
    wid_erase_modal();
    Boolean(fn) && fn();
}


function wid_open_logout_window()
{
    var $obj = jq_get_yes_no(M_TXT.SURE);
    var init = function()
    {
        evt_click_logout($obj);
    }

    wid_open_modal_window($obj, false, init);
}

function wid_init_ui(au, profile)
{
    wid_fill_main();
    
    if (0)
    {}
    else if (au && profile.ml != '*')
    {
        wid_init_login(false);
        wid_init_admpanel(profile.su);
        wid_init_profile(profile);
        wid_init_name(profile.nm);
        wid_init_dataset_list(true);
    }
    else if (au && profile.email == '*')
    {
        wid_init_login(true);
        wid_init_admpanel(profile.su);
        wid_init_dataset_list(false)
    }
    else 
    {
        wid_init_login(true);
        wid_init_admpanel(false);
        wid_init_dataset_list(false);
        
        if (g_session != '0') {
            window.location.href = 
                location.href.substr(0, location.href.indexOf('?') + 1) + '0';
        }
    }
}

function wid_init_login(ch)
{
    wid_fill_login(ch);
}

function wid_init_admpanel(su)
{
    wid_fill_adm_panel(su);
}

function wid_init_profile(profile)
{
    if (!profile || profile.ml === '*') profile = null;
    wid_fill_profile(profile); 
}

function wid_init_name(uname)
{
    var node = uname + '/name';
    
    jraf_bind_virtual(g_jraf_root, node, function()
    {
        wid_fill_name(node, this.text || '*', this);
    });    
    //jraf_node_up(jraf_virtual_node(g_jraf_root, node));
}


function wid_open_chname_window(node, text)
{
    var f = function()
    {
        wid_fill_modal_chname(node, text);
    }
    wid_init_modal_window(false, f);
}

function wid_init_dataset_list(ch)
{
    wid_fill_dataset_list(ch);
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

function wid_auth(auth_network)
{}
