// (C) 2016

'use strict';


function doc_main_write() {
    document.write(doc_main());
}

function doc_main_init() {
    $(document).ready(function () {
        doc_init();
    });
}

function doc_init() {
}

function doc_main() {
    return wid_get_html_body();
}
