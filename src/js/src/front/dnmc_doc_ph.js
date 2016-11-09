// (C) 2016


'use strict';


function wid_oninput_email($Obj) {
    var $Btn = $('#btn_email_login');
    var data = $Obj.val();

    if (is_email(data)) {
        wid_paint_borders($Obj);
        $Btn.prop('disabled', false);
        $Obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_send_email();
            $Obj.off('keypress');
        });
    } else {
        (Boolean(data))
            ? wid_paint_borders($Obj, 'red')
            : wid_paint_borders($Obj);

        $Obj.off('keypress');

        $Btn.prop('disabled', true);
    }
}


function wid_open_login_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(get_html_login_window(), false);

    dyn_obj_init($Window);
}

function wid_send_email() {
    var data = $('#input_email').val();
    var login_cmd = [PH_CMD.LOGIN, data].join(' ');
    var cb = function (data) {
        wid_modal_window(data, true);
    };

    ajx_send_command(login_cmd, cb, g_progressbar);
}
