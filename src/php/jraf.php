<?php
error_reporting(-1);
require 'ospath.php';

$root_dir = 'jraf';
$be_version = '10420';
$sys_name = '.jraf.sys';
$ver_name = '.jraf.ver';
$users_dir = 'users';
$login_dir = 'login';
$home_dir = 'home';
$thisload = 'jraf.php?';
$dateset = '';

// encoding section
$skc_seed = ''.rand().time();
$skc_salt = '';
$skc_ivec = '';
$j_nonce = '';
function hashHex($x){ return hash('sha256',$x,false); }
function hex16($x){ return substr(hashHex($x),0,16); }
function j_anonce(){ global $skc_salt; return hex16($skc_salt); }
function skc_init()
{
    global $skc_seed, $skc_salt, $skc_ivec;
    $skc_ivec = hashHex($skc_seed);
    $skc_salt = hashHex($skc_ivec . $skc_seed);
}
skc_init();
// end of encoding section

if( empty($_POST) )
{
    $auid = '0';
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

    $test = false;
    if( isset($_GET['test']) && $_GET['test']=='test' ) $test = true;

    if( !$test ) jprocess($cmd);
    else
    {
        global $root_dir, $skc_seed, $thisload;

        $root_dir = 'wroot';

        $skc_seed = '1';
        skc_init();

        $thisload = 'jraf?';
        $dateset = '20170123123456';
        
        jprocess($cmd);
    }

    exit;
}

var_dump($_POST);
exit;

// no call to exit beyond this point

function loadPhd($auid)
{
    $file = OsPath::file_get_contents('jraf.phd');
    $file = str_replace('$$$',$auid,$file);
    echo $file;
}


function jprocess($cmd) // void
{
    $toks = explode(' ',$cmd);
    if( empty($toks) ){ echo('REQ_MSG_HEAD'); return; }
    if( count($toks) < 1 ){ echo('REQ_MSG_HEAD'); return; }
    
    ///if( $toks[0] == 'jraf' ){ echo_jraf_req($toks, true); return; }
    if( $toks[0] == 'jr' || $toks[0] == 'jw' )
    { 
        echo_jraf_req($toks, $toks[0] == 'jw'); 
        return;
    }
    if( $toks[0] == 'reseed' ){ echook(); return; }

    if( count($toks) < 2 ){ cmd1($toks[0]); return; }

    //var_dump($toks);
    echo 'REQ_MSG_BAD '.$cmd;
}

function echook($s)
{
    if( $s == '' ) echo 'OK';
    else echo 'OK '.$s;
}

function cmd1($c)
{
    if(0){}

    else if( $c == 'ping' ) echook('');
    else
    echo 'REQ_MSG_BAD '.$c;
}

class Cmdr
{
    public $s;
    public $b;

    function __construct($m,$x){ $this->s = $m; $this->b = $x; }

    function add($c){ $this->s .= $c->s; $this->b &= $c->b; }
}

class Token
{
    public $index;
    public $ref;

    function __construct($arr)
    {
        $this->index = 0;
        $this->ref = $arr;
    }

    function next()
    {
        if( ++$this->index >= count($this->ref) ) return 0;
        return 1;
    }

    function sub(){ return $this->ref[$this->index]; }
}

class User
{
    public $su;
    public $auth;
    public $email, $last, $cntr;
    public $quotaKb, $uname;

    function __construct($a,$b)
    {
        $this->su = $a;
        $this->auth = $b;
    }
}

function jbad(){ return new Cmdr('REQ_MSG_BAD', 0); }
function jok1(){ return new Cmdr('OK', 1); }
function jok2($s){ return new Cmdr('OK '.$s, 1); }
function jerr($s){ return new Cmdr('JRAF_ERR '.$s, 0); }
function jfail($s){ return new Cmdr('JRAF_FAIL '.$s, 0); }
function jauth(){ return new Cmdr('AUTH', 0); }

