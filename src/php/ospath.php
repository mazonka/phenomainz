<?php

$CWD = '../';

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
?>
