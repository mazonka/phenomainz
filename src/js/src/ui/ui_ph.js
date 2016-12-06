// (C) 2016


'use strict';


function doc_ph_write() {
    document.write(ph_write());
}


function ph_write() {
    return get_html_body();
}


function doc_ph_init() {
    $(document).ready(function () {
        ph_init();
    });
}


function ph_init() {
    $('button').button();
    $('#div_modal_window').css('display', 'none');

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
    
}

