// (C) 2016


'use strict';


function doc_au_write() {
    document.write(au_write());
}


function au_write() {
    return get_html_body();
}


function doc_au_init() {
    $(document).ready(function () {
        au_init();
    });
}


function au_init() {
    $('button').button();
    $('#div_modal_window').css('display', 'none');
}
