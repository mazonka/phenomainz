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

	function isdir(){ return is_dir($CWD.$s); }
}

$LockWrite_locked = FALSE;
$LockWrite_cwd = '';
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

	for( $i=0; $i<50; ++$i )
	{
		if( !rename($fdn,$fup) )
		{
			//echo ' '.$i.' ';
			usleep(1000*100); // 100ms
			continue;
		}

		global $LockWrite_locked, $LockWrite_cwd;
		$LockWrite_locked = TRUE;
		register_shutdown_function(LockWrite_abort);
		$cwd = getcwd();
		$LockWrite_cwd = str_replace("\\","/",$cwd);
		return TRUE;
	}

	return FALSE;
}

function LockWrite_unlock()
{
	global $LOCKD, $LOCKF_UP, $LOCKF_DN;

	$fup = $LOCKD.'/'.$LOCKF_UP;
	$fdn = $LOCKD.'/'.$LOCKF_DN;

	rename($fup,$fdn);
	global $LockWrite_locked;
	$LockWrite_locked = FALSE;
}

function LockWrite_abort()
{
	global $LockWrite_locked, $LockWrite_cwd, $LOCKD;
	if( $LockWrite_locked )
	{
		$LOCKD = $LockWrite_cwd.'/'.$LOCKD;
		echo ' LockWrite_abort ['.$LOCKD.'] ';
		LockWrite_unlock();
	}
}

?>
