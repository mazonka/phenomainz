// (C) 2016
'use strict';

function front_fill_js(){}

function wid_fill_login(checkbox)
{
    var $log = $('#span_main_log');
    
    (checkbox) ? $log.show() : $log.hide();
}

function wid_fill_adm_panel(checkbox)
{
    var $adm = $('#div_main_adm');
    
    (checkbox) ? $adm.html(jq_get_adm_panel()).show() : $adm.empty().hide();
}    

function wid_fill_profile(profile)
{
    var $p = $('#div_main_pfl');
    var nd_name = profile.uname + '/name';
    
    if (!profile || profile.email === '*') return $p.empty().hide();

    $p.html(jq_get_profile(profile, nd_name)).show();

    jraf_bind_virtual(g_jraf_root, nd_name, function()
    {
        wid_fill_name(nd_name, this.text);
    });
    
    jraf_node_up(g_jraf_root);
}

function wid_fill_name(nd, text)
{
    var $wid =  $('#span_pfl_name');
    
    $wid.html(text || '*');   
}

function wid_fill_dataset_list(checkbox)
{
    if (checkbox)
    {
        $('#div_main_dsl').show();
        wid_init_ui_button($('#div_main_dsl_create'));
    }    
    else
    {
        $('#div_main_dsl').hide();
        $('#div_main_dsl_list').empty();
    }
}

