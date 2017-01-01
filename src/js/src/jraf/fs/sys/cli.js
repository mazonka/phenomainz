var g_sys_loaded_file1 = 1;

var $g_div_cli;
var $g_input, $g_output, $g_edit;
var g_cli_commands;

function start_cli()
{
	$g_div_cli = $g_div_main;
	//$g_div_cli.html("hello cli");

	cli_build_commands();

	$g_div_cli.html(cli_build_area());

	$g_input.keydown(function(e){ return cli_keycode(e.keyCode); });

	///cli_keycode(13);
	$g_input.html(cli_prompt());
	$g_input.focus();
}

function cli_build_area()
{
	var tbl = $('<table/>', { border: '1', width: '100%' } );
	var tr = $('<tr/>');
	var td1 = $('<td/>', { width: '50%' } );
	var td2 = $('<td/>');

	td1.html(cli_build_left());
	td2.html(cli_build_right());

	tbl.append(tr);
	tr.append(td1);
	tr.append(td2);

	return tbl;
}

function cli_build_left()
{
	var d0 = $('<div/>');
	var d1 = $('<div/>');
	var d2 = $('<div/>');

	d0.append(d1);
	d0.append(d2);

	d1.html(cli_build_input());
	d2.html(cli_build_output());

	return d0;
}

function cli_build_right()
{
	var d0 = $('<div/>');
	var d1 = $('<div/>');

	d0.append(d1);

	d1.html(cli_build_edit());

	return d0;
}

function cli_build_input()
{
	$g_input = $('<textarea/>',{ width: '95%', height:'10em'});
	return $g_input;
}

function cli_build_output()
{
	$g_output = $('<textarea/>',{ width: '95%', height:'10em'});
	return $g_output;
}

function cli_build_edit()
{
	$g_edit = $('<textarea/>',{ width: '95%', height:'21em'});
	return $g_edit;
}

function cli_keycode(x)
{

	var ret = true;
	if( x==38 || x==40 || x==13 ) ret = false;
	//console.log(x);

	var $o = $g_input; // jQ
	var o = $g_input[0]; // dom

	if( x==13 )
	{
		var cmd = cli_extract_command(o.value);
		var out = cli_execute_command(cmd);
		if( out.length > 0 && out[out.length-1] != '\n' ) out += '\n';
		///console.log("out=["+out+"]");
		///console.log("prm=["+cli_prompt()+"]");
		o.value += '\n'+out+cli_prompt();
	}

	if(!ret)
	{
		$g_input.focus();
		var o = $g_input[0];
		var i = o.value.length;
		o.setSelectionRange(i,i);
		o.scrollTop = o.scrollHeight;
	}

	return ret;
}

function cli_prompt()
{
	return '> ';
}

function cli_extract_command(text)
{
	var t, i = text.lastIndexOf('\n');
	if( i == -1 ) t = text;
	else t = text.substr(i+1);
	///console.log("AAA1 "+t);
	i = t.indexOf('> ');
	if( i == -1 || i+3 > t.length ) return '';
	var r = t.substr(i+2);
	///console.log("AAA2 "+r);
	return r;
}

function cli_execute_command(cmd)
{
	if( cmd.length == 0 ) return '';
	var c = cmd.split(' ');
	c = c.filter( function(x){ return x.length>0; } );
	if( c.length < 1 ) return '';

	if( c[0] in g_cli_commands )
	{
		return g_cli_commands[c[0]].run(c);
	}

	return 'unknown command ['+c[0]+'], try \'help\'';
}


function cli_build_commands()
{
	g_cli_commands = {};

	var help_help = function()
	{
		return "help: prints help page\n";
	};

	var help_run = function(c)
	{
		var r = '';
		if(c.length<2) 
		{
			for( var i in g_cli_commands )
			{
				r += g_cli_commands[i].help();
			}
			return r;
		}

		for( var i=1; i<c.length; i++ )
		{
			if( c[i] in g_cli_commands )
				r += g_cli_commands[c[i]].help();
			else
				r += '['+c[i]+'] - not a valid command';
		}
		return r;
	};

	g_cli_commands.help = { help : help_help, run : help_run };

	var cls_help = function()	
	{
		return 'cls [argument]: clear area\n'
			+ '\tcls in: clear command area (default)\n'
			+ '\tcls out: clear output area\n'
			+ '\tcls edit: clear editor area\n';
	}

	var cls_run = function(c)
	{
		var ar = 'in';
		if( c.length > 1 ) ar = c[1];
		if( ar == 'in' ){ $g_input[0].value='';  }
		else if( ar == 'out' ){ $g_output[0].value = ''; }
		else if( ar == 'edit' ){ $g_edit[0].value = ''; }
		else return 'use in/out/edit';
		return '';
	}

	g_cli_commands.cls = { help : cls_help, run : cls_run };
}