function echo_jraf_req($tokarr, $jw){ echo jraf_request($tokarr, $jw); }
///function echo_jraf_req2($tokarr, $jw){ echo jraf_request($tokarr, $jw); }

function jraf_request($tokarr, $jw)
{
    global $be_version;

    $tok = new Token($tokarr); ///return var_dump($tok);
    $result = new Cmdr('',1);

    while(1)
    {
        if ( $tok->next() == 0 ) return jbad()->s;
        $cmd = $tok->sub();

        if ( $cmd == 'ping' ) $result->add(jok1());

        else if ( $cmd == 'version' )
        {
            if ( !$tok->next() ) $result -> add( jbad() );
            else
            {
                $w = $tok->sub();
                if ( $w == 'backend' ) $result -> add( jok2($be_version) );
                else if ( $w == 'client' ) $result -> add( Jraf_client_version() );
                else $result -> add( jbad() );
            }
        }

        else if ( in_array($cmd, array('login', 'logout')) && $jw )
        {
            if( !LockWrite_lock() ) $result -> add( jfail('busy') );
            else
            {
                $result -> add( Jraf_login($tok, $cmd == 'login') );
                LockWrite_unlock();
            }
        }

        else if ( in_array($cmd, array('md', 'rm', 'put', 'save', 'mv')) && $jw )
        {
            if ( !$tok->next() ) return jerr('session id')->s;

            $sess = $tok->sub();
            $usr = Jraf_user($sess);

            if( !$usr->auth )
            {
                $result->add( jauth());
                return $result->s;
            }

            $pth = '';
            $er = Jraf_read_tok_path($tok, $pth, $usr, false);

            if ( !$er->b ) return $result->s . $er->s;
            
            if( !LockWrite_lock() ) $result -> add( jfail('busy') );
            else
            {
                $result -> add( Jraf_aurequest($tok, $pth, $usr, $cmd) );
                LockWrite_unlock();
            }
        }

        else if ( $cmd == 'read' || $cmd == 'get' )
        {
            if ( !$tok->next() ) return jerr('session id')->s;

            $sess = $tok->sub();
            $usr = Jraf_user($sess);

            if( !$usr->auth )
            {
                $result->add( jauth());
                return $result->s;
            }

            $pth = '';
            $er = Jraf_read_tok_path($tok, $pth, $usr, false);

            if ( !$er->b ) return $result->s . $er->s;

            $result -> add( Jraf_read_obj($pth, $cmd == 'get', $usr) );
        }
        
        else if ( $cmd == 'profile' )
        {
            if ( !$tok->next() ) return jerr('session id')->s;

            $sess = $tok->sub();
            $usr = Jraf_user($sess);

            if ( !$usr->auth )
            { 
                $result->add( jauth() ); 
                return $result->s; 
            }

            $result->add( Jraf_profile($usr) );
        }
        
        else
        {
            $result -> add( jerr('bad command [' . $cmd . ']') );
            break;
        }

        if ( $result->b == 0 ) break;
        if ( $tok->next() == 0 ) break;
        $ts = $tok->sub();
        if ( $ts != ':' ) return $result->s . ' : ' . jerr('[' . $ts . ']')->s;

        $result->s .= ' : ';
    }

    if ( $result->s == '' ) return jbad()->s;

    return $result->s;
}

function Jraf_client_version()
{
    $p = Jraf_sys_dir() -> plus_s('version');
    ///$ps = $p->s;
    ///$fever = OsPath::file_get_contents($ps);
    $fever = $p->file_get();

    if ( $fever === false || $fever == '' ) 
    return jerr('no file system found [' . $p->s . ']');

    return jok2($fever);
}

function Jraf_sys_dir()
{
    global $sys_name;
    return Jraf_root($sys_name);
}

function Jraf_ver_dir()
{
    global $ver_name;
    return Jraf_root($ver_name);
}

function Jraf_root($s)
{
    global $root_dir;
    $r = new OsPath($root_dir);
    $r->add_s($s);
    return $r;
}

