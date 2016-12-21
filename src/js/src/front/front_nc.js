// (C) 2016


'use strict';

function wid_nc_name() {
    var name = $('#input_user_name')
        .val() || '*';
    var cb = function (resp) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
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
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        $td_ds_list.children()
            .remove();

        if (list !== null) {
            $div = wid_get_jq_ds_list(list.n, list.id, list.title);
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
        
        $ds_item = wid_get_jq_ds_div(ds);
        $ds_item
            .find('.ds-prop-button')
            .click(function () {
                wid_click_ds_prop_button($(this), ds, true);
            });
        $ds_item
            .find('.ds-cancel-button')
            .click(function () {
                wid_click_ds_prop_button($(this), ds, false);
            });
            
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
    
    data = data || '*';
    
    if (cmd == 'title') {
        eng_nc_ds_upd_title(cb, g_user_id, ds_id, data);
    } else if (cmd == 'descr') {
        eng_nc_ds_upd_descr(cb, g_user_id, ds_id, data);
    } else if (cmd == 'categ') {
        eng_nc_ds_upd_categ(cb, g_user_id, ds_id, cat_id);
    } else if (cmd == 'keywd') {
        eng_nc_ds_upd_keywd(cb, g_user_id, ds_id, data);
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

function wid_nc_ds_cat(ds, cat_id) {
    var cb = function (resp, data) {
        if (resp == PHENOD.AUTH) {
            return wid_ui_logout(resp);
        } else if (resp != PHENOD.OK) {
            return wid_open_modal_window(M_TXT.ERROR + resp, true);
        }

        if (Boolean(data)) {
            let $obj = wid_get_jq_cat_menu(ds, data);
            let f = function () {
                let $m = $obj.find('select');
                let $b = $obj.find('button');

                $m.selectmenu({
                    select: function (event, ui) {
                        wid_nc_ds_cat(ds, ui.item.value);

                        $b.click(function () {
                            wid_nc_ds_upd_categ
                                (ds.id, ui.item
                                    .value);
                            console.log(ui.item
                                .value);
                        });
                    }
                });

                $b.button();
            }

            wid_open_modal_window($obj, false, null, f);
        }
    }

    eng_nc_cat_kids(cb, g_user_id, cat_id);
}
