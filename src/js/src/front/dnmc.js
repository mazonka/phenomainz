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
        return MSG.RELOAD;
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


function wid_oninput_login_email($Obj) {
    var $Btn = $('#button_send_email');
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


function wid_open_file(files, $Obj) {
    var file;

    if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
    } else {
        alert('The File APIs are not fully supported in this browser.');
        return false;
    }

    if (!Boolean(files[0])) {
        return false;
    }

    var cb_main = function (file) {
        var table;
        var f;

        if (file.error !== 0) {
            return wid_modal_window(MSG.FILE_READ_ERROR, true);
        }

        table = eng_is_table(file.raw);

        if (!table.is_table) {
            return wid_modal_window(MSG.TABLE_ERROR + table.err_row, true);
        }
        ///console.log(file);
        
        wid_file_is_open(true);
        
        $Obj.click(function () {
            return wid_file_is_open(false);
        });

        wid_modal_window(get_html_open_file(file), false);
    };

    var cb_progress = function (data) {
        console.log(data + '%');
    };

    file = files[0];

    if (file.size > G_MAX_FILE_SIZE ) {
        return wid_modal_window(MSG.FILE_IS_HUGE, true);
    }

    if (file.size === 0) {
        return wid_modal_window(MSG.FILE_IS_EMPTY, true);
    }

    eng_open_file(file, cb_main, cb_progress);
}

function wid_file_is_open(toggle) {
    var $Input = $('#input_open_file');
    var $Label = $('#label_open_file');

    if (toggle) {
        $Input.attr('type', 'text');
        $Label.css('background', '#FF0000');
        $Label.hover(
            function () {
                $(this).css('background', '#FF0000')
            },
            function () {
                $(this).css('background', '#FF0000')
            }
        );
    } else {
        $Input.attr('type', 'file');
        $Input.val('');
        $Input.off('click');
        $Label.css('background', '#FCFCFC');
        $Label.hover(
            function () {
                $(this).css('background', '#87CEEB')
            },
            function () {
                $(this).css('background', '#FCFCFC')
            }
        );

        return false;        
    }
}


function wid_upload_file() {
    return false;
}

// (C) 2016


'use strict';


function wid_oninput_login_email($Obj) {
    var $Btn = $('#button_send_email');
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
    var email = $('#input_login_email').val();
    var url = document.URL;
    var login_cmd = [PH_CMD.LOGIN, email, url].join(' ');
    console.log(login_cmd);
    var cb = function (data) {
        wid_modal_window(data, true);
    };

    ajx_send_command(login_cmd, cb, g_progressbar);
}

function wid_auth(auth_network) {
    console.log(hello(auth_network).getAuthResponse());
    hello.on('auth.login', function(auth) {

        // Call user information, for the given network
        hello(auth.network).api('me').then(function(r) {
            // Inject it into the container
            console.log(auth.network + ': ' + r.email);
        });
    });
        
    if (Boolean(hello(auth_network).getAuthResponse())) {
        hello(auth_network).logout().then(function() {
            console.log('Signed out: ' + auth_network);
        }, function(e) {
            console.log('Signed out error: ' + e.error.message);
        });
    } else {
        hello(auth_network).login({scope: 'email'});
    }
}

function wid_get_profile(uid) {
    var cmd = ['au', uid, 'profile'].join(' ');
    
    var cb = function (data) {
        console.log(data);
        if (data == 'REQ_MSG_BAD') {
            $('#div_profile').html('<i>session id</i>: ' + uid);
            console.log(uid);
        } else {
            let profile = eng_get_profile(data)
            $('#div_profile').html(profile.name);
            console.log(profile);
        }
    };

    ajx_send_command(cmd, cb, g_progressbar);
}

function wid_set_name(uid, name) {
    var cmd = ['au', uid, 'name', window.btoa(name)].join(' ');
    
    var cb = function (data) {
        console.log(data);
    };

    ajx_send_command(cmd, cb, g_progressbar);
}