function Jraf_users_dir()
{
    global $users_dir;
    return Jraf_sys_dir()->plus_s($users_dir);
}

function Jraf_login_dir()
{
    global $login_dir;
    return Jraf_sys_dir()->plus_s($login_dir);
}

function Jraf_home_dir()
{
    global $home_dir;
    return Jraf_root($home_dir);
}

function Jraf_aurequest($tok, $pth, $usr, $cmd)
{
    // if ( !$tok->next() ) return jerr('session id');
    // $sess = $tok->sub();

    // $usr = Jraf_user($sess);
    // if( !$usr->auth ) return jauth();

    // if ( !$tok->next() ) return jerr('command');
    // $cmd = $tok->sub();

    // $pth = '';
    // $er = Jraf_read_tok_path($tok, $pth, $usr, true);
    // if ( !$er->b ) return $er;

    if (0) {}

    else if ( $cmd == 'md') return Jraf_aureq_md($pth);
    else if ( $cmd == 'rm') return Jraf_aureq_rm($pth);
    else if ( $cmd == 'put' ) return Jraf_aureq_put($tok, $pth, true);
    else if ( $cmd == 'save' ) return Jraf_aureq_put($tok, $pth, false);
    else if ( $cmd == 'mv' )
    {
        $pto = '';
        $er = Jraf_read_tok_path($tok, $pto, $usr, true);
        if ( !$er->b ) return $er;
        return Jraf_aureq_mv($pth, $pto);
    }

    return jerr('command [' . $cmd . '] unknown');
}

function Jraf_aureq_md($pth)
{
    $p = Jraf_root($pth);
    if ( $p->isdir() ) return jok2($pth);
    $p->trymkdir();
    if ( !$p->isdir() ) return jfail('md ' . $pth);
    Jraf_update_ver($pth);
    return jok2($pth);
}

function Jraf_aureq_rm($pth)
{
    $p = Jraf_root($pth);
    $p->erase();
    if ( $p->isdir() || $p->isfile() ) return jfail('rm ' . $pth);
    Jraf_update_ver($pth);
    return jok2($pth);
}

function Jraf_aureq_put($tok, $pth, $append)
{
    $pos = -1;
    if ( $append )
    {
        if ( !$tok->next() ) return jerr('position');
        $pos = intval($tok->sub());
    }

    if ( !$tok->next() ) return jerr('size');
    $siz = intval($tok->sub());

    $text = '';
    if ( $siz )
    {
        if( !$tok->next() ) return jerr('text');
        $text = base64_decode($tok->sub());
    }

    if ( strlen($text) != $siz ) return jerr('size mismatch' . ' ' . $text);

    $f = Jraf_root($pth);

    if ( !$f->isfile() ) { OsPath::file_put_contents($f->s,'',0); }
    if ( !$f->isfile() ) return jfail('cannot create ' . $pth);

    $fsz = $f->file_size();

    if ( $append )
    {
        if ( $fsz != $pos ) return jfail(strval($fsz));
        OsPath::file_put_contents($f->s, $text, 1);
    }
    else
    OsPath::file_put_contents($f->s, $text, 0);

    Jraf_update_ver($pth);

    return jok2($f->file_size());
}

function Jraf_read_tok_path($tok, &$pth, $su, $wr)
{
    if ( !$tok->next() ) return jerr('path');
    $p = $tok->sub();

    while( strpos($p,'//') !== false )
    $p = str_replace('//', '/',$p);

    if ( strpos($p,'..') !== false ) return jerr('..');

    if ( $p == '' ) return jerr('empty');

    while ( $p != '' && substr($p,-1) == '/' )
    $p = substr($p, 0, strlen($p) - 1);

    if ( Jraf_special($p, $su->su) ) return jfail('system path');

    if ( !Jraf_check_au_path($p, $su, $wr) ) return jfail('denied');

    $pth = $p;

    return new Cmdr('',1);
}

