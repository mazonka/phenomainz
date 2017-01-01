var g_sys_loaded_file1 = 1;

var $g_div_cli;

var $g_input, $g_output, $g_edit;

function start_cli()
{
	$g_div_cli = $g_div_main;
	//$g_div_cli.html("hello cli");

	$g_div_cli.html(cli_build_area());

	$g_input.keydown(function(e){ return cli_keycode(e.keyCode); });

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

	console.log(x);
	return ret;
}

