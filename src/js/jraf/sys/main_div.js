// (C) 2016
'use strict';

var g_sys_loaded_main_div = 1;
var g_sid = g_session;

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
    
//
    console.log(g_session);

/* 
    $('#button_google, #button_facebook, #button_linkedin, #button_windows')
        .hide();
*/
    $('input, select, textarea').attr('autocomplete', 'off');

    $('#' + TD_PROFILE).hide();
    $('#' + TD_LOGIN).hide();
    $('#' + TD_DSLIST).hide();
    $('#' + TD_DSITEM_CREATE).hide();

    $('button').button();

    $('#button_user_email').prop('disabled', true);
    $('#div_main_pwm').css('display', 'none');

    wid_nc_ping();

    //debug

    $('#cmd_prompt')
        .keydown(function(event)
        {
            if (Boolean(event.keyCode === 37)) return false;
            if (Boolean(event.keyCode === 38)) return false;
        });    
}
