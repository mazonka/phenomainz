// (C) 2016
'use strict';

function wid_init_js(){}

function wid_init_modal_window(cl, ifn, cfn)
{
    console.log('1');
    wid_fill_modal(cl, ifn, cfn);
}

function wid_close_modal_window(fn)
{
    wid_erase_modal();
    Boolean(fn) && fn();
}

function wid_upload_file()
{
    return false;
}
