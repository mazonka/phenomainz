var g_sys_loaded_file4 = 1;

function o(x){ console.log(x); }

function jraf_write_md(cwd,name)
{
	var cb = function(msg)
	{
		o("AAA jraf_write_md CB");
		o(msg);
	}

	var path = cwd.str()+'/'+name;
	jraf_write_obj('md '+path, cb);
}


function jraf_write_obj(cmd, cb, extra)
{
    var parser = function(data, ext)
    {
        ext.cb(jraf_parse_wrt(data),ext.ex);
    }

    var ex = {};
    ex.ex = extra;
    ex.cb = cb;
    jraf_ajax("jraf au " + g_session+' ' + cmd, parser, ex);
}

function jraf_parse_wrt(data)
{
	data = data.trim();
	var a = data.split(' ');
	var r = { err: '' };
	if( a[0] != "OK" )
	{
	    console.log("Bad backend reply");
	    return { err: data };
	}

	o("AAA jraf_parse_wrt");
	o(data);
	return data;
}

