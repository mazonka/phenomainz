
// (C) 2016
'use strict';

function wid_utils_js() {}

var g_pulse = wid_pulse();

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