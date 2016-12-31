// (C) 2016


'use strict';

function doc_write() {
    document.write(ui_write());
}

function ui_write() {
    return html_get_body();
}

function doc_init(user_id) {
    $(document).ready(function () {
        ui_init(user_id);
    });
}


function ui_init(user_id) {
    g_user_id = user_id;
    console.log(user_id);

    // $('#button_google, #button_facebook, #button_linkedin, #button_windows').hide();

    $('input, select, textarea').attr('autocomplete', 'off');

    $('#' + TD_PROFILE).hide();
    $('#' + TD_LOGIN).hide();
    $('#' + td_dslist).hide();
    $('#' + td_dsitem_create).hide();

    $('button').button();

    $('#button_user_email').prop('disabled', true);
    $('#div_modal_window').css('display', 'none');

    
    wid_nc_ping();
    
    //debug
    
    $('#cmd_prompt')
        .keydown(function(event) {
            if (Boolean(event.keyCode === 37)) {
                return false;  
            } 
            if (Boolean(event.keyCode === 38)) {
                return false;
            }
        });
        
}
