// (C) 2016


'use strict';


function doc_au_write() {
    document.write(au_write());
}


function au_write() {
    return get_html_body();
}


function doc_au_init(uid) {
    $(document).ready(function () {
        au_init(uid);
    });
}


function au_init(uid) {
    $('button').button();
    $('#div_modal_window').css('display', 'none');
    
    g_uid = uid;
    console.log(g_uid);
}
