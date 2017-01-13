// (C) 2016
'use strict';

var g_sys_loaded_main_div_dsl = 1;

function jq_get_main_dsl()
{
    return $('<div/>',
        {
            id: 'div_main_dsl'
        })
        .append($('<div/>',
            {
                id: 'div_main_dsl_list'
            }))
        .append($('<div/>',
            {
                id: 'div_main_dsl_create'
            })
                .append($('<button/>',
                    {
                        id: B_TXT.CREATE_NEW
                    })
                    .click(function()
                    {
                        wid_nc_ds_create();
                    })));
}
