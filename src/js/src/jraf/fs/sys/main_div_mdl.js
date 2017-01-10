// (C) 2016
'use strict';

var g_sys_loaded_file10 = 1;

function jq_get_main_mdl()
{

    return $('<div/>',
        {
            id: 'div_modal_window'
        })
        .append($('<div/>',
            {
                id: 'div_modal_window_content'
            })
            .append($('<div/>',
            {
                id: 'div_modal_window_content_header'
            }))
            .append($('<div/>',
            {
                id: 'div_modal_window_content_body'
            }))
            .append($('<div/>',
            {
                id: 'div_modal_window_content_footer'
            })));
}
