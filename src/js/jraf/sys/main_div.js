// (C) 2016
'use strict';

var g_sys_loaded_file5 = 1;

function start_main()
{
    if (0) return;
    
	var $hdr = jq_get_main_hdr();
	var $adm = jq_get_main_adm();
	var $pfl = jq_get_main_pfl();
	var $dsl = jq_get_main_dsl();
	var $cli = $('<div/>');
	var $mdl = jq_get_main_mdl();
    
	//$phi.html('phi<hr/>');
	//$cli.html('cli<hr/>');

	$g_div_main.html('');
	$g_div_main.append($hdr);
	$g_div_main.append($adm.hide());
	$g_div_main.append($pfl.hide());
	$g_div_main.append($dsl);
	$g_div_main.append($cli);
	$g_div_main.append($mdl);

	start_cli($cli);
}
