// (C) 2016


'use strict';


function doc_write() {
    document.write(ui_write());
}


function ui_write() {
    return get_html_body();
}


function doc_init(uid) {
    $(document).ready(function () {
        ui_init(uid);
    });
}


function ui_init(uid) {
    g_uid = uid;
    console.log(uid);
    
    $('#td_profile').hide();
    $('#td_open_file').hide();
    $('#td_login').hide();

    $('button').button();
    $('#button_user_email').prop('disabled', true);
    $('#div_modal_window').css('display', 'none');
    
    
    wid_nc_ping();
}
