// (C) 2016
'use strict';

function main_div_pmw_js(){}
var g_sys_loaded_main_div_pmw = 1;

function jq_get_main_pmw()
{

    return $('<div/>',
        {
            id: 'div_main_pwm'
        })
        .append($('<div/>',
            {
                id: 'div_main_pwm_content'
            })
            .append($('<div/>',
            {
                id: 'div_main_pwm_content_header'
            }))
            .append($('<div/>',
            {
                id: 'div_main_pwm_content_body'
            }))
            .append($('<div/>',
            {
                id: 'div_main_pwm_content_footer'
            })));
}
