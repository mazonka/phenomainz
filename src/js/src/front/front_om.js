// Phenomainz (C) 2016


'use strict';

function get_jq_admin_panel()
{
 var $o = $('<div/>');

 var $tit = $('<div/>', {text: 'I am ADMIN'});
 var $kwd = get_jq_ds_kwd_add()

 $kwd.find('input').autocomplete({
    source: g_keywords
 })

 $o.append($tit);
 $o.append($kwd);

 return $o;
}

