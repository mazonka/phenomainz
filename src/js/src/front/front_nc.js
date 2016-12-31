// (C) 2016


'use strict';

function wid_nc_ping() {
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            wid_ui_login();
        } else if (resp == PHENOD.AUTH) {
            wid_ui_logout(resp);
        } else {
            wid_open_modal_window(M_TXT.ERROR + resp, true, null, null);
        }
    };

    eng_nc_ping(cb, g_user_id, g_pulse);
}

function wid_nc_admin_ping() {
    var cb = function (resp) {
        if (resp == PHENOD.OK) {
            return wid_show_admin_panel(true);
        } else if (resp != PHENOD.AUTH) {
            wid_open_modal_window(M_TXT.ERROR + resp, true, null, null);
        }
        
        wid_show_admin_panel(false);
    };

    eng_nc_admin_ping(cb, g_user_id, g_pulse);
}

function wid_nc_login() {
    var email = $('#input_user_email')
        .val();
    var url = document.URL;

    var cb = function (resp) {
        let msg;

        resp == PHENOD.OK
            ? msg = M_TXT.EMAIL + email
            : msg = M_TXT.ERROR + resp;

        wid_open_modal_window(msg, true, null, null);
    };

    eng_nc_login(cb, email, url, g_pulse)
}

function wid_nc_logout() {
    var cb = function (resp) {
        let msg = Boolean(resp === PHENOD.OK)
            ? M_TXT.BYE
            : resp;

        wid_ui_logout(msg);
    };

    eng_nc_logout(cb, g_user_id, g_pulse)
}

function wid_nc_profile() {
    var cb = function (resp, profile) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_fill_profile(profile);
    };

    eng_nc_profile(cb, g_user_id, g_pulse);
}

function wid_nc_name($obj) {
    var name = $obj.parent('div').find('input').val() || '*';
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_close_modal_window();
        wid_nc_profile();
    };

    eng_nc_name(cb, g_user_id, name, g_pulse);
}

function wid_nc_ds_list() {
    var cb = function (resp, list) {
        
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_fill_ds_list(list);
    };

    eng_nc_ds_item_list(cb, g_user_id);
}

function wid_nc_ds_get(ds_id) {
    var $ds_div = $('#' + DIV_DS + ds_id);
    var cb = function (resp, ds) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_fill_dsitem_props(ds);
    };

    eng_nc_ds_get(cb, g_user_id, ds_id);
}

function wid_nc_ds_create() {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_nc_ds_list();
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_nc_ds_list();
    };

    eng_nc_ds_item_create(cb, g_user_id);
}

function wid_nc_ds_delete(ds_id) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_ds_list();
    };

    eng_nc_ds_item_delete(cb, g_user_id, ds_id);
}

function wid_nc_ds_upd_cmd(cmd, ds_id, data) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_nc_ds_list();
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_close_modal_window();
        wid_nc_ds_get(ds_id);
    };

        data = data || window.btoa('*');

    if (cmd == 'title') {
        eng_nc_ds_upd_title(cb, g_user_id, ds_id, data);
    } else if (cmd == 'descr') {
        eng_nc_ds_upd_descr(cb, g_user_id, ds_id, data);
    } else if (cmd == 'categ') {
        data = (data == '*')
            ? '0'
            : data;
        eng_nc_ds_upd_cat(cb, g_user_id, ds_id, data);
    }
}


function wid_nc_cat_kids(cat, ds) {
    var cb = function (resp, sub_cat) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        let $obj = get_jq_cat_menu(cat, sub_cat);
        let f = function () {
            let $b = $obj
                .find('button');
            let $m = $obj
                .find('select');

            $b
                .button()
                .click(function () {
                    let cat_id = $(this).parent().find('select :selected').attr('value');
                    
                    wid_close_modal_window();
                    wid_nc_ds_upd_categ(ds.id, cat_id);
            });
            
            $m.selectmenu({
                    select: function (event, ui) {
                        let new_cat = {};
                        new_cat.id = ui.item.value;
                        
                        if (new_cat.id == '0') {
                            new_cat.path = '\u002f';
                        } else if (new_cat.id == cat.id){
                            new_cat.path = cat.path;
                        } else {
                            new_cat.path = (cat.id == '0') 
                                ? cat.path + ui.item.label
                                : cat.path + '\u002f' + ui.item.label;
                            
                        }
                        
                        wid_nc_cat_kids(new_cat, ds);
                        
                    }
                });
        };
        
        wid_open_modal_window($obj, false, f, null);
    };
    
    eng_nc_cat_kids(cb, g_user_id, cat.id);
}

function wid_nc_ds_upd_categ(ds_id, cat_id) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_ds_get(ds_id);
    };

    eng_nc_ds_upd_cat(cb, g_user_id, ds_id, cat_id);
}

function wid_nc_ds_del_kwd(ds_id, kwd) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_ds_get(ds_id);
    };

    eng_nc_ds_del_kwd(cb, g_user_id, ds_id, kwd);
}

function wid_nc_add_kwd(ds_id, kwd) {
    var cb = function (resp, data) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_nc_ds_get(ds_id);
    };
    
    eng_nc_ds_add_kwd(cb, g_user_id, ds_id, kwd);
}

function wid_nc_keywords(f) {
    var cb = function (resp, data) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        g_keywords = data;
        
        (Boolean(f)) && f();
    };
    
    eng_nc_keywords(cb, g_user_id);
}

function wid_nc_ds_file_list(ds_id, file) {
    var $content = $('#' + DIV_DS + ds_id).find('.dsfiles-content');
    var cb = function (resp, data ) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        file = file || null;
        
        wid_fill_dsitem_files(ds_id, data, file);
    };

    eng_nc_ds_file_list(cb, g_user_id, ds_id);
}

function wid_nc_ds_file_new(ds_id, file) {
    var cb = function (resp, data) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        file.id = data;
        wid_nc_ds_file_list(ds_id, file);
    };

    eng_nc_ds_file_new(cb, g_user_id, ds_id);
}

function wid_nc_ds_file_del(ds_id, f_id) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        wid_nc_ds_file_list(ds_id);
    };

    eng_nc_ds_file_del(cb, g_user_id, ds_id, f_id);
}
