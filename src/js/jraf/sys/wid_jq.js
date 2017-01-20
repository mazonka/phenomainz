// (C) 2016
'use strict';

function wid_jq_js(){}

function jq_get_modal_email()
{
    return $('<div/>')
        .append($('<label/>', { text: L_TXT.EMAIL }))
        .append($('<input/>').attr('maxlength', INPUT_MAX))
        .append($('<button/>', { text: B_TXT.SEND_EMAIL }));
}

function jq_get_profile(profile)
{
    var $profile = $('<span/>');
    var $nt = $('<span/>', { text: L_TXT.USER_NAME });
    var $nm = $('<span/>', { id: 'span_user_name' });
    var $lo = $('<span/>', { id: 'span_pfl_logout' })
        .append($('<img/>', { id: 'img_user_logout', src: IMG.LOGOUT }));        
    var $ml = $('<span/>', { text: L_TXT.EMAIL + profile.ml });
    var $ls = $('<span/>', { text: L_TXT.LAST_LOGIN + profile.ls });
    var $cn = $('<span/>', { text: L_TXT.COUNTER + profile.cn });
    var $qt = $('<span/>', { text: L_TXT.VOLUME })
        .append($('<span/>', { id: 'span_pfl_volume', text: '0' }))
        .append($('<span/>', { text: '/' + profile.qt + 'Kb' }));

    $profile.append($nt)
        .append($nm)
        .append($lo)
        .append('<br/>')
        .append($ml)
        .append('<br/>')
        .append($cn)
        .append('<br/>')
        .append($ls)
        .append('<br/>')
        .append($qt)
        .append('<br/>')

    return $profile;
}

function jq_get_adm_panel()
{
    var $span = $('<span/>', { text: '__ADMIN PANEL MUST BE HERE__' });
    var $btn = $('<button/>', { text: 'Create users dir' });
                
    $span.append('<br/>').append($btn);
        
    return $span;
}

// gets object for change user name
function jq_get_modal_name(node, name)
{
    return $('<div/>').append($('<label/>', { text: 'Name' }))
        .append($('<input/>', { val: name }).attr('maxlength', INPUT_MAX))
        .append($('<button/>', { text: B_TXT.SUBMIT }));
}

// gets yes/no object for the operation that needs to be confirmed
function jq_get_yes_no(msg)
{
    return $('<div/>')
        .append($('<div/>', { text: msg }))
        .append($('<button/>', { text: B_TXT.NO }).addClass('button-no-button'))
        .append($('<button/>', { text: B_TXT.YES }).addClass('button-yes-button'));
}
