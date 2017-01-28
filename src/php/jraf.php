<?php

if( empty($_POST) )
{
	$auid = "0";
	if( !empty($_GET) )
	{
		foreach( $_GET as $pn => $pv )
		{
			$auid = $pn;
			break;
		}
	}

	loadPhd($auid);
	exit;
}

if(isset($_POST['command']) )
{
    $cmd = $_POST['command'];
	process($cmd);
	exit;
}

var_dump($_POST);
exit;

function loadPhd($auid)
{
	//echo "Loading Phd ".$auid;
	$file = file_get_contents("../jraf.phd");
	$file = str_replace("$$$",$auid,$file);
	echo $file;
}


function err($s)
{
	echo $s;
	exit;
}

function process($cmd)
{
	$toks = explode(" ",$cmd);
	if( empty($toks) ) err("REQ_MSG_HEAD");

	if( count($toks) == 1 ) cmd1($toks[0]);

	if( $toks[0] == "jraf" ) cmd_jraf($toks);

	//var_dump($toks);
	//echo "command: ".$cmd;
	err("REQ_MSG_BAD");
}

function ok($s)
{
	if( $s == "" ) echo "OK";
	else echo "OK ".$s;
	exit;
}

function cmd1($c)
{
	if( $c == "ping" ) ok("");
	err("REQ_MSG_BAD ".$c);
}

function cmd_jraf($toks)
{
	ok("OKK");
}

?>
