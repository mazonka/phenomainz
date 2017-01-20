// (C) 2016
'use strict';

function wid_init_js(){}

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
    else if (au && profile.ml == '*')
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

function wid_init_modal_window(cl, ifn, cfn)
{
    wid_fill_modal(cl, ifn, cfn);
}

function wid_close_modal_window(fn)
{
    wid_erase_modal();
    Boolean(fn) && fn();
}

function wid_init_logout_window()
{
    wid_init_modal_window(false, function()
    {
        wid_fill_modal_logout();
    });
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


function wid_init_modal_name(node, text)
{
    wid_init_modal_window(false, function()
    {
        wid_fill_modal_name(node, text);
    });
}

function wid_init_dataset_list(ch)
{
    wid_fill_dataset_list(ch);
}

function wid_upload_file()
{
    return false;
}

function wid_auth(auth_network)
{}

function wid_init_modal_email()
{
    wid_init_modal_window(false, function()
    {
        wid_fill_modal_email();
    });
}
