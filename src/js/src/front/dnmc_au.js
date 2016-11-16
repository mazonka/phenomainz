// (C) 2016


'use strict';


function wid_open_profile_window() {
    var $Window = $('#div_modal_window');

    wid_modal_window(get_html_profile_window(), false);
    dyn_obj_init($Window);
}


function wid_open_file(files, $Obj) {
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
            return wid_modal_window(MSG.FILE_READ_ERROR, true);
        }

        table = eng_is_table(file.raw);

        if (!table.is_table) {
            return wid_modal_window(MSG.TABLE_ERROR + table.err_row, true);
        }
        ///console.log(file);
        
        wid_file_is_open(true);
        
        $Obj.click(function () {
            return wid_file_is_open(false);
        });

        wid_modal_window(get_html_open_file(file), false);
    };

    var cb_progress = function (data) {
        console.log(data + '%');
    };

    file = files[0];

    if (file.size > G_MAX_FILE_SIZE ) {
        return wid_modal_window(MSG.FILE_IS_HUGE, true);
    }

    if (file.size === 0) {
        return wid_modal_window(MSG.FILE_IS_EMPTY, true);
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
