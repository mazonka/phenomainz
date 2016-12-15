// (C) 2016


'use strict';

function wid_pulse() {
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

function img_preload(container) {
    if (document.images) {
        for (let i = 0; i < container.length; i++) {
            g_img_preload[i] = new Image();
            g_img_preload[i].onload = function () {};
            g_img_preload[i].src = container[i];
        }
    }
}

function wid_modal_window(data, click, func) {
    var $window = $('#div_modal_window');
    var $content = $('#div_modal_window_content');
    var $body = $('#div_modal_window_content_body');
    var width = $('body').outerWidth();
    var $obj;
    var close
    var esc;

    if (typeof data == 'string') {
        $obj = $('<p>', {
                text: data
            });
    } else {
        $obj = data;
    }

    $content.width(width);

    close = function () {
        $body.children().remove();
        $window.css('display', 'none');

        (Boolean(func)) && func();

        $window.off('click');
        $window.children().off('click');

        $(document).off('keyup');
        $(window).off('beforeunload');
    };

    esc = function (e) {
        e.keyCode == 27 && close();
    };

    if (click) {
        $window.click(function () {
            close();
        }).children().click(function () {
            close();
        });
    } else {
        $window.click(function () {
            close();
        }).children().click(function (e) {
            return false;
        });
    }

    $(document).keyup(function (event) {
        esc(event);
    })

    $(window).on('beforeunload', function () {
        return M_TXT.RELOAD;
    })

    $window.css('display', 'block');
    $body.children().remove();
    $body.append($obj);
}

function wid_ui_logout() {
    $('#td_profile').hide();
    $('#td_admin').hide();
    $('#td_ds_ctrl').hide();
    $('#td_ds_list').hide();
    $('#td_login').show();

    Boolean(g_user_id !== '0') && wid_modal_window('Session expired', true);

    hello.init({
        facebook: FACEBOOK_CLIENT_ID,
        windows: WINDOWS_CLIENT_ID,
        google: GOOGLE_CLIENT_ID,
        linkedin: LINKEDIN_CLIENT_ID
    }, {
        redirect_uri: 'redirect.html',
        response_type: 'code',
        force: true,
        scope: 'email',
        display: 'page'
    });
}

function wid_ui_login() {
    $('#td_login').hide();
    $('#td_profile').show();
    $('#td_ds_ctrl').show();
    $('#td_ds_list').show();

    wid_nc_profile();
    wid_nc_ds_list();
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

    if (file.size > G_MAX_FILE_SIZE) {
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
        });
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
        });

        return false;
    }
}

function wid_upload_file() {
    return false;
}

function wid_open_email_window() {
    wid_modal_window(wid_get_jq_user_email(), false);
}

function wid_input_email($obj) {
    var $btn = $('#button_user_email');
    var data = $obj.val();

    if (eng_is_email(data)) {
        $btn.button('enable');
        wid_paint_borders($obj);

        $obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_login();
            $obj.off('keypress');
        });
    } else {
        (Boolean(data))
         ? wid_paint_borders($obj, 'red')
         : wid_paint_borders($obj);

        $btn.button('disable');
        $obj.off('keypress');
    }
}

function wid_open_profile_window($obj) {
    var name = $obj.html().substring(6);
    wid_modal_window(wid_get_jq_user_profile(name), false);
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
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            wid_ui_login();
        } else if (resp == PHENOD.AUTH) {
            wid_ui_logout();
        } else {
            wid_modal_window(M_TXT.ERROR + resp, true);
        }
    };

    eng_nc_ping(cb, g_user_id, g_pulse);
}

function wid_nc_login() {
    var email = $('#input_user_email').val();
    var url = document.URL;

    var cb = function (resp) {
        let msg;

        (resp == PHENOD.OK)
         ? msg = M_TXT.EMAIL + email
             : msg = M_TXT.ERROR + resp;

        wid_modal_window(msg, true);
    };

    eng_nc_login(cb, email, url, g_pulse)
}

function wid_nc_logout() {
    var cb = function (data) {
        wid_modal_window(data, true);
    };

    eng_nc_logout(cb, g_user_id, g_pulse)
}

function wid_nc_profile() {
    var cb = function (resp, profile) {
        let r,
        date,
        time;

        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        r = eng_get_lastdate(profile.lastdate);
        date = [r.yyyy, r.mm, r.dd].join('.');
        time = [r.h, r.m, r.s].join(':');

        $('#div_profile_name').prepend(L_TXT.USER_NAME);
        $('#div_profile_name_name').html(profile.name);
        $('#div_profile_email').html(L_TXT.EMAIL + profile.email);

        $('#div_profile_lastdate').html(L_TXT.LAST_LOGIN + date + ', ' + time);
        $('#div_profile_counter').html(L_TXT.COUNTER + profile.counter);
    };

    eng_nc_profile(cb, g_user_id, g_pulse);
}

function wid_input_name($obj) {
    var $btn = $('#button_user_name');
    var data = $obj.val();

    data = data.replace(/^\s+|\s+$/g, '');

    if (eng_is_valid_str(data)) {
        wid_paint_borders($obj);

        $btn.button('enable');
        $obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_name();
            $obj.off('keypress');
        });
    } else {
        if (Boolean(data)) {
            wid_paint_borders($obj, 'red')
        } else {
            wid_paint_borders($obj);
        }

        $btn.button('disable');
        $obj.off('keypress');
    }
}

function wid_nc_name() {
    var name = $('#input_user_name').val() || '*';
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_profile();
    };

    eng_nc_name(cb, g_user_id, name, g_pulse);
}

function wid_nc_ds_list() {
    var cb = function (resp, list) {
        let $td_ds_list = $('#td_ds_list');
        let $div;

        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        $td_ds_list.children().remove();

        if (list !== null) {
            $div = wid_get_jq_ds_list(list.n, list.id, list.title);
            $td_ds_list.append($div);
        }
    };

    eng_nc_ds_list(cb, g_user_id);
}

function wid_nc_ds_create() {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_ds_list();
    };

    eng_nc_ds_create(cb, g_user_id);
}

function wid_nc_ds_delete(ds_id) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_ds_list();
    };

    eng_nc_ds_delete(cb, g_user_id, ds_id);
}

function wid_nc_ds_get(ds_id) {
    var cb = function (resp, ds) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true);
        }

        
        let $ds_div = $('#div_ds_' + ds.id);
        if ($ds_div.html() == '') {
           $ds_div.append(wid_get_jq_ds_item(ds));    
        };
    }
    eng_nc_ds_get(cb, g_user_id, ds_id);
}

