// (C) 2016
'use strict';

function wid_fill_js(){}

function wid_fill_login(ch)
{
    var $log = $('#span_main_log');

    (ch) ? $log.show() : $log.hide();
}

function wid_fill_adm_panel(ch)
{
    var $wid = $('#div_main_adm');

    if (ch)
    {
        let $panel = jq_get_adm_panel()
        let $button = $panel.find('button');

        $wid.html($panel).show();
        $button.button()
            .click(function() { wid_jraf_create_udir() });
    }
    else
        $wid.empty().hide();
}

function wid_fill_profile(profile)
{
    var $p = $('#div_main_pfl');

    if (profile)
    {
        let $wid = jq_get_profile(profile)

        $wid.find('#span_pfl_logout')
            .click(function() { wid_init_logout_window() });
        $p.html($wid).show();
    }
    else
        $p.empty().hide()
}

function wid_fill_name(node, name)
{
    var $obj = $('#span_user_name');
    var f = function (wid)
    {
        wid_init_modal_name(node, name);
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

    $(document).keyup(function(e) { e.keyCode == 27 && close(); });
    $(window).on('beforeunload', function() { return M_TXT.RELOAD; });

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

function wid_fill_modal_email()
{
    var $body = $('#div_main_pwm_content_body');
    var $wid = jq_get_modal_email();
    var $input = $wid.find('input');
    var $button = $wid.find('button');

    $body.html($wid);
    $button.button()
        .button('disable')
        .click(function()
        {
            wid_close_modal_window(function(){wid_nc_login($input.val())});
        });

    $input.focus()
        .on('input', function() {
            var data = $(this).val();

            if (eng_is_email(data))
            {
                $button.button('enable');
                wid_paint_borders($(this));

                $(this).on('keypress', function(event)
                {
                    if (Boolean(event.keyCode === 13))
                        wid_close_modal_window(function()
                        {
                            wid_nc_login(data)
                        });

                    $(this).off('keypress');
                });
            }
            else
            {
                (Boolean(data))
                    ? wid_paint_borders($(this), 'red')
                    : wid_paint_borders($(this));

                $button.button('disable');
                $(this).off('keypress');
            }
        });
}


function wid_fill_modal_logout()
{
    var $body = $('#div_main_pwm_content_body');
    var $wid = jq_get_yes_no(M_TXT.SURE);

    $body.html($wid);

    $wid.find('.button-yes-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window(function(){ wid_nc_logout() });
        });

    $wid.find('.button-no-button')
        .button()
        .click(function ()
        {
            wid_close_modal_window();
        });
}

function wid_fill_modal_name(node, text)
{
    var $body = $('#div_main_pwm_content_body');
    var $wid = jq_get_modal_name(node, text);
    var $input = $wid.find('input');
    var $button = $wid.find('button');

    $body.html($wid);
    $button.button().button('disable');
    $input.focus()
        .on('input', function()
        {
            var text = $input.val().replace(/^\s+|\s+$/g, '');

            if (eng_is_valid_str(text))
            {
                wid_paint_borders($input);

                $button.button('enable')
                    .off('click')
                    .click(function()
                    {
                        jraf_write_name(node, text || '*');
                        wid_close_modal_window();
                    });

                $input.off('keyup')
                    .keyup(function(event)
                    {
                        if (event.keyCode === 13)
                        {
                            jraf_write_name(node, text || '*');
                            wid_close_modal_window();
                        }
                    });
            }
            else
            {
                wid_paint_borders($input, 'red');

                $button.button('disable');
                $input.off('keyup');
            }
        });
}

function wid_fill_dataset_list(checkbox)
{
    if (checkbox)
    {
        $('#div_main_dsl').show();
        $('#div_main_dsl_create').find('button').button();
    }
    else
    {
        $('#div_main_dsl').hide();
        $('#div_main_dsl_list').empty();
    }
}
