// (C) 2016


'use strict';


function start_progressbar($Obj)
{
    var counter = 0;
    
    
    return {
        wait: function () {
            let $Logo = $('#img_logo');
            
            counter++;
            
            if (counter > 0) {
                return $Logo.attr('src', IMG.LOGO_WAIT);
            }
        },
        done: function () {
            let $Logo = $('#img_logo');
            
            Boolean(counter > 0) && counter--;

            if (counter == 0)
                return setTimeout(function () {
                    $Logo.attr('src', IMG.LOGO_DONE);
                }, 200);
        },
        fail: function () {
            let $Logo = $('#img_logo');
            
            counter = 0;
            console.log('fail');

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
            g_img_preload[i].onload = function () {};
            g_img_preload[i].src = container[i];
        }
    }
}

function wid_modal_window(msg, click, func) {
    var $Window = $('#div_modal_window');
    var $Content = $('#div_modal_window_content');
    var width = $('body').outerWidth();
    var close, esc;

    $Content.width(width);

    close = function () {
        $Window.find('p').empty();
        $Window.css('display', 'none');

        (Boolean(func)) && func();

        $Window.off('click');
        $Window.children().off('click');
        
        $(document).off('keyup');
        $(window).off('beforeunload');
    };

    esc = function (e) {
        e.keyCode == 27 && close();
    };

    if (click) {
        $Window
            .click(function () {
                close();
            })
            .children().click(function () {
            close();
            });
    } else {
        $Window.click(function(){
            close();
            }).children().click(function(e) {
                return false;
            });
    }

    $(document).keyup(function (event) {
        esc(event);
    })

    $(window).on('beforeunload', function () {
        return MESSAGE.RELOAD;
    })

    $Window.css('display', 'block');
    $Window.find('p').html(msg);
}


function wid_send_raw(data) {
    var cb;

    cb = function (data) {
        wid_modal_window(data, true);
    };

    ajx_send_command(data, cb, g_progressbar);

}


function wid_paint_borders($Obj, color) {
    var borders = [
        'borderLeftColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor'
    ];

    for (let i = 0; i < borders.length; i++) {
        (color !== undefined)
            ? $Obj.css(borders[i], color)
            : $Obj.css(borders[i], '');
    }
}


function wid_oninput_email($Obj) {
    var $Btn = $('#btn_email_login');
    var data = $Obj.val();

    if (is_email(data)) {
        wid_paint_borders($Obj);
        $Btn.prop('disabled', false);
    } else {
        Boolean(data)
            ? wid_paint_borders($Obj, 'red')
            : wid_paint_borders($Obj);

        $Btn.prop('disabled', true);
    }
}


function wid_open_login_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(get_html_login_window(), false);

    ph_obj_init($Window);
}


function wid_send_email() {
    var data = $('#input_email').val();
    var login_cmd = [PHENOD_CMD.LOGIN, data].join(' ');
    var cb = function (data) {
        wid_modal_window(data, true);
    };

    ajx_send_command(login_cmd, cb, g_progressbar);
}
