// (C) 2016;


'use strict';


function is_email(data) {
    return (/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,6}$/i.test(data))
        ? true
        : false;
}

function eng_au_cmd(c, p, i) {
    return [p, i, c].join(' ');
}

function eng_open_file(files, cb, progress_cb) {
    var output = [];
    var file = files[0];
    var obj = {};
    var reader;
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
    if (file) {
        obj.name = file.name;
        obj.size = file.size;
        obj.type = file.type; //zip: application/x-zip-compressed
        obj.error = 0;
    } else {
        obj.error = 1;
        return cb(obj);
    }

    reader = new FileReader();
    reader.readAsArrayBuffer(file);
    
    reader.onerror = reader.onabort = function (evt) {
        // get window.event if evt argument missing (in IE)
        evt = evt || window.event;

        switch (evt.target.error.code) {
            case evt.target.error.NOT_FOUND_ERR:
                obj.error = 4;
                break;
            case evt.target.error.NOT_READABLE_ERR:
                obj.error = 5;
                break;
            case evt.target.error.ABORT_ERR:
                obj.error = 6;
                break;
            case evt.target.error.SECURITY_ERR:
                obj.error = 7;
                break;
            case evt.target.error.ENCODING_ERR:
                obj.error = 8;
                break;
            default:
                obj.error = 9;
        }

        cb(obj);
    };
    
    reader.onload = function onload_handler(evt) {
        var bytes = new Uint8Array(evt.target.result);
        var len = bytes.byteLength;
        obj.raw = '';
    
        if (len === 0) {
            obj.error = 2;
        } else if (len > 20000000) {
            obj.error = 3;
        } else {
            for (let i = 0; i < len; i++) {
                obj.raw += String.fromCharCode(bytes[i]);
            }
        }

        cb(obj);
    };
    
    reader.onprogress = function progress_handler(evt) {
        // evt is an ProgressEvent;
        if (evt.lengthComputable) {
            let percent_loaded = Math.round((evt.loaded / evt.total) * 100);
            if (percent_loaded < 100) {
                progress_cb(+percent_loaded);
                console.log(percent_loaded);
            } else {
                console.log('Done');
            }
        }

    };
    
    reader.onloadstart = function () {
        //console.log('start');
    };

    reader.onloadend = function () {
        //console.log('done');
    };
}
