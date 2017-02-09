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
        clearstatcache();
        return @file_get_contents($CWD.$p);
    }

    function file_get(){ return OsPath::file_get_contents($this->s); }

    static function file_put_contents($p,$t,$f)
    {
        global $CWD;
        if ( $f == 0) $r = @file_put_contents($CWD.$p, $t);
        if ( $f == 1) $r = @file_put_contents($CWD.$p, $t, FILE_APPEND);
        clearstatcache();
        return $r;
    }

    static function rename($f1,$f2)
    {
        global $CWD;
        $r = @rename($CWD.$f1,$CWD.$f2);
        clearstatcache();
        return $r;
    }

    function isdir()
    {
        global $CWD;
        clearstatcache();
        return is_dir($CWD.$this->s);
    }

    function isfile()
    {
        global $CWD;
        clearstatcache();
        return is_file($CWD.$this->s);
    }

    function file_size()
    {
        global $CWD;
        clearstatcache();
        if ( !file_exists($CWD.$this->s) ) return 0;
        $sz = filesize($CWD.$this->s);
        return $sz;
    }

    function trymkdir()
    {
        global $CWD;
        $d = $CWD.$this->s;
        @mkdir($d,0777,true);
        clearstatcache();
    }

    static function del_rec($pth)
    {
        global $CWD;

        $tp = $CWD.$pth;

        if ( !is_dir($tp) )
        {
            return @unlink($tp);
            clearstatcache();
        }

        $files = array_diff(scandir($CWD.$pth), array('.','..'));
        foreach ($files as $f)
        {
            $rp = $tp.'/'.$f;
            if(is_dir($rp))
            {
                OsPath::del_rec($pth.'/'.$f);
            }
            else
            {
                unlink($rp);
                clearstatcache();
            }
        }
        $r = rmdir($tp);
        clearstatcache();
        return $r;
    }

    function erase(){ return OsPath::del_rec($this->s); }

    function size() // -> int
    {
        $n = 1;
        $pos = 0;
        while(true)
        {
            $pos = strpos($this->s,'/',$pos);
            if( $pos === false ) break;
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
        while(true)
        {
            $pos = strpos($this->s,'/',$pos);
            if( $pos === false ) break;
            $n++;
            if( $n > $i ) break;
            $pos++;
        }

        if ( $n == 0 || $pos === false ) return $this->s;
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

    function readDirectory()
    {
        global $CWD;

        $dirs = array();
        $fils = array();

        $d = $this->s;

        $entries = array_diff(scandir($CWD.$d), array('.','..'));

        foreach ($entries as $e)
        {
            $rp = $CWD.$d.'/'.$e;
            if(is_dir($rp))
            {
                $dirs[] = $e;
            }
            else
            {
                $fils[] = array (  $e, filesize($rp) );
            }
        }

        return array ( $dirs, $fils );
    }

	function howold()
	{
        global $CWD;
        clearstatcache();
        return time()-@filemtime($CWD.$this->s);
	}
}

$LockWrite_locked = false;
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
        clearstatcache();

        global $LockWrite_locked, $LockWrite_cwd;
        $LockWrite_locked = true;
        register_shutdown_function('LockWrite_abort');
        $cwd = getcwd();
        $LockWrite_cwd = str_replace("\\","/",$cwd);
        return true;
    }

    return false;
}

function LockWrite_unlock()
{
    global $LOCKD, $LOCKF_UP, $LOCKF_DN;

    $fup = $LOCKD.'/'.$LOCKF_UP;
    $fdn = $LOCKD.'/'.$LOCKF_DN;

    rename($fup,$fdn);
    clearstatcache();
    global $LockWrite_locked;
    $LockWrite_locked = false;
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
