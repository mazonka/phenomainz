var g_sys_loaded_file2 = 1;

var g_jraf_root = jraf_node({ parent : null });

var g_keep_loading = false;

function jraf_node(ini)
{
	var node = {};
	node.ver = 0;
	node.sz = -1; // empty means some distant kids have binding
	node.watch = 0; // 0,1,2 - none, empty, bound
	node.wid = null; // binding callback
	node.name = '';
	node.parent = null;
	node.full = 0; // 0,1 - incomplete, complete/loaded
	node.text = ''; // file body
	node.kids = {}; // children
	
	node.str = function()
	{ 
		if( this.parent == null ) return '/';
		let r = this.parent.str();
		if( r == '/' ) r = '';
		return r + '/' + this.name;
	};

	node.rmkid = function(kid)
	{
		if( !(kid in this.kids) ) return;
		for( let i in this.kids ) this.kids[kid].rmkid(i);
		delete this.kids[kid];
	};

	node.setwid = function(fun)
	{
		///console.log(this.watch);
		///console.log(this);
		this.wid = fun;
		this.watch = 2;
		let p = this.parent;
		while(p)
		{
			if( p.watch==0 ) p.watch=1;
			p = p.parent;
		}
		this.wid(this);
	};

	ini = ini || {};
	for( let i in ini ) node[i] = ini[i];

	return node;
}

// cur_node - current node
// path - path string: relative or absolute
// returns - node
function jraf_relative(cur_node, path)
{
	///console.log("jraf_relative - not imlemented");

	while(true)
	{
		if( path.indexOf('//') == -1 ) break;
		path = path.replace('//','/');
	}

	var a = path.split('/');
	///console.log(a);
	if( a.length < 1 ) return cur_node;

	var i=0;
	var cwd = cur_node;

	if( a[0] == '' )
	{
		i=1;
		cwd = g_jraf_root;
	}

	for(; i<a.length; i++ )
	{
		let s = a[i];
		if( s=='' ) continue;
		if( s=='.' ) continue;
		if( s=='..' )
		{
			cwd = cwd.parent;
			if( cwd == null ) return null;
			continue;
		}

		if( !( s in cwd.kids ) ) return null;
		cwd = cwd.kids[s];
	}

	return cwd;
}

function jraf_update_callback(jo,ex)
{
	var nd = ex.node;

	if( jo.ver == nd.ver && nd.full == 1 )
	{
		ex.cbi(jo,nd);
		return;
	}

	nd.ver = jo.ver;
	nd.full = 1;

	if( nd.name != jo.name ) console.log('ERROR name mismatch 99');

	if( nd.sz<0 )
	{
		if( jo.sz<0 ) jraf_update_DD(jo,nd,ex.cbi);
		else jraf_update_DF(jo,nd);
	}
	else
	{
		if( jo.sz<0 ) jraf_update_FD(jo,nd);
		else jraf_update_FF(jo,nd);
	}

	if( nd.watch == 2 ) nd.wid(nd);

	console.log('FIXME jraf_update_callback: need tests for DF FD');

	ex.cbi(jo,nd);
}

function jraf_update_obj(path,name,cbi,node)
{
	var ex = {};
	ex.node = node;
	ex.cbi = cbi;
	jraf_read_obj(path,name,jraf_update_callback,ex);
}

function jraf_update_DD(jo,nd,cbi)
{
	// first delete disappeared nodes
	for( let i in nd.kids )
	{
		if( i in jo.kids ) continue;
		nd.rmkid(i);
	}

	// add new
	for( let i in jo.kids )
	{
		if( i in nd.kids ) continue;
		var j = jo.kids[i];

		var n = jraf_node();
		n.ver = j.ver;
		n.sz = j.sz;
		n.name = i;
		n.parent = nd;

		nd.kids[i] = n;
	}

	// update kids
	for( let i in nd.kids )
	{
		if( !(i in jo.kids) )
		{
			console.log('ERROR kids mismatch 152');
			return;
		}
		var n = nd.kids[i];
		var j = jo.kids[i];

		let kp = g_keep_loading;

		if( n.ver == j.ver )
		{
			if( !(kp && n.full==0) ) continue;
		}
		else
		{
			if( n.watch == 0 && !kp ) continue; // keep old
			// set incomplete (this part not switched on)
			{
				for( let i in n.kids ) n.rmkid(i);
				n.full = 0;
				continue;
			}
		}

		jraf_update_obj(nd.str()+'/',i,cbi,n);
	}

	///console.log(jo);
	///console.log(nd);
}

function jraf_update_FF(jo,nd)
{
	nd.sz = jo.sz;
	nd.text = jo.text;
}