function Jraf_special($s,$su)
{
    global $ver_name, $sys_name;
    if ( strpos($s,$ver_name) !== false ) return true;

    if ($su) return false;

    if ( strpos($s,$sys_name) !== false ) return true;

    return false;
}

function Jraf_check_au_path($pth,$su,$write)
{
    if ( $su->su ) return true;
    if ( !$write ) return true;

    Jraf_set_user_uname($su);
    if ( $su->uname == '' ) return false;
    
    $rpth = Jraf_root($pth)->s;
    $hdir = Jraf_home_dir()->plus_s($su->uname)->s;

    $hsz = strlen($hdir);
    if ( strlen($rpth) < $hsz ) return false;
    
    return ( substr($rpth, 0, $hsz) == $hdir );
}

function Jraf_set_user_uname($su)
{
    $u = Jraf_users_dir()->plus_s($su->email)->plus_s('uname');
    $uname = trim($u->file_get());

    if ( Jraf_isuname($uname) ) $su->uname = $uname;
}

function Jraf_set_user_quota($su)
{
    $q = Jraf_users_dir()->plus_s($su->email)->plus_s('quota');
    $quota = trim($q->file_get());
    $su->quotaKb = $quota;
}

function Jraf_isuname($s)
{
    $ls = strlen($s);
    if ( $ls < 3) return false;
    if ( $ls > 16) return false;
    
    for ( $i=0; $i<$ls; $i++ )
    {
        $c = $s[$i];
        
        if ( $c >= 'a' && $c <= 'z') continue;
        if ( $c >= '0' && $c <= '9') continue;
        if ( $c == '_' || $c == '_') continue;
        
        return false;
    }
    
    return true;
}

function Jraf_user($sess) // => User
{
    $usr = Jraf_users_dir();
    if ( !$usr->isdir() ) return new User(true,true);

    if ( $sess == '0' ) return new User(false,true);

    $in = Jraf_login_dir()->plus_s($sess);
    
    if ( !$in->isfile() ) return new User(false, false);
    
    ///$email = OsPath::file_get_contents($in->s);
    $email = $in->file_get();
    
    $superuser = Jraf_config('admin', $email);

    $udir = Jraf_users_dir()->plus_s($email);
    if ( !$udir->isdir())
    {
        $udir->trymkdir();
        if ( !$udir->isdir() ) throw 'Cannot create '.$udir->s;
        
        Jraf_new_user($email);
    }
    
    //set counter
    $file_cntr = $udir->plus_s('counter');
    ///$scntr = OsPath::file_get_contents($file_cntr->s);
    $scntr = $file_cntr->file_get();
    $icntr = 0;
    if (! empty($scntr) ) $icntr = +$scntr;
    $icntr++;
    OsPath::file_put_contents($file_cntr->s, $icntr . "\n", 0);

    //set access
    $file_last = $udir->plus_s('access');
    /// $last = @date('YmdHis');
    $last = Jraf_date();
    OsPath::file_put_contents($file_last->s, $last . "\n", 0);
    
    $user = new User($superuser, true);
    $user->email = $email;
    $user->cntr = $icntr;
    $user->last = $last;
    
    return $user;
}

function Jraf_date()
{
    global $dateset;
    
    if ( $dateset != '') return $dateset;
    
    return @date('YmdHis');
}

