// (C) 2016


'use strict';


function wid_open_profile_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(get_html_profile_window(), false);

    dyn_obj_init($Window);
}
