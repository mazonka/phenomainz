// (C) 2016


'use strict';


function doc_write() {
    document.write(ui_write());
}


function ui_write() {
    return html_get_body();
}


function doc_init(uid) {
    $(document).ready(function () {
        ui_init(uid);
    });
}


function ui_init(uid) {
    g_uid = uid;
    console.log(uid);

    $('#button_google, #button_facebook, #button_linkedin, #button_windows').hide();
    
    $('input, select, textarea').attr('autocomplete', 'off');
    
    $('#td_profile').hide();
    $('#td_open_file').hide();
    $('#td_login').hide();

    $('button').button();

    
    $('#button_user_email').prop('disabled', true);
    $('#div_modal_window').css('display', 'none');
    
    wid_nc_ping();
}
