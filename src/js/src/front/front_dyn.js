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

function wid_modal_window(data, click, f_close, f_init) {
    var $window = $('#div_modal_window');
    var $content = $('#div_modal_window_content');
    var $body = $('#div_modal_window_content_body');
    var width = $('body').outerWidth();
    var $obj;
    var close = function () {
        $body.children().remove();
        $window.css('display', 'none');

        (Boolean(f_close)) && f_close();

        $window.off('click');
        $window.children().off('click');

        $(document).off('keyup');
        $(window).off('beforeunload');
    };
    var esc = function (e) {
        e.keyCode == 27 && close();
    };

    if (!Boolean(data)) {
        return close();
    }
        
    $content.width(width);
    
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

    if (typeof data == 'string') {
        $obj = $('<p>', {
                text: data
            });
    } else {
        $obj = data;
    }
    
    $window.css('display', 'block');
    $body.html($obj);
    Boolean(f_init) && f_init();
}

function wid_ui_logout() {
    $('#td_profile').hide();
    $('#td_admin').hide();
    $('#td_ds_ctrl').hide();
    $('#td_ds_list').hide();
    $('#td_login').show();
    
    hello.init({
        //facebook: FACEBOOK_CLIENT_ID,
        //windows: WINDOWS_CLIENT_ID,
        google: GOOGLE_CLIENT_ID,
        //linkedin: LINKEDIN_CLIENT_ID
    } , {
        redirect_uri: 'redirect.html',
       /*  //response_type: 'code',
        //force: true,
        scope: 'email',
        display: 'popup' */
    });
    
    Boolean(g_user_id !== '0') && 
        wid_modal_window(M_TXT.SESSION_EXP, true, null, null);
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
            return wid_modal_window(M_TXT.FILE_READ_ERROR, true, null, null);
        }

        table = eng_is_table(file.raw);

        if (!table.is_table) {
            return wid_modal_window(M_TXT.TABLE_ERROR + table.err_row, true, null, null);
        }
        ///console.log(file);

        wid_file_is_open(true);

        $obj.click(function () {
            return wid_file_is_open(false);
        });

        wid_modal_window(html_get_file_metadata(file), false, null, null);
    };

    var cb_progress = function (data) {
        console.log(data + '%');
    };

    file = files[0];

    if (file.size > G_MAX_FILE_SIZE) {
        return wid_modal_window(M_TXT.FILE_IS_HUGE, true, null, null);
    }

    if (file.size === 0) {
        return wid_modal_window(M_TXT.FILE_IS_EMPTY, true, null, null);
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
    var $obj = wid_get_jq_user_email();
    var ui_init = function () {
        $obj.find('button').button().button('disable');
    }
    
    wid_modal_window($obj, false, null, ui_init);
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

function wid_open_profile_window(name) {
    var $obj = wid_get_jq_user_profile(name);
    var ui_init = function () {
        $('#button_user_name').button().button('disable');
        $('#button_user_logout').button();
    }
    
    wid_modal_window($obj, false, null, ui_init);
}


function wid_auth(auth_network) {
    //console.log(hello(auth_network).getAuthResponse());
    hello.on('auth', function(auth) {
        // Call user information, for the given network
        console.log(auth);
        hello(auth.network).api('me').then(function(r) {
            // Inject it into the container
            var label = document.getElementById('profile_' + auth.network);
            if (!label) {
                label = document.createElement('div');
                label.id = 'profile_' + auth.network;
                document.getElementById('profile').appendChild(label);
            }
            label.innerHTML = '<img src="' + r.thumbnail + '" /> Hey ' + r.name;
        });
    });    
    
    hello(auth_network).login();

    console.log('hello.on');

/*    hello.on('auth', function (auth) {
        console.log('in cb');
        console.log(auth_network);
        // Call user information, for the given network
        hello(auth_network).api('me').then(function (r) {
            // Inject it into the container
            console.log(auth_network + ': ' + r.email);
        });
    });

    if (Boolean(hello(auth_network).getAuthResponse())) {
        hello(auth_network).logout().then(function () {
            console.log('Signed out: ' + auth_network);
        }, function (e) {
            console.log('Signed out error: ' + e.error.message);
        });
    } else {
        hello(auth_network).login({
            scope: 'email'
        });
    } */
}

function wid_nc_ping() {
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            wid_ui_login();
        } else if (resp == PHENOD.AUTH) {
            wid_ui_logout();
        } else {
            wid_modal_window(M_TXT.ERROR + resp, true, null, null);
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

        wid_modal_window(msg, true, null, null);
    };

    eng_nc_login(cb, email, url, g_pulse)
}

