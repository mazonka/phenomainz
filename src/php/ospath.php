<?php

$CWD = '../';

$LOCKD = 'jphp_lock';
$LOCKF_UP = 'jphp.up';
$LOCKF_DN = 'jphp.dn';

class OsPath
{
	public $s = '';
	function __construct($p){ $this->s = $p; }

	function plus_s($x)
	{ 
		$t = clone $this;
		$t->add_s($x);
		return $t;
	}              

	function add_s($ps)
	{ 
		//$ps = $p->s;
		if( $this->s == '' )
		{
			$this->s = $ps;
			return;
		}

		if( $ps == '' ) return;

        if ( substr($ps,0,1) == '/' )
        {
            if ( strlen($ps) > 1 )
                $this->s .= $ps;
        }
        else
		
            $this->s .= '/' . $ps;
	}

	static function file_get_contents($p)
	{
		global $CWD;
		return @file_get_contents($CWD.$p);
	}
}

function LockWrite_lock()
{
	global $LOCKD, $LOCKF_UP, $LOCKF_DN;

	$fup = $LOCKD.'/'.$LOCKF_UP;
	$fdn = $LOCKD.'/'.$LOCKF_DN;

	if( !is_dir($LOCKD) )
	{
		mkdir($LOCKD);
		if( !is_dir($LOCKD) ) die("Cannot create ".$LOCKD);
		file_put_contents($fdn,'z');
	}

	for( $i=0; $i<10; ++$i )
	{
		if( rename($fdn,$fup) ) return TRUE;
		echo ' '.$i.' ';
		usleep(1000*100); // 100ms
	}

	return FALSE;
}

function LockWrite_unlock()
{
	global $LOCKD, $LOCKF_UP, $LOCKF_DN;

	$fup = $LOCKD.'/'.$LOCKF_UP;
	$fdn = $LOCKD.'/'.$LOCKF_DN;

	rename($fup,$fdn);
}

?>
