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

	static function file_put_contents($p,$t)
	{
		global $CWD;
		return file_put_contents($CWD.$p,$t);
	}

	function isdir()
	{
		global $CWD;
		return is_dir($CWD.$this->s);
	}

	function trymkdir()
	{
		global $CWD;
		$d = $CWD.$this->s;
		@mkdir($d,0777,TRUE);
	}

	static function del_rec($d)
	{
		global $CWD;

		if ( !is_dir($CWD.$d) )
		{
            return @unlink($d);
		}

		$files = array_diff(scandir($CWD.$d), array('.','..')); 
		foreach ($files as $f)
		{
			$rp = $CWD.$d.'/'.$f;
			if(is_dir($rp))
			{
				OsPath::del_rec($d.'/'.$f);
			}
			else
			{
				unlink($rp);
			}
	    } 
		return rmdir($CWD.$d); 
	}

    function erase(){ return OsPath::del_rec($this->s); }
    
	function size() // -> int
	{
		$n = 1;
		$pos = 0;
		while(TRUE)
		{
			$pos = strpos($this->s,'/',$pos);
			if( $pos === FALSE ) break;
			$n++; $pos++;
		}

		return $n;
	}

	/* C++
	int os::Path::size() const
	{
	    int n = 1;
	    size_t pos = 0;
	    while ( (pos = s.find( SL, pos )) != std::string::npos )
	    { n++; pos++; }
	    return n;
	}
	*/

	function strPstr($i)
	{
		$n = 0;
		$pos = 0;
		while(TRUE)
		{
			$pos = strpos($this->s,'/',$pos);
			if( $pos === FALSE ) break;
			$n++;
			if( $n > $i ) break;
			$pos++;
		}

		if ( $n == 0 || $pos === FALSE ) return $this->s;
		return substr($this->s, 0, $pos);
	}

	/* C++
    int n = 0;
    size_t pos = 0;

    while ( (pos = s.find( SL, pos )) != std::string::npos )
    {
        n++;
        if ( n > i ) break;
        pos++;
    }

    if ( n == 0 || pos == std::string::npos ) return str();
    return s.substr(0, pos);
	*/	

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
		register_shutdown_function('LockWrite_abort');
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
