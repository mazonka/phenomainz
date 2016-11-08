// (C) 2016


'use strict';

function wid_modal_window(msg, func) {
    var $Window = $('#div_modal_window');
    var $Content = $('#div_modal_window_content');
    var width = $('body').outerWidth();
    var click, esc;

    $Content.width(width);

    click = function () {
        $Window.find('p').empty();
        $Window.css('display', 'none');

        if (Boolean(func)) {
            func();
        }

        $Window.off('click');
        $(document).off('keyup');
        $(window).off('beforeunload');
    };

    esc = function (e) {
        e.keyCode == 27 && click();
    };

    $Window.click(function () {
        click();
    })

    $(document).keyup(function (event) {
        esc(event);
    })

    $(window).on('beforeunload', function () {
        return gMsg.askExit;
    })

    $Window.css('display', 'block');
    $Window.find('p').html(msg);
}

function wid_send_raw(data) {
    var cb;

    cb = function (data) {
        wid_modal_window(data);
    };

    ajx_send_command(data, cb);

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

function wid_send_email() {
    var data = $('#input_email').val();
    var cb = function (data) {
        wid_modal_window(data);
    };

    ajx_send_command(data, cb);

}