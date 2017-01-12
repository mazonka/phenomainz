// (C) 2016;
'use strict';

function eng_is_email(data)
{
    return (/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,6}$/i.test(data)) ? true :
        false;
}

function eng_get_b64dec_list(data)
{

    data.forEach(function(item, i, arr)
    {
        arr[i] = window.atob(arr[i]);
    });

    return data;
}

function eng_get_b64enc_list(data)
{

    data.forEach(function(item, i, arr)
    {
        arr[i] = window.btoa(arr[i]);
    });

    return data;
}

function eng_compare_lists(list, exclude)
{
    return list.filter(val => !exclude.includes(val));
}

function eng_get_accordion_header(did, title)
{
    return did + '. ' + title;
}

function eng_open_file(file, ext_cb, ext_progress, ext_done)
{
    var obj = {
        name: file.name,
        size: file.size,
        type: file.type,
        error: 0,
        raw: ''
    };

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
    var reader = new FileReader();

    reader.onerror = reader.onabort = function error_handler(evt)
    {
        // get window.event if evt argument missing (in IE)
        evt = evt || window.event;

        switch (evt.target.error.code)
        {
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
        //debug
        console.log('error:' + obj.error);
        ext_cb(obj);
    };

    reader.onload = function onload_handler(data)
    {
        var bytes = new Uint8Array(data.target.result);

        for (let i = 0, len = bytes.byteLength; i < len; i++)
            obj.raw += String.fromCharCode(bytes[i]);

        ext_cb(obj);
    };

    reader.onprogress = function progress_handler(data)
    {
        if (data.lengthComputable)
        {
            let loaded = parseInt(((data.loaded / data.total) * 100),10);
            ext_progress(loaded);
        }
    };

    reader.onloadstart = function()
    {
        ext_done(false);
    };

    reader.onloadend = function()
    {
        ext_done(true);
    };

    //reader.readAsArrayBuffer(file.slice(0, size_lim));
    reader.readAsArrayBuffer(file);
}

function eng_is_table(data)
{
    var row = [];
    var col = [];
    var table = {};

    table.is_table = true;
    table.err_str = null;

    table.data = data
        .replace(/^\s+|\s+$/g, '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .replace(/\n+/g, '\n')
        .replace(/\,/g, '\u0020')
        .replace(/(?!\n)\s+/g, '\u0020');

    row = table.data.split('\n');

    for (let i = 0, l = row.length; i < l; i++)
    {
        col.push(row[i].split(' '));

        if (i > 0 && col[i].length !== col[i - 1].length)
        {
            table.is_table = false;
            table.err_row = i + 1;

            break;
        }
    }

    return table;
}


function eng_get_data(data)
{
    var _data = data.split(' + ');

    _data.forEach(function(item, i, arr)
    {
        arr[i] = arr[i]
            .replace(/^OK|^REQ_MSG_BAD.*|^AUTH.*/g, '')
            .replace(/^\s|\r|\s+$/g, '')
            .split(/\s/);
            
        arr[i] = arr[i].filter(
            function(el)
            { 
                if (el.length > 0) return el;
            });
    });
    // ?FIX
    _data = _data.filter(
        function(el)
        { 
            if (el.length > 0) return el;
        });
    
    if (_data.length === 0) _data = null;

    return _data;
}

function eng_get_resp_gist(data)
{
    var _data = data.split(' + ');
    
    _data.forEach(function(item, i, arr)
    {
        arr[i] = arr[i]
            .replace(/^\s+|\r|\s+$/g, '')
            .split('\u0020');

        arr[i] = arr[i].shift();
    });

    return _data;
}

function eng_get_parsed_profile(data)
{
    var profile = {};
    var _data = data;

    if (!Boolean(_data)) return null;
    if (_data.length != 5) return null;

    profile.name = window.atob(_data.shift());
    profile.email = _data.shift();
    profile.lastdate = _data.shift();
    profile.counter = _data.shift();
    profile.quote = +_data.shift();
    profile.tail = _data.shift() || null;

    return profile;
}

function eng_is_valid_str(data)
{
    var v = /[^0-9a-zA-Z_\-\(\)\u0020\u002a]+/i;

    if (!Boolean(data)) return false;

    return !v.test(data);
}

function eng_get_lastdate(data)
{
    var lastdate = {};
    lastdate.ok = false;
    data = data || '';

    if (typeof data !== 'string' ||
        +data === 0 ||
        data.length !== 14)
    {
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

function eng_get_ds_list(data)
{
    var list = {};
    var _data = data;

    if (!Boolean(_data)) return null;
    
    list.n = +_data.shift();
    list.id = _data.splice(0, list.n);
    list.title = eng_get_b64dec_list(_data.splice(0, list.n));
    list.usage = +_data.shift();

    return list;
}

function eng_get_ds_get(data)
{
    var ds = {};
    var _data = data;

    ds.id = _data[0];
    ds.title = window.atob(_data[1]);
    ds.descr = window.atob(_data[2]);

    ds.categ = [];
    _data[3] = _data[3].split(':').filter(Boolean);

    for (let i = 0, l = _data[3].length / 2; i < l; i++)
    {
        ds.categ[i] = {};

        ds.categ[i].id = _data[3].shift();
        ds.categ[i].name = window.atob(_data[3].shift());
    }

    ds.categ.reverse();

    ds.kwd = _data[4].split(':').filter(Boolean);
    ds.kwd = eng_get_b64dec_list(ds.kwd);

    return ds;
}

function eng_get_cat_path(cat)
{
    var path = '\u002f';

    for (let i = 0, l = cat.length; i < l; i++)
        path += (i < l - 1) ? cat[i].name + '\u002f' : cat[i].name;

    return path;
}

function eng_get_cat_kids(data)
{
    var i = 0;
    var cat = [];
    var _data = data;

    _data.shift();

    while (_data.length > 0)
    {
        cat.push(
        {
            id: _data.shift(),
            name: window.atob(_data.shift()),
            parent: _data.shift()
        });

        i++;
    }

    return cat;
}

function eng_get_keywords(data)
{
    var _data = data;
    
    _data.shift();
    _data = eng_get_b64dec_list(_data);

    return _data;
}

function eng_get_file_list(data)
{
    var i = 0;
    var ls = [];
    var _data = data;

    _data.shift();

    while (_data.length > 0)
    {
        ls.push(
        {
            id: _data.shift(),
            descr: window.atob(_data.shift()),
            size: +_data.shift()
        });

        i++;
    }

    return ls;
}

function eng_get_file_new_id(data)
{
    var _data = data;

    return _data[0];
}

function eng_get_file_put(data)
{
    var _data = data;

    return +_data[0];
}

function eng_get_file_getdescr(data)
{
    var _data = data;
    var descr = window.atob(_data.shift());
    
    return descr;
}