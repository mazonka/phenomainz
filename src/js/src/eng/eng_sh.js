// (C) 2016;


'use strict';


function eng_is_email(data) {
    return (/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,6}$/i.test(data))
        ? true
        : false;
}

function eng_au_cmd(c, p, i) {
    return [p, i, c].join(' ');
}

function eng_open_file(file, cb_main, cb_progress) {
    var reader;
    var output = [];
    var obj = {};
    obj.name = file.name;
    obj.size = file.size;
    obj.type = file.type; //zip: application/x-zip-compressed
    obj.error = 0;
    obj.raw = '';
    /*
        file.error list:
        0 - no error;
        1 - no such file;
        2 - empty file;
        3 - File oversized;
        4 - File not found;
        5 - File not readable;
        6 - Read operation was aborted;
        7 - File is in a locked state;
        8 - The file is too long to encode;
        9 - Read error;
    */

    reader = new FileReader();

    reader.onerror = reader.onabort = function error_handler (evt) {
        // get window.event if evt argument missing (in IE)
        evt = evt || window.event;

        switch (evt.target.error.code) {
            case evt.target.error.NOT_FOUND_ERR:
                obj.error = 1;
                break;
            case evt.target.error.NOT_READABLE_ERR:
                obj.error = 2;
                break;
            case evt.target.error.ABORT_ERR:
                obj.error = 3;
                break;
            case evt.target.error.SECURITY_ERR:
                obj.error = 4;
                break;
            case evt.target.error.ENCODING_ERR:
                obj.error = 5;
                break;
            default:
                obj.error = 9;
        }
        console.log('error');
        cb_main(obj);
    };

    reader.onload = function onload_handler (data) {
        var bytes = new Uint8Array(data.target.result);
        var len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            obj.raw += String.fromCharCode(bytes[i]);
        }

        cb_main(obj);
    };

    reader.onprogress = function progress_handler (data) {
        if (data.lengthComputable) {
            let loaded = parseInt(((data.loaded / data.total) * 100), 10);
            cb_progress(loaded);
        }

    };

    reader.onloadstart = function () {
        //console.log('start');
    };

    reader.onloadend = function () {
        //console.log('done');
    };

    //reader.readAsArrayBuffer(file.slice(0, size_lim));
    reader.readAsArrayBuffer(file);
}


function eng_is_table(data) {
    var row = [];
    var col = [];
    var table = {};
    table.is_table = true;
    table.err_str = null;

    ///console.log('before:\n' + data);

    table.data = data
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n+/g, '\n')
        .replace(/\,/g, '\u0020')
        .replace(/(?!\n)\s+/g, '\u0020');

    ///console.log('after:\n' + table.data);

    row = table.data.split('\n');

    for (let i = 0, l = row.length; i < l; i++) {
        col[i] = row[i].split(' ');

        if (i > 0 && col[i].length !== col[i - 1].length) {
            table.is_table = false;
            table.err_row = i;
            break;
        }
    }

    return table;
}
