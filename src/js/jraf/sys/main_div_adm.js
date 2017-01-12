// (C) 2016
'use strict';

var g_sys_loaded_main_div_adm = 1;

function jq_get_main_adm()
{
    return $('<div/>',
        {
            id: 'div_main_adm'        
        })
        .html(jq_get_admin_panel());
}

function jq_get_admin_panel()
{
    var $span = $('<span/>',
    {
        text: 'ADMIN PANEL HERE'
    });
    
    return $span;
}