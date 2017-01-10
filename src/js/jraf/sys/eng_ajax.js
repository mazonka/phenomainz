// (C) 2016
'use strict';

var g_sys_loaded_eng_ajax = 1;

function ajx_send_command(cmd, callback, progress)
{
    progress.wait();
    cmd = cmd.replace(/\u0025/g, '%25');

    $.post(
        '/',
        'command=' + cmd,
        setTimeout(function(data) {}, 5000))

    .done(function(data)
    {
        callback(data);
        progress.done();
    })

    .fail(function()
    {
        callback('FAIL');
        progress.fail();
    })

    .always(function() {});
}
