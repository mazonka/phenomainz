<?php
class OsPath
{
	public $s;
	function __construct($p){ $this->s = $p; }

	function plus($x)
	{ 
		$t = clone $this;
		$t->add($x);
		return $t;
	}

	function add($p)
	{ 
		$ps = $p->s;
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

	//static function file2str($p){}
}
?>
