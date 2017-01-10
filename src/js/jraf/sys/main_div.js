// (C) 2016
'use strict';

var g_sys_loaded_main_div = 1;

function start_main()
{
    if (0) return;
    
	var $hdr = jq_get_main_hdr();
	var $adm = jq_get_main_adm();
	var $usr = jq_get_main_usr();
	var $dsl = jq_get_main_dsl();
	var $cli = $('<div/>');
	var $pmw = jq_get_main_pmw();
    
	//$phi.html('phi<hr/>');
	//$cli.html('cli<hr/>');

	$g_div_main.html('');
	$g_div_main.append($hdr);
	$g_div_main.append($adm.hide());
	$g_div_main.append($usr.hide());
	$g_div_main.append($dsl);
	$g_div_main.append($cli);
	$g_div_main.append($pmw);
    
	start_cli($cli);
}
