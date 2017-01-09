var g_sys_loaded_file5 = 1;

function start_main()
{
	var $phi = $('<div/>');
	var $cli = $('<div/>');

	$phi.html('phi<hr/>');
	//$cli.html('cli<hr/>');

	$g_div_main.html("");
	$g_div_main.append($phi);
	$g_div_main.append($cli);

	start_cli($cli);
}
