// (C) 2016;


'use strict';

function eng_is_email(data) {
    return (/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,6}$/i.test(data))
     ? true
     : false;
}

function eng_get_data(data) {
    return data
        .replace(/^OK/g, '')
        .replace(/^\s|\r|\s+$/g, '')
        .split(/\s/);
}

function eng_get_b64dec_list(data) {

    data.forEach(function (item, i, arr) {
        arr[i] = window.atob(arr[i]);
    });

    return data;
}

function eng_get_b64enc_list(data) {

    data.forEach(function (item, i, arr) {
        arr[i] = window.btoa(arr[i]);
    });
/*     
    for (let i = 0, l = data.length; i < l; i++) {
        data[i] = window.btoa(data[i]);
    }
*/
 
    return data;
}

function eng_compare_lists(list, exclude) {
    return list.filter(val => !exclude.includes(val));
}

function eng_get_accordion_header(ds_id, title) {
    return ds_id + '. ' + title;
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
    9 - Read error;
     */

    reader = new FileReader();

    reader.onerror = reader.onabort = function error_handler(evt) {
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

    reader.onload = function onload_handler(data) {
        var bytes = new Uint8Array(data.target.result);
        var len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            obj.raw += String.fromCharCode(bytes[i]);
        }

        cb_main(obj);
    };

    reader.onprogress = function progress_handler(data) {
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
        .replace(/^\s+|\s+$/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n+/g, '\n')
        .replace(/\,/g, '\u0020')
        .replace(/(?!\n)\s+/g, '\u0020');

    ///console.log('after:\n' + table.data);

    row = table.data.split('\n');

    for (let i = 0, l = row.length; i < l; i++) {
        col[i] = row[i].split(' ');
        ///console.log(col[i]);

        if (i > 0 && col[i].length !== col[i - 1].length) {
            table.is_table = false;
            table.err_row = i + 1;
            break;
        }
    }

    return table;
}

function eng_get_main_response(data) {
    var resp = null;
    var msg = data.replace(/^\s+|\r|\s+$/g, '');
    var blocks = msg.split(/\s/);
    var lines = msg.split(/\n/);

    if (lines[0] === PHENOD.OK || blocks[0] === PHENOD.OK) {
        resp = PHENOD.OK;
    } else {
        resp = msg;
    }

    return resp;
}

function eng_get_parsed_profile(data) {
    var profile = {};
    profile.name = profile.email = profile.lastdate = profile.counter = '';

    data = data.split('\u0020');
    profile.name = window.atob(data[1]);
    profile.email = data[2];
    profile.lastdate = data[3];
    profile.counter = data[4];
    profile.quote = data[5];
    profile.tail = data[6] || null;

    return profile;
}

function eng_is_valid_str(data) {
    var v = /[^0-9a-zA-Z_\-\(\)\u0020\u002a]+/i;

    if (!Boolean(data)) {
        return false;
    }

    return !v.test(data);
}

function eng_get_lastdate(data) {
    var lastdate = {};
    lastdate.ok = false;
    data = data || '';

    if (typeof data !== 'string' ||
        +data === 0 ||
        data.length !== 14) {
        return lastdate;
    }

    lastdate.yyyy = data.substring(0, 4);
    lastdate.mm = data.substring(4, 6);
    lastdate.dd = data.substring(6, 8);
    lastdate.h = data.substring(8, 10);
    lastdate.m = data.substring(10, 12);
    lastdate.s = data.substring(12);

    lastdate.ok = true;

    return lastdate;
}

function eng_get_ds_list(data) {
    var list = {};

    data = eng_get_data(data);

    list.n = +data.splice(0, 1)[0];
    list.id = data.splice(0, list.n);
    list.title = eng_get_b64dec_list(data.splice(0, list.n));
    list.usage = data.splice(0, 1)[0];
    
    /// debug part
    list.tail = Boolean(data.length)
        ? data
        : null; 

    return list;
}

function eng_get_ds_get(data) {
    var ds = {};

    data = eng_get_data(data);
    ds.id = data[0];
    ds.title = window.atob(data[1]);
    ds.descr = window.atob(data[2]);

    ds.categ = [];
    data[3] = data[3].split(':').filter(Boolean);
    
    for (let i = 0, l = data[3].length/2; i < l; i++) {
        ds.categ[i] = {};
        
        ds.categ[i].id = data[3].splice(0,1)[0];
        ds.categ[i].name = window.atob(data[3].splice(0,1)[0]);
    }

    ds.categ.reverse();

    ds.kwd = data[4].split(':').filter(Boolean);
    ds.kwd = eng_get_b64dec_list(ds.kwd);
    
    return ds;
}

function eng_get_cat_path(cat) {
    var path = '\u002f';
    
    for (let i = 0, l = cat.length; i < l; i++) {
        path += (i < l - 1)
            ? cat[i].name + '\u002f'
            : cat[i].name;
    }
    
    return path;
}

function eng_get_cat_kids(data) {
    var i = 0;
    var cat = [];
    
    data = eng_get_data(data);
    data.shift();
    
    while (data.length > 0) {
        cat[i] = {};
        
        cat[i].id = data.shift();
        cat[i].name = window.atob(data.shift());
        cat[i].parent = data.shift();

        i++;
    }
    
    return cat;
}

function eng_get_keywords(data) {
    data = eng_get_data(data);
    data = data.splice(1);
    data = eng_get_b64dec_list(data);

    return data;
}

function eng_get_file_list(data) {
    var i = 0;
    var files = [];
    
    data = eng_get_data(data);
    data.shift();

    while (data.length > 0) {
        files[i] = {};
        
        files[i].id = data.shift();
        files[i].descr = window.atob(data.shift());
        
        i++;
    }
    
    return files;
}
