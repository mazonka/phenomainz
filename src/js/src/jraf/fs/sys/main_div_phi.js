// (C) 2016
'use strict';

var g_sys_loaded_file6 = 1;

function jq_get_main_phi()
{
    $phi = $('<div/>',
        {
            id: 'td_logo',
        })
        .append($('<span/>')
            .append($('<img/>',
            {
                id: 'img_logo',
                src: IMG.LOGO_DONE
            })));

    return $phi;
}
