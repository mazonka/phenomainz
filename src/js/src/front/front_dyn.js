// (C) 2016
'use strict';

function wid_pulse() {
    var counter = 0;

    return {
        wait: function () {
            let $Logo = $('#img_logo');

            counter++;

            if (counter > 0) {
                wid_open_shell_window(true);
                return $Logo.attr('src', IMG.LOGO_WAIT);
            }
        },
        done: function () {
            let $Logo = $('#img_logo');

            Boolean(counter > 0) && counter--;

            if (counter == 0) {
                wid_open_shell_window(false);
             
                return setTimeout(function () {
                    $Logo.attr('src', IMG.LOGO_DONE);
                }, 200);
            }
        },
        fail: function () {
            let $Logo = $('#img_logo');

            counter = 0;
            console.log('Server fault!');
            wid_open_shell_window(false);
            
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

function wid_open_shell_window(toggle) {
    var $window = $('#div_modal_window');
    var $body = $('#div_modal_window_content_body');
    var width = $('body')
        .outerWidth();
        
    if (toggle) {
        //$body.html('<img id="img_logo" src="' + IMG.AJAX_LOAD + '">');
        //$window.css('display', 'block');
    } else {
        //$body.empty();
        //$window.css('display', 'none');
    }   
}

function wid_open_modal_window(data, click, f_init, f_close) {
    var $window = $('#div_modal_window');
    var $content = $('#div_modal_window_content');
    var $body = $('#div_modal_window_content_body');
    var width = $('body')
        .outerWidth();
    var $obj;
    var esc = function (e) {
        e.keyCode == 27 && wid_close_modal_window(f_close);
    };

    if (!Boolean(data)) {
        return wid_close_modal_window(f_close);
    }

    $content.width(width);

    if (click) {
        $window.click(function () {
                wid_close_modal_window(f_close);
            })
            .children()
            .click(function () {
                wid_close_modal_window(f_close);
            });
    } else {
        $window.click(function () {
                wid_close_modal_window(f_close);
            })
            .children()
            .click(function (e) {
                return false;
            });
    }

    $(document)
        .keyup(function (event) {
            esc(event);
        })

    $(window)
        .on('beforeunload', function () {
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

function wid_close_modal_window(f) {
    var $window = $('#div_modal_window');
    var $body = $('#div_modal_window_content_body');

    $body.children()
        .remove();
    $window.css('display', 'none');

    (Boolean(f)) && f();

    $window.off('click');
    $window.children()
        .off('click');

    $(document)
        .off('keyup');
    $(window)
        .off('beforeunload');
}


function wid_window_logout() {
    var $obj = get_jq_yes_no(M_TXT.SURE);
    var init = function () {
        $obj.find('.button-yes-button')
            .button()
            .click(function () {
                wid_nc_logout();
            });
        $obj.find('.button-no-button')
            .button()
            .click(function () {
                wid_close_modal_window();
            });

    }

    wid_open_modal_window($obj, false, init);
}

function wid_ui_logout(msg) {
    if (msg === PHENOD.AUTH || msg === M_TXT.BYE) {
        $('#' + TD_PROFILE)
            .hide();
        $('#td_admin')
            .hide();
        $('#' + td_dsitem_create)
            .hide();
        $('#' + td_dslist)
            .empty()
            .hide();
        $('#' + TD_LOGIN)
            .show();
    } 
    
    if (g_user_id === '0') {
        return;
    }
    
    if (msg === PHENOD.AUTH) {
        wid_open_modal_window(M_TXT.S_EXPIRED, true);
    } else {
        wid_open_modal_window(M_TXT.BYE, true);
    }
}

function wid_ui_login() {
    $('#' + TD_LOGIN).hide();
    $('#' + TD_PROFILE).show();
    $('#' + td_dsitem_create).show();
    $('#' + td_dslist).show();


    wid_nc_admin_ping();
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
        (color !== undefined) ? $obj.css(borders[i], color): $obj.css(
            borders[i], '');
    }
}

function wid_show_admin_panel(admin) {
    if (admin) {
        //var $div = get_jq_admin_panel();
        $('#td_admin').html($('<div/>', {
            text: 'I am ADMIN'
        }));
        console.log('admin');
    } else {
        console.log('not admin');
    }
}

function wid_file_is_open(toggle) {
    var $Input = $('#input_open_file');
    var $Label = $('#label_open_file');

    if (toggle) {
        $Input.attr('type', 'text');
        $Label.css('background', '#FF0000');
        $Label.hover(
            function () {
                $(this)
                    .css('background', '#FF0000')
            },
            function () {
                $(this)
                    .css('background', '#FF0000')
            });
    } else {
        $Input.attr('type', 'file');
        $Input.val('');
        $Input.off('click');
        $Label.css('background', '#FCFCFC');
        $Label.hover(
            function () {
                $(this)
                    .css('background', '#87CEEB')
            },
            function () {
                $(this)
                    .css('background', '#FCFCFC')
            });

        return false;
    }
}

function wid_upload_file() {
    return false;
}

function wid_open_email_window() {
    var $obj = get_jq_user_email();
    var ui_init = function () {
        $obj.find('button')
            .button()
            .button('disable');
        $obj.find('input').focus();
    };

    wid_open_modal_window($obj, false, ui_init);
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
        (Boolean(data)) ? wid_paint_borders($obj, 'red'): wid_paint_borders(
            $obj);

        $btn.button('disable');
        $obj.off('keypress');
    }
}

function wid_open_profile_window(name) {
    var $obj = get_jq_user_profile(name);
    var ui_init = function () {
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


function wid_auth(auth_network) {
}


function wid_input_name($obj) {
    var $btn = $('#button_user_name');
    var data = $obj.val();

    data = data.replace(/^\s+|\s+$/g, '');

    if (eng_is_valid_str(data)) {
        wid_paint_borders($obj);

        $btn.button('enable');
        $obj.on('keypress', function (event) {
            Boolean(event.keyCode === 13) && wid_nc_name($obj);
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

function wid_input_kwd($inp) {
    var $b = $inp.parent().find('button');
    var val = $inp.val();
    var list = $inp.autocomplete('option', 'source' );
    
    (list.indexOf(val) == '-1' || val == '')
        ? $b.button('disable')
        : $b.button('enable');
}

function wid_fill_profile(profile) {
        let r = eng_get_lastdate(profile.lastdate);
        let date = [r.yyyy, r.mm, r.dd].join('.');
        let time = [r.h, r.m, r.s].join(':');

        $('#span_profile_name')
            .find('span')
            .html(profile.name)
            .click(function () {
                wid_open_profile_window($(this)
                    .html());
            });

        $('#span_profile_logout')
            .find('button')
            .button()
            .click(function () {
                wid_window_logout();
            });

        $('#span_profile_email')
            .find('span')
            .html(profile.email);

        $('#span_profile_lastdate')
            .find('span')
            .html(date + ', ' + time);

        $('#span_profile_counter')
            .find('span')
            .html(profile.counter);    

        $('#span_profile_quote')
            .find('span')
            .html('0/' + profile.quote + ' Mb');
        
        Boolean(profile.tail) && alert('profile tail:\n' + list.tail);            
}

function wid_fill_ds_list(list) {
    $('#' + td_dslist)
        .children()
        .remove();

    if (Boolean(list) && list.n > 0) {
        let $div = get_jq_ds_list(list.n, list.id, list.title);
        
        $('#' + td_dslist).append($div);

        wid_init_ui_accordion($div, function (_this) {
            wid_click_ds_list_header(_this);
        });
        
        wid_init_ui_tooltip($div.find('.dsitem-header-delete'));
        
        //debug part
        Boolean(list.tail) && alert('ds list tail:\n' + list.tail);
    } else {
        return wid_open_modal_window(M_TXT.HELLO, true);
    }
}

function wid_fill_dsitem_props(ds) {
    var $ds_h1_header = $('#' + H1_DS + ds.id).find('.dsitem-header-title');
    var $dsitem = $('#' + DIV_DS + ds.id);
    var $props_row = $dsitem.find('.dsprops-div')
    var $props = get_jq_dsitem_props(ds);
    
    $ds_h1_header.html(eng_get_accordion_header(ds.id, ds.title));
    $props_row.html($props);
    
    wid_init_ui_button($props);
}


function wid_fill_dsitem_files(ds_id, list, file) {
    console.log('files');
    var $dsitem = $('#' + DIV_DS + ds_id);
    var $files_row = $dsitem.find('.dsfiles-div');
    var $files = get_jq_files_table(ds_id, list, file);
    
    if ($files_row.html() == '') {
        let $accdn = get_jq_dsitem_files();
        $files_row.html($accdn);
        $files_row.find('.dsfiles-content').html($files);
        
        wid_init_ui_accordion($accdn, null);
    } else {
        $files_row.find('.dsfiles-content').html($files);
    }
    
    wid_init_ui_button($files_row);
    wid_init_ui_tooltip($files_row.find('.dsfiles-delete'));
};

