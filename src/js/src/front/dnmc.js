// (C) 2016


'use strict';


function wid_pulse()
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
        return M_TXT.RELOAD;
    })

    $Window.css('display', 'block');
    $Window.find('p').html(msg);
}


function wid_ui_auth() {
    if (g_uid == 0) {
        wid_ui_logout();
    } else {
        wid_ui_login();
        wid_nc_profile();
        wid_nc_dataset_list();
    }
}


function wid_ui_logout() {
    $('#td_profile').hide();
    $('#td_open_file').hide();
    $('#td_dataset_ctrl').hide();
    $('#td_dataset_list').hide();
    $('#td_login').show();

    hello.init(
        {
            facebook: FACEBOOK_CLIENT_ID,
            windows: WINDOWS_CLIENT_ID,
            google: GOOGLE_CLIENT_ID,
            linkedin: LINKEDIN_CLIENT_ID
        },
        {
            redirect_uri: 'redirect.html',
            response_type: 'code',
            force: true,
            scope: 'email',
            display: 'page'
        }
    );
}


function wid_ui_login() {
    $('#td_profile').show();
    $('#td_open_file').show();
    $('#td_dataset_ctrl').show();
    $('#td_dataset_list').show();
    $('#td_login').hide();
    
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
            return wid_modal_window(M_TXT.FILE_READ_ERROR, true);
        }

        table = eng_is_table(file.raw);

        if (!table.is_table) {
            return wid_modal_window(M_TXT.TABLE_ERROR + table.err_row, true);
        }
        ///console.log(file);

        wid_file_is_open(true);

        $Obj.click(function () {
            return wid_file_is_open(false);
        });

        wid_modal_window(html_get_open_file(file), false);
    };

    var cb_progress = function (data) {
        console.log(data + '%');
    };

    file = files[0];

    if (file.size > G_MAX_FILE_SIZE ) {
        return wid_modal_window(M_TXT.FILE_IS_HUGE, true);
    }

    if (file.size === 0) {
        return wid_modal_window(M_TXT.FILE_IS_EMPTY, true);
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


function wid_open_email_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(html_get_email_window(), false);

    dyn_obj_init($Window);
}


function wid_oninput_email($Obj) {
    var $Btn = $('#button_user_email');
    var data = $Obj.val();

    if (eng_is_email(data)) {
        wid_paint_borders($Obj);
        $Btn.prop('disabled', false);
        $Obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_login();
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


function wid_open_name_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(html_get_name_window(), false);

    dyn_obj_init($Window);
}


/*
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

*/

function wid_nc_ping() {
    var cb = function (resp, sign_in) {
        if (resp !== PHENOD.OK && resp !== PHENOD.AUTH) {
            return alert(M_TXT.ERROR + resp);
        }

        wid_ui_auth();
    };

    eng_nc_ping(cb, g_uid, g_pulse);
}


function wid_nc_login() {
    var email = $('#input_user_email').val();
    var url = document.URL;

    var cb = function (resp) {
        let msg = M_TXT.EMAIL + email;

        if (resp !== PHENOD.OK) {
            msg = M_TXT.ERROR + resp;
        }

        wid_modal_window(msg, true);
    };

    eng_nc_login(cb, email, url, g_pulse)
}


function wid_nc_logout() {
    var $Window = $('#div_modal_window');
    var cb = function (data) {
        wid_modal_window(data, true);
    };
    
    $Window.click();
    eng_nc_logout(cb, g_uid, g_pulse)
}


function wid_nc_profile() {
    var cb = function (resp, profile) {
        var r, date, time;
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        }

        if (resp !== PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        r = eng_get_lastdate(profile.lastdate);
        date = [r.yyyy, r.mm, r.dd].join('.');
        time = [r.h, r.m, r.s].join(':');

        $('#div_profile_name').html('Name: ' + profile.name);
        $('#div_profile_email').html('E-mail: ' + profile.email);
        
        $('#div_profile_lastdate').html('Last login: ' + date + ', ' + time);
        $('#div_profile_counter').html('Count: ' + profile.counter);
    };

    eng_nc_profile(cb, g_uid, g_pulse);
}


function wid_oninput_name($Obj) {
    var $Btn = $('#button_user_name');
    var data = $Obj.val();

    data = data.replace(/^\s+|\s+$/g, '');
    
    if (!eng_is_valid_str(data)) {
        wid_paint_borders($Obj);
        $Btn.prop('disabled', false);
        $Obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_name();
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


function wid_nc_name() {
    var name = $('#input_user_name').val() || '*';
    var $Window = $('#div_modal_window');
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        }

        if (resp !== PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_nc_profile();
    };

    $Window.click();
    eng_nc_name(cb, g_uid, name, g_pulse);
}


function wid_nc_dataset_list() {
    var cb = function (list) {
        let l = '';
        
        if (list.n !== 0) {
            l = html_get_dataset_list(list.n, list.id, list.title);
        }
        
        $('#td_dataset_list').html(l);
        dyn_dataset_init();
    }
 
    eng_nc_dataset_list(cb, g_uid);
}


function wid_nc_dataset_create() {
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            wid_nc_dataset_list();
        } else {
            wid_modal_window(resp, true);
        }
    }
 
    eng_nc_dataset_create(cb, g_uid);
}

function wid_nc_dataset_get($Obj) {
    var cb = function (resp) {

    }
 
    eng_nc_dataset_get(cb, g_uid);
}

function uuu(id) {
    if (typeof id !== 'undefined') {
        let ds_id;
        let l;
        
        ds_id= id.split('_');
        ds_id = ds_id[ds_id.length -1];
        
        l = html_get_dataset_item_ctrl(ds_id);
        console.log($('#div_dataset_ctrl_' + ds_id).html())
        if ($('#div_dataset_ctrl_' + ds_id).html() == '') {
            $('#div_dataset_ctrl_' + ds_id).html(l);
        }
    }    
}

