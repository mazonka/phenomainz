

'use strict';

var jraf = {};
jraf.vers = 0;
jraf.cb = null;

function jraf_ajax(cmd, callback, extra) {
    $.post('/','command=' + cmd)

    .done(function (data) {
        callback(data,extra);
    })

    .fail(function () {
        callback('FAIL');
    })

    .always(function () {});
}


function jraf_boot()
{
	console.log("Jraf boot: hello");
	document.write("<div id='main' style='text-align: left;'></div>");
	//$("#main").html("hello<br/>");

	var out = function(data,extra)
	{
		if( data.length > 4 && data.substr(0,3) == "OK " )
			data = data.substr(3);

		var s = $("#main").html();
		s += extra + data + '<br/>';
		$("#main").html(s);
	}

	jraf_ajax("jraf ping", out, "JRAF : ");
	jraf_ajax("jraf version client", out, "Jraf client version : ");
	jraf_ajax("jraf version backend", out, "Jraf backend version : ");

	var sysjs = function(jo)
	{
		var cb = function(data,ex)
		{
			out(ex,"ok");
			var sc = document.createElement("script");
			sc.innerHTML = data;
			document.head.append(sc);
		}
	
		for( var i in jo.kids )
		{
			var path = "/sys/"+i.name;
			jraf_read_obj(path, cb, path+" : ");
		}
	}

	jraf_read_obj("/sys", sysjs);
}

function jraf_read_obj(path, cb, extra)
{
	var par = function(data, extra2)
	{
		cb(jraf_parse_obj(data),extra2);
	}

	jraf_ajax("jraf read "+path, par, extra);
}

function jraf_parse_obj(text)
{
	console.log("jraf_parse_obj : "+text);
	return {};
}

