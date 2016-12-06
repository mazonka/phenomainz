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
    console.log(g_uid);
    
    if (g_uid == 0) {
        $('#td_profile').hide();
        $('#td_open_file').hide();
        $('#td_login').show();

        hello.init(
            {
                facebook: FACEBOOK_CLIENT_ID,
                windows: WINDOWS_CLIENT_ID,
                google: GOOGLE_CLIENT_ID,
                linkedin: LINKEDIN_CLIENT_ID
            }, 
            {
                redirect_uri: 'redirect.html'
                //redirect_uri: ''
            }
        );          
    } else {
        $('#td_profile').show();
        $('#td_open_file').show();
        $('#td_login').hide();
    }
    
    $('button').button();
    $('#button_send_email').prop('disabled', true);
    $('#div_modal_window').css('display', 'none');
    
  
}
