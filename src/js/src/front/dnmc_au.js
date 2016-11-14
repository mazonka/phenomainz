// (C) 2016


'use strict';


function wid_open_profile_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(get_html_profile_window(), false);
    dyn_obj_init($Window);
}


function wid_open_file(files, $Obj) {
    if (!Boolean(files[0])) {
        return false;
    }

    var cb_main = function (file) {
        if (file.error === null) {
            return;
        }

        if (typeof(file.error) === 'string' || !file.size) {
            return wid_modal_window(file.error);
        }

        $Obj.click(function () {
            return;
        });
        
        wid_modal_window(get_html_open_file(file), false);
    };

    var cb_progress = function (data) {
        console.log(data + '%');
    };

    eng_open_file(files, cb_main, cb_progress);
}
