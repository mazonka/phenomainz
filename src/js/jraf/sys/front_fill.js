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
    
    if (checkbox) 
    {
        $adm.html(jq_get_adm_panel()).show();
        wid_init_ui_button($adm);
    }
    else $adm.empty().hide();
        
}    

function wid_fill_profile(profile)
{
    var $p = $('#div_main_pfl');
    
    if (!profile || profile.email === '*') return $p.empty().hide();

    $p.html(jq_get_profile(profile)).show();
}

function wid_fill_name(uname)
{
    var node = uname + '/name';
    var $name =  jq_get_name(node);
    
    $('#span_pfl_name').append($name);
    
    jraf_bind_virtual(g_jraf_root, node, function()
    {
        $name.html(this.text || '*');   
    });
    
    jraf_node_up(jraf_virtual_node(g_jraf_root, node));    
    
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

