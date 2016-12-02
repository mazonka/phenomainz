// (C) 2016


'use strict';


function wid_oninput_login_email($Obj) {
    var $Btn = $('#btn_email_login');
    var data = $Obj.val();

    if (eng_is_email(data)) {
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
    var data = $('#input_login_email').val();
    var login_cmd = [PH_CMD.LOGIN, data].join(' ');
    var cb = function (data) {
        wid_modal_window(data, true);
    };

    ajx_send_command(login_cmd, cb, g_progressbar);
}


function wid_au_google() {
    gapi.load('client', start);
    
}




// Google au

function start() {
    gapi.client.init({
        'apiKey': '100038937843-duq0t7jc8pthv84n7d4r37953dlmqe24.apps.googleusercontent.com',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
    }).then(function () {
        return gapi.client.language.translations.list({
            q: 'hello world',
            source: 'en',
            target: 'de',
        });
    }).then(function (resp) {
        console.log(resp.result.data.translations[0].translatedText);
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
};