function wid_nc_logout() {
    var cb = function (data) {
        wid_modal_window(data, true, null, null);
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
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }

        r = eng_get_lastdate(profile.lastdate);
        date = [r.yyyy, r.mm, r.dd].join('.');
        time = [r.h, r.m, r.s].join(':');

        $('#span_profile_name').find('span').html(profile.name);
        $('#span_profile_email').find('span').html(profile.email);
        $('#span_profile_lastdate').find('span').html(date + ', ' + time);
        $('#span_profile_counter').find('span').html(profile.counter);
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
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
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
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
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
            wid_nc_ds_list();
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }

        wid_nc_ds_list();
    };

    eng_nc_ds_create(cb, g_user_id);
}

function wid_nc_ds_upd_title(ds_id, title) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            wid_nc_ds_list();
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }
        
        wid_nc_ds_get(ds_id, true);
    };
    
    title = title || '*';
    
    eng_nc_ds_upd_title(cb, g_user_id, ds_id, title);
}

function wid_nc_ds_upd_descr(ds_id, descr) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            wid_nc_ds_list();
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }
        
        wid_nc_ds_get(ds_id, true);
    };
    
    descr = descr || '*';
    
    eng_nc_ds_upd_descr(cb, g_user_id, ds_id, descr);
}

function wid_nc_ds_upd_categ(ds_id, cat_id) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            wid_nc_ds_list();
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }
        
        wid_modal_window();
        wid_nc_ds_get(ds_id, true);
        
    };
    
    eng_nc_ds_upd_categ(cb, g_user_id, ds_id, cat_id);
}

function wid_nc_ds_delete(ds_id) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }

        wid_nc_ds_list();
    };

    eng_nc_ds_delete(cb, g_user_id, ds_id);
}

function wid_nc_ds_get(ds_id, force) {
    var $ds_div = $('#div_ds_' + ds_id);
    var cb = function (resp, ds) {
        let $ds_item;
        
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true, null, null);
        }
        
        $ds_item = wid_get_jq_ds_item(ds);
        $ds_div.html($ds_item);
        $ds_item.find('button').button();
        
    }
    
    if (!Boolean($ds_div.html())) {
        force = true;
    }    
    
    if (force) {
        eng_nc_ds_get(cb, g_user_id, ds_id);
    }
}

function wid_click_ds_ctrl(ds, cmd, $obj) {
    var $input = $obj.closest('tr').find('input');
    var $textarea = $obj.closest('tr').find('textarea');
    var $cancel = $obj.closest('tr').find('.dataset-cancel-button');
    var ds_update_cmd = $obj.closest('tr').attr('data-id');
    
    $obj.off('click');
    $cancel.off('click');
    
    switch (cmd) {
        case 'edit':
            Boolean($input) && $input.prop('disabled', false);
            Boolean($textarea) && $textarea.prop('disabled', false);
            $cancel.removeClass('dataset-disabled-button');

            $obj.html('(s)').attr('title', 'Submit');;
            $obj.click(function () {
                    wid_click_ds_ctrl(ds, 'submit', $obj);
                });

            $cancel.click(function () {
                wid_click_ds_ctrl(ds, 'cancel', $obj);
            });
            
            break;
        case 'submit':
            Boolean($input) && $input.prop('disabled', true);
            Boolean($textarea) && $textarea.prop('disabled', true);
            
            $cancel.addClass('dataset-disabled-button');
            
            $obj.html('(e)').attr('title', 'Edit');
            
            $obj.click(function () {
                wid_click_ds_ctrl(ds, 'edit', $obj);
            });
            
            if (ds_update_cmd == 'title') {
                wid_nc_ds_upd_title(ds.id, $input.val());
            } else if (ds_update_cmd == 'descr') {
                wid_nc_ds_upd_descr(ds.id, $textarea.val());
            }
            
            break;
        case 'cancel':
            $cancel.off('click');
            Boolean($input) && $input.prop('disabled', true);
            Boolean($textarea) && $textarea.prop('disabled', true);
            $cancel.addClass('dataset-disabled-button');
            
            
            $obj.html('(e)').attr('title', 'Edit');
            wid_nc_ds_get(ds.id, true);
            
            $obj.click(function () {
                wid_click_ds_ctrl(ds, 'edit', $obj);
            });
            
            
            break;
        default:
            return;
    }
}

function wid_nc_ds_cat(ds, cat_id) {
    var cb = function (resp, data) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout();
        } else if (resp != PHENOD.OK) {
            return wid_modal_window(M_TXT.ERROR + resp, true, null,
                null);
        }
        
        if (Boolean(data)) {
            let $obj = wid_get_jq_cat_menu(ds, data);
            let f = function () {
                let $m = $obj.find('select');
                let $b = $obj.find('button');
                
                $m.selectmenu()
                    .selectmenu({
                        select: function (event, ui) {
                            wid_nc_ds_cat(ds, ui.item.value);
                            
                            $b.click(function () {
                                wid_nc_ds_upd_categ(ds.id, ui.item.value);
                                console.log(ui.item.value);
                            });
                        }
                    });

                $b.button();
            }

            wid_modal_window($obj, false, null, f);
        }
    }

    eng_nc_cat_kids(cb, g_user_id, cat_id);
}
