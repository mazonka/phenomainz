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

function wid_open_modal_window(data, click, f_init, f_close)
{
    var $window = $('#div_main_pwm');
    var $content = $('#div_main_pwm_content');
    var $body = $('#div_main_pwm_content_body');
    var width = $('body').outerWidth();
    var $obj;
    var esc = function(e)
    {
        e.keyCode == 27 && wid_close_modal_window(f_close);
    };

    if (!Boolean(data))
    {
        return wid_close_modal_window(f_close);
    }

    $content.width(width);

    if (click)
    {
        $window.click(function()
            {
                wid_close_modal_window(f_close);
            })
            .children()
            .click(function()
            {
                wid_close_modal_window(f_close);
            });
    }
    else
    {
        $window.click(function()
            {
                wid_close_modal_window(f_close);
            })
            .children()
            .click(function(e)
            {
                return false;
            });
    }

    $(document)
        .keyup(function(event)
        {
            esc(event);
        })

    $(window)
        .on('beforeunload', function()
        {
            return M_TXT.RELOAD;
        })

    if (typeof data == 'string')
    {
        $obj = $('<p>',
        {
            text: data
        });
    }
    else
    {
        $obj = data;
    }

    $window.fadeIn({duration: 200});//css('display', 'block');
    $body.html($obj);
    Boolean(f_init) && f_init();
}

function wid_close_modal_window(f)
{
    var $window = $('#div_main_pwm');
    var $body = $('#div_main_pwm_content_body');

    $body.children().remove();
    $window.fadeOut({duration: 200});//css('display', 'none');

    (Boolean(f)) && f();

    $window.off('click');
    $window.children().off('click');
    $(document).off('keyup');
    $(window).off('beforeunload');
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
    if (0)
    {}
    else if (au && profile.email != '*')
    {
        wid_fill_login(false);
        wid_fill_adm_panel(profile.su);
        wid_fill_profile(profile);
        wid_fill_dataset_list(true);
    }
    else if (au && profile.email == '*')
    {
        wid_fill_login(true);
        wid_fill_adm_panel(profile.su);
        wid_fill_profile(false);
        wid_fill_dataset_list(false)
    }
    else 
    {
        wid_fill_login(true);
        wid_fill_adm_panel(false);
        wid_fill_profile(false);
        wid_fill_dataset_list(false);
        
        g_session = '0';
        window.location.href = 
            location.href.substr(0, location.href.indexOf('?')+1) + '0';
    }
}

function wid_open_chname_window(node, name)
{
    var $obj = jq_get_chname(node, name);
    var ui_init = function()
    {
        $obj
            .find('button')
            .button()
            .button('disable');
        $obj
            .find('input')
            .focus();
    };

    wid_open_modal_window($obj, false, ui_init);
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

