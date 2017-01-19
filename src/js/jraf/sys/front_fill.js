// (C) 2016
'use strict';

function front_fill_js(){}

function wid_fill_login(ch)
{
    var $log = $('#span_main_log');
    
    (ch) ? $log.show() : $log.hide();
}

function wid_fill_adm_panel(ch)
{
    var $adm = $('#div_main_adm');
    
    if (ch)
    {
        $adm.html(jq_get_adm_panel()).show();
        wid_init_ui_button($adm);
    }
    else $adm.empty().hide();
        
}    

function wid_fill_profile(profile)
{
    var $p = $('#div_main_pfl');
    
    (profile) 
        ? $p.html(jq_get_profile(profile)).show()
        : $p.empty().hide()
}

function wid_fill_name(node, name)
{
    var $obj = $('#span_user_name');
    var f = function (wid)
    {
        wid_open_chname_window(node, name);
    }

    $obj.off().click(f)
    $obj.html(name);
}

function wid_fill_modal(cl, ifn, cfn)
{
    var $modal = $('#div_main_pwm');
    var $content = $('#div_main_pwm_content');
    var $body = $('#div_main_pwm_content_body');
    var close = function() { wid_close_modal_window(cfn); };
    
    $content.width($('body').outerWidth());

    if (cl)
        $modal.click(close).children().click(close);
    else
        $modal.click(close).children().click(function(e) { return false; });
    
    $(document)
        .keyup(function(e)
        {
            e.keyCode == 27 && close();
        });

    $(window)
        .on('beforeunload', function()
        {
            return M_TXT.RELOAD;
        });
    

    if (typeof ifn == 'function') 
        ifn();
    else
        $body.html(ifn);
    
    $modal.fadeIn({duration: 200});
}

function wid_erase_modal()
{
    var $modal = $('#div_main_pwm');
    var $body = $('#div_main_pwm_content_body');
    
    $modal.off('click');
    $modal.children().off('click');
    $(document).off('keyup');
    $(window).off('beforeunload');
    
    $modal.fadeOut({duration: 200});
    $body.children().remove();
}

function wid_fill_modal_chname(node, text)
{
    var $body = $('#div_main_pwm_content_body');
    var $wid = jq_get_chname(node, text);
    var $input = $wid.find('input');

    $input.on('input', function()
    {
        evt_input_name($input, node);
    });

    $body.html($wid);
    $body.find('button')
        .button()
        .button('disable');
    $body.find('input')
        .focus();
}

function wid_fill_dataset_list(checkbox)
{
    if (checkbox)
    {
        $('#div_main_dsl').show();
        wid_init_ui_button($('#div_main_dsl_create'));
    }    
    else
    {
        $('#div_main_dsl').hide();
        $('#div_main_dsl_list').empty();
    }
}