function Jraf_login($tok, $in)
{
    if ( !$tok->next() ) return jerr('need arg');
    $em = $tok->sub();
    if ( !Jraf_users_dir()->isdir() ) return jfail('no users');

    $dir = Jraf_login_dir();
    if ( !$dir->isdir() )
    {
        $dir->trymkdir();
        if ( !$dir->isdir() ) return jfail('login directory fails');
    }

    if ( $in )
    {
        $server = '';
        if ( $tok->next() && ( ($server = $tok->sub()) != ':' ) ) {}
        else return jerr('arg required <server> or \'*\'');

        if( $server == '*' ) $server = '';
        
        if ( !Jraf_ismail($em) ) return jerr('bad email');

        global $j_nonce;
        
        $j_a = j_anonce();
        $j_nonce = hex16($j_nonce . $j_a);

        $f = $dir->plus_s($j_nonce);
        OsPath::file_put_contents($f->s, $em, 0);

        Jraf_sendmail($server, $j_nonce, $em);

        return jok2($server);
    }

    // logout
    $dir->plus_s($em)->erase();

    Jraf_cleanOldFiles($dir, 10 * 1000 * 1000); // 4 months
    
    return jok1();
}

function Jraf_ismail($email)
{
    if ( !$email 
            || $email = ''
            || $email[0] == '-' 
            || !filter_var($email, FILTER_VALIDATE_EMAIL) )
    return false;

    return true;
}

function Jraf_sendmail(&$url, $sid, $em) // => void
{
    if ( $url == '' ) $url = Jraf_config('server','');
    if ( $url == false ) { echo 'sendmail: empty url'; return; }

    $i = strpos($url,'?');

    if( $i === false )
    {
        if ( $url[strlen($url) - 1] != '/' ) $url .= '/';
        global $thisload;
        $url .= $thisload;
    }
    else
    $url = substr($url, 0, $i + 1);

    $furl = $url . $sid;

    // sending email
    $mail_to = $em;
    $mail_subj = 'login';
    $mail_msg = $furl;

    @mail($mail_to,$mail_subj,$mail_msg);
}

function Jraf_config($key,$val)
{
    $fstr = OsPath::file_get_contents('conf.phd');
    $words = preg_split('/[\s]+/', $fstr);
    //var_dump($words);

    $sz = count($words);

    if( $sz%2 && $words[$sz-1] != '' )  return false;

    for( $i=0; $i<$sz; $i += 2 )
    {
        if( $words[$i] != $key ) continue;
        if( $val == '' ) return $words[$i+1];
        else if( $val == $words[$i+1] ) return true;
    }

    return false;
}

function Jraf_update_ver($pth)
{
    if ( Jraf_special($pth, false) ) return;


    $v = Jraf_getver($pth);
    $v = ''.( $v + 1 );

    Jraf_setver($pth, $v);

    $up = Jraf_parent_str($pth);
    if ( $up == $pth ) return;

    Jraf_update_ver($up);
}

function Jraf_zero($s, $d = '0')
{
    return $s=='' ? $d : $s;
}

function Jraf_ver_path($p)
{
    global $ver_name;
    $q = $p.$ver_name;
    $q = Jraf_ver_dir() -> plus_s($q);
    return $q;
}

function Jraf_getver($p)
{
    $q = Jraf_ver_path($p);
    ///$ver = OsPath::file_get_contents( $q->s );
    $ver = $q->file_get();
    $ver = trim($ver);
    $ver = Jraf_zero($ver);
    return $ver;
}

function Jraf_setver($p, $v)
{
    $q = Jraf_ver_path($p);
    $parent = Jraf_parent_str($q->s);
    $opar = new OsPath($parent);

    if ( !$opar->isdir() ) $opar->trymkdir();
    if ( !$opar->isdir() ) throw 'Failed to make dir ' . $parent;

    OsPath::file_put_contents($q->s,$v,0);
}

function Jraf_parent_str($spth) // str -> str
{
    $pth = new OsPath($spth);
    if( $pth->size() < 2 ) return '';
    $up = $pth->strPstr($pth->size()-2);
    return $up;
}

