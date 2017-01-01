var g_sys_loaded_file2 = 1;

var g_jraf_root = jraf_node({ parent : null });

function jraf_node(ini)
{
	var node = {};
	node.ver = 0;
	node.sz = -1;
	node.bnd = 0; // 0,1,2 - none, empty, bound
	node.cb = null; // binding callback
	node.name = '';
	node.parent = null;
	node.full = 0; // 0,1 - incomplete, complete/loaded
	node.text = ''; // file body
	node.kids = {}; // children
	
	node.str = function()
	{ 
		var r = '';
		var p = this.parent;
		while(true)
		{
			r = this.name + '/' + r;
			if( p == null ) break;
			p = p.parent;
		}
		return r; 
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
	console.log("jraf_relative - not imlemented");
	return cur_node;
}
