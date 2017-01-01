var g_sys_loaded_file2 = 1;

var g_jraf_root = {};
g_jraf_root.ver = 0;
g_jraf_root.sz = -1;
g_jraf_root.bnd = -1; // 0,1,2 - none, default, bound
g_jraf_root.cb = null; // binding callback
g_jraf_root.name = '/';
g_jraf_root.parent = null;
g_jraf_root.full = 0; // 0,1 - incomplete, complete/loaded
g_jraf_root.text = ''; // file body
g_jraf_root.kids = {}; // children

g_jraf_root.str = function()
{ 
	return "hello"; 
}

