// (C) 2016
'use strict';

function eng_jraf_js(){}

function jraf_write_name(node, text)
{
    jraf_write_save(node, text, function(){
        jraf_node_up(jraf_virtual_node(g_jraf_root, node));
    });
}

function jraf_create_dir(cwd,name,cbi)
{
    jraf_write_md(cwd,name,cbi);
}