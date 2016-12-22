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
    var $obj = jq_get_yes_no(M_TXT.SURE);
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
        $('#td_profile')
            .hide();
        $('#td_admin')
            .hide();
        $('#td_ds_ctrl')
            .hide();
        $('#td_ds_list')
            .empty()
            .hide();
        $('#td_login')
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
    $('#td_login')
        .hide();
    $('#td_profile')
        .show();
    $('#td_ds_ctrl')
        .show();
    $('#td_ds_list')
        .show();

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
            return wid_open_modal_window(M_TXT.FILE_READ_ERROR, true,
                null, null);
        }

        table = eng_is_table(file.raw);

        if (!table.is_table) {
            return wid_open_modal_window(M_TXT.TABLE_ERROR + table.err_row,
                true, null, null);
        }

        wid_file_is_open(true);

        $obj.click(function () {
            return wid_file_is_open(false);
        });

        console.log(file);
    };

    var cb_progress = function (data) {
        console.log(data + '%');
    };

    file = files[0];

    if (file.size > G_MAX_FILE_SIZE) {
        return wid_open_modal_window(M_TXT.FILE_IS_HUGE, true, null, null);
    }

    if (file.size === 0) {
        return wid_open_modal_window(M_TXT.FILE_IS_EMPTY, true, null, null);
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
    var $obj = jq_get_user_email();
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
    var $obj = jq_get_user_profile(name);
    var ui_init = function () {
        $obj.find('button')
            .button()
            .button('disable');
        $obj.find('input').focus();
    }

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


function wid_click_ds_button($btn, ds_id, submit) {
    var $cnl;
    var $fld;
    var toggle = function ($b, $f, $c, turn) {
        if (turn) {
            $f.prop('readonly', false) 
            $b.text(B_TXT.SUBMIT);
            $c.show();
            $f.focus();
        } else {
            $f.prop('readonly', true);
            $b.text($btn.attr('data-text'));
            $c.hide();            
        }
    };
    
    if (submit) {
        $fld = $btn.parent('td').next('td').children();
        $cnl = $fld.parent('td').next('td').children();
    } else {
        $cnl = $btn;
        $fld = $cnl.parent('td').prev('td').children();
        $btn = $fld.parent('td').prev('td').children();
    }
    
    if ($fld.prop('readonly') && !submit) {
        toggle($btn, $fld, $cnl, false);
        return alert('don\'t do that again!');
    } else if ($fld.prop('readonly')) {
        toggle($btn, $fld, $cnl, true)
    } else {
        let cmd = $btn.attr('data-cmd');
        toggle($btn, $fld, $cnl, false);
        
        if (cmd !== 'title' && cmd !== 'descr') {
            return;
        } else if (submit) {
            wid_nc_ds_upd_cmd(cmd, ds_id, $fld.val());
        } else if (!submit) {
            wid_nc_ds_get(ds_id, true);
        }
    }
}

function wid_click_ds_categ_button($obj, ds) {
    var c = {};
    
    if (Boolean(ds.categ.length)) {
        c.id = ds.categ[ds.categ.length - 1].id;
        c.path = eng_get_cat_path(ds.categ);
    } else {
        c.id = '0';
        c.path = '\u005c';
    }

    wid_nc_cat_kids(c);
}

function wid_click_ds_del_button(ds_id) {
    var $obj = jq_get_yes_no(M_TXT.SURE);
    var init = function () {
        $obj.find('.button-yes-button')
            .button()
            .click(function () {
                wid_nc_ds_delete(ds_id);
                wid_close_modal_window();
            });
        $obj.find('.button-no-button')
            .button()
            .click(function () {
                wid_close_modal_window();
            });

    }

    wid_open_modal_window($obj, false, init);
}

function wid_click_ds_cat_button($btn, ds) {
    var $fld = $btn.parent('td').next('td').children();
    var $cnl = $fld.parent('td').next('td').children();
    var toggle = function ($b, $f, $c, turn) {
        if (turn) {
            $b.text(B_TXT.SUBMIT);
            $c.show();
        } else {
            $b.text($btn.attr('data-text'));
            $c.hide();            
        }
    };
    
    if ($fld.prop('disabled')) {
        toggle($btn, $fld, $cnl, true)
    } else {
        toggle($btn, $fld, $cnl, false);    
    }
}