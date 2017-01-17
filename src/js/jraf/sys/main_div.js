// (C) 2016
'use strict';

function main_div_js(){}
var g_sys_loaded_main_div = 1;
var g_sid = g_session;

function start_main()
{
    if (0) return;
    
	var $hdr = jq_get_main_hdr();
	var $adm = jq_get_main_adm();
	var $pfl = jq_get_main_pfl();
	var $dsl = jq_get_main_dsl();
	var $brs = jq_get_main_brs();
	var $cli = $('<div/>');
	var $pmw = jq_get_main_pmw();

	$g_div_main.html('');
	$g_div_main.append($hdr);
	$g_div_main.append($adm.hide());
	$g_div_main.append($pfl.hide());
	$g_div_main.append($dsl.hide());
	$g_div_main.append($brs);
	$g_div_main.append($cli);
	$g_div_main.append($pmw.hide());
    
	start_cli($cli);
    
    wid_nc_profile();
}