function Jraf_read_obj($pth, $getonly, $u)
{
    if ( Jraf_special($pth, $u->su) ) return jerr('sys path');

    $rp = new OsPath($pth);
    $p = Jraf_root($pth);
    $ver = Jraf_getver($pth);

    if ( $p->isdir() )
    {
        $q = $ver . ' -1';
        if ( $getonly ) return jok2($q);

        $dir = $p->readDirectory();

        $r = '';
        $cntr = 0;

        foreach( $dir[0] as $i )
        {
            if ( Jraf_special($i, $u->su) ) continue;
            $r .= ' ' . Jraf_getver( $rp -> plus_s($i) -> s );
            $r .= ' -1';
            $r .= ' ' . $i;
            $cntr++;
        }

        foreach ( $dir[1] as $i )
        {
            $name = $i[0];
            $size = $i[1];

            if ( Jraf_special($name, $u->su) ) continue;
            $r .= ' ' . Jraf_getver($rp -> plus_s($name) -> s);
            $r .= ' ' . $size;
            $r .= ' ' . $name;
            $cntr++;
        }

        $q .= ' ' . $cntr;

        return jok2($q . $r);
    }

    if ( $p->isfile() )
    {
        $r = $ver . ' ' . $p->file_size();
        if ( $getonly ) return jok2($r);
        /// $r .= ' ' . base64_encode( $p->file_get_contents() );
        ///$r .= ' ' . base64_encode( OsPath::file_get_contents($p->s) );
        $r .= ' ' . base64_encode( $p->file_get() );
        return jok2($r);
    }

    return jerr('bad path ' . $pth);

}

function Jraf_aureq_mv($pth, $pto)
{
    $f1 = Jraf_root($pth);
    $dir = $f1->isdir();

    if ( $dir ) return jfail('moving direcrories not allowed');
    // the reason is that it would require recursive copying
    // of the version files sub-tree, since it cannot be moved

    $f2 = Jraf_root($pto);

    $k = OsPath::rename($f1->s, $f2->s);
    if ( !$k ) return jfail($pth . ' -> ' . $pto);
    if ( $f1->isdir() || $f1->isfile() ) return jfail('mv '.$pth);

    Jraf_update_ver($pto);
    Jraf_update_ver($pth);

    return jok2($pto);
}

function Jraf_new_user($email)
{
    $udir = Jraf_users_dir()->plus_s($email);
    
    $quotaKb = Jraf_config('quota','');
    if( $quotaKb == false ) $quotaKb = '10000';

    $uname = hex16($email . hex16($email));
    
    $file_quota = ($udir->plus_s('quota'));
    OsPath::file_put_contents($file_quota->s, $quotaKb . "\n", 0);
    
    $file_uname = ($udir->plus_s('uname'));
    OsPath::file_put_contents($file_uname->s, $uname . "\n", 0);
    
    $hm = Jraf_home_dir();
    
    if ( !$hm->isdir() )
    {
        $hm->trymkdir();
        if ( !$hm->isdir() ) die('Cannot create ' . $hm->s );
    }
    
    $hm->plus_s($uname)->trymkdir();
}

function Jraf_cleanOldFiles($dir, $secs)
{
    ///return;

    $files = $dir->readDirectory();
    ///$files = $files[1];
    ///var_dump($files);

    foreach ( $files[1] as $i )
    {
        $name = $i[0];
        $size = $i[1];
        $osfile = $dir->plus_s($name);
        $ho = $osfile->howold();
        ///echo " AAA ".$ho.' '.$secs.' ';
        if ( $ho > $secs ) $osfile->erase();
    }
}

function Jraf_profile($su)
{
    Jraf_set_user_uname($su);
    Jraf_set_user_quota($su);
    
    $star = function($s)
    {
        return ($s == '') ? '*' : $s; 
    };
    
    $r = $su->su ? 'a' : 'u';
    $r .= ' ';
    $r .= $star($su->email) . ' ';
    $r .= $star($su->quotaKb) . ' ';
    $r .= $star($su->last) . ' ';
    $r .= $star($su->cntr) . ' ';
    
    if ( $su->uname == '' ) $r .= $star($su->uname);
    else 
    {
        global $home_dir;
        
        $a = new OsPath($home_dir);
        $r .= $a->plus_s($su->uname)->s;
    }

    return jok2($r);
}

?>
