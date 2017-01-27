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
	//echo "Loading Phd ".$auid;
}

function process($cmd)
{
	echo "command: ".$cmd;
}

?>
