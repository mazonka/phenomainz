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
        let r;
        let date;
        let time;

        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        r = eng_get_lastdate(profile.lastdate);
        date = [r.yyyy, r.mm, r.dd].join('.');
        time = [r.h, r.m, r.s].join(':');

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

        wid_nc_profile();
        wid_close_modal_window();
    };

    eng_nc_name(cb, g_user_id, name, g_pulse);
}

function wid_nc_ds_list() {
    var cb = function (resp, list) {
        let $td_ds_list = $('#td_ds_list');
        let $div;

        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        $td_ds_list.children()
            .remove();

        if (list !== null) {
            $div = jq_get_ds_list(list.n, list.id, list.title);
            $td_ds_list.append($div);
            wid_jq_ui_init_ds_accordion($div);
        }
    };

    eng_nc_ds_list(cb, g_user_id);
}

function wid_nc_ds_get(ds_id, force) {
    var $ds_div = $('#div_ds_' + ds_id);
    var cb = function (resp, ds) {
        let $ds_item;
        let $ds_h3 = $('#h3_ds_' + ds_id);

        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }
        
        $ds_item = jq_get_ds_div(ds);
           
        $ds_div
            .html($ds_item);

        $ds_item
            .find('button')
            .button();
    }

    if (!Boolean($ds_div.html())) {
        force = true;
    }

    if (force) {
        eng_nc_ds_get(cb, g_user_id, ds_id);
    }
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

    eng_nc_ds_create(cb, g_user_id);
}

function wid_nc_ds_upd_cmd(cmd, ds_id, data) {
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            wid_nc_ds_list();
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        wid_nc_ds_get(ds_id, true);
    };

    data = data || window.btoa('*');

    if (cmd == 'title') {
        eng_nc_ds_upd_title(cb, g_user_id, ds_id, data);
    } else if (cmd == 'descr') {
        eng_nc_ds_upd_descr(cb, g_user_id, ds_id, data);
    } else if (cmd == 'categ') {
        eng_nc_ds_upd_categ(cb, g_user_id, ds_id, data);
    } else if (cmd == 'keywd') {
        //eng_nc_ds_addkw(cb, g_user_id, ds_id, data);
    }
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

    eng_nc_ds_delete(cb, g_user_id, ds_id);
}

function wid_nc_cat_kids(cat) {
    var cb = function (resp, sub_cat) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        console.log(sub_cat);

        if (Boolean(sub_cat.length)) {
            let $obj = jq_get_cat_menu(cat, sub_cat);

            /* let f = function () {
                let $m = $obj.find('select');
                let $b = $obj.find('button');

                $m.selectmenu({
                    select: function (event, ui) {
                        wid_nc_cat_kids(ds, ui.item.value);

                        $b.click(function () {
                            wid_nc_ds_upd_categ(ds.id, ui.item.value);
                            console.log(ui.item.value);
                        });
                    }
                });

                $b.button();
            } */

            wid_open_modal_window($obj, false);//, null, f);
        }
    };

    eng_nc_cat_kids(cb, g_user_id, cat.id);
}
