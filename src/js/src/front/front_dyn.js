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
        //$Window.find('p').empty();
        $Window.find('p').children().remove();
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
    //append(msg) instead .html(msg);
    $Window.find('p').append(msg);
}


function wid_ui_auth() {
    if (g_user_id == 0) {
        wid_ui_logout();
    } else {
        wid_ui_login();
        wid_nc_profile();
        wid_nc_ds_list();
    }
}


function wid_ui_logout() {
    $('#td_profile').hide();
    $('#td_open_file').hide();
    $('#td_ds_ctrl').hide();
    $('#td_ds_list').hide();
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
    $('#td_ds_ctrl').show();
    $('#td_ds_list').show();
    $('#td_login').hide();
    
}


function wid_paint_borders($obj, color) {
    var borders = [
        'borderLeftColor',
        'borderTopColor',
        'borderRightColor',
        'borderBottomColor'
    ];

    for (let i = 0; i < borders.length; i++) {
        (color !== undefined)
            ? $obj.css(borders[i], color)
            : $obj.css(borders[i], '');
    }
}


function wid_open_file(files, $obj) {
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
        
        $obj.click(function () {
            return wid_file_is_open(false);
        });

        wid_modal_window(html_get_file_metadata(file), false);
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

    //dyn_obj_init($Window);
}


function wid_oninput_email($obj) {
    var $Btn = $('#button_user_email');
    var data = $obj.val();

    if (eng_is_email(data)) {
        wid_paint_borders($obj);
        $Btn.prop('disabled', false);
        $obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_login();
            $obj.off('keypress');
        });
    } else {
        (Boolean(data))
            ? wid_paint_borders($obj, 'red')
            : wid_paint_borders($obj);

        $obj.off('keypress');

        $Btn.prop('disabled', true);
    }
}


function wid_open_name_window($obj) {
    var $Window = $('#div_modal_window');
    var name = $obj.html().substring(6);
    
    wid_modal_window(html_get_name_window(name), false);
    //dyn_obj_init($Window);
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

    eng_nc_ping(cb, g_user_id, g_pulse);
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
    eng_nc_logout(cb, g_user_id, g_pulse)
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

    eng_nc_profile(cb, g_user_id, g_pulse);
}


function wid_oninput_name($obj) {
    var $Btn = $('#button_user_name');
    var data = $obj.val();

    data = data.replace(/^\s+|\s+$/g, '');
    
    if (!eng_is_valid_str(data)) {
        wid_paint_borders($obj);
        $Btn.prop('disabled', false);
        $obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_name();
            $obj.off('keypress');
        });
    } else {
        (Boolean(data))
            ? wid_paint_borders($obj, 'red')
            : wid_paint_borders($obj);

        $obj.off('keypress');

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
    eng_nc_name(cb, g_user_id, name, g_pulse);
}


function wid_nc_ds_list() {
    var $Parent = $('#td_ds_list');
    var $obj = $('#div_ds_list');
    
    var cb = function (list) {
        let l = '';
        
        if (list.n !== 0) {
            l = html_get_ds_list(list.n, list.id, list.title);
        }
        
        wid_write_html($Parent, l);
        dyn_ds_init($obj);
    }
 
    eng_nc_ds_list(cb, g_user_id);
}

function wid_write_html($obj, data) {
    $obj.html(data);
}


function wid_nc_ds_create() {
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            wid_nc_ds_list();
        } else {
            wid_modal_window(resp, true);
        }
    }
 
    eng_nc_ds_create(cb, g_user_id);
}


function wid_nc_ds_delete(ds_id) {
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            wid_nc_ds_list();
        } else {
            wid_modal_window(resp, true);
        }
    }
 
    eng_nc_ds_delete(cb, g_user_id, ds_id);
}


function wid_nc_ds_get($obj) {
    var cb = function (resp) {

    }
 
    eng_nc_ds_get(cb, g_user_id);
}

function wid_ds_init(id) {
    if (typeof id !== 'undefined') {
        let ds_id;
        let l;
        
        ds_id= id.split('_');
        ds_id = ds_id[ds_id.length -1];
        
        
        if ($('#div_ds_ctrl_' + ds_id).html() == '') {
            wid_jq_ds_item_ctrl($('#div_ds_ctrl_' + ds_id), ds_id);
            // $('#div_ds_ctrl_' + ds_id).append(l.button());
        }
    }    
}

