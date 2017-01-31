// (C) 2016
'use strict';

function wid_fill_js(){}

function wid_fill_ui(au, profile)
{
    
    
    if (0)
    {}
    else if (au && profile.ml != '*')
    {
        wid_fill_login(false);
        wid_fill_adm_panel(profile.su);
        wid_fill_profile(profile);
        wid_fill_dataset_list(true, profile.un);
    }
    else if (au && profile.ml == '*')
    {
        wid_fill_login(true);
        wid_fill_adm_panel(profile.su);
        wid_fill_dataset_list(false)
    }
    else
    {
        wid_fill_login(true);
        wid_fill_adm_panel(false);
        wid_fill_dataset_list(false);

        if (g_session != '0') 
        {
            window.location.href =
                location.href.substr(0, location.href.indexOf('?') + 1) + '0';
        }
    }
}

function wid_fill_auth(srv)
{
    log('::auth:', srv);
    if (0)
    {}
    else if (srv == 'phenomainz')
    {    
        wid_init_modal_window(false, function()
        {
            wid_fill_modal_email();
        });
    }
    else
    {}
}

function wid_fill_login(sf)
{
    var $log = $('#span_main_log');

    (sf) ? $log.show() : $log.hide();
}

function wid_fill_adm_panel(su)
{
    var $wid = $('#div_main_adm');
    var node = '.jraf.sys/users';

    if (su)
    {
        let $panel = jq_get_adm_panel()
        let $button = $panel.find('button');
        let f = function() 
        { 
            jraf_write_md(g_jraf_root, node, function (a) 
            {
                console.log(a)
            });
        };
        
        $wid.html($panel).show();
        $button.button().click(f);
    }
    else
        $wid.empty().hide();
}

function wid_fill_profile(profile)
{
    var $p = $('#div_main_pfl');
    if (!profile || profile.ml === '*') profile = null;

    if (profile)
    {
        let $wid = jq_get_profile(profile)
        let f = function() 
        {  
            wid_init_modal_window(false, function()
            {
                wid_fill_modal_logout();
            });        
        };
        
        $wid.find('#span_pfl_logout').click(f);
        $p.html($wid).show();
        wid_fill_name(profile.un);
    }
    else
        $p.empty().hide()
}

function wid_fill_name(uname)
{
    var node = uname + '/name';
    
    jraf_bind_virtual(g_jraf_root, node, function()
    {
        var $obj = $('#span_user_name');
        var name = this.text || '*';
        var f = function () 
        { 
            wid_init_modal_window(false, function() 
            {
                    wid_fill_modal_name(node, name); 
            }); 
        };
        
        $obj.html(name);
        $obj.off().click(f)
    });
    //jraf_node_up(jraf_virtual_node(g_jraf_root, node));
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
                let f = function()
                { 
                    jraf_write_save(node, text || '*', function()
                    {
                        jraf_node_up(jraf_virtual_node(g_jraf_root, node));
                    });
                };
                wid_paint_borders($input);
                
                $button.button('enable')
                    .off('click')
                    .click(function()
                    {
                        f();
                        wid_close_modal_window();
                    });

                $input.off('keyup')
                    .keyup(function(event)
                    {
                        if (event.keyCode === 13)
                        {
                            f()
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

function wid_fill_dataset_list(sf, uname)
{
    var $list = $('#div_main_dsl_list');
    var $main =$('#div_main_dsl');
    var node = uname + '/datasets';
    var cl = function()
    { 
        jraf_write_md(g_jraf_root, node, function (a) {});
        jraf_node_up(jraf_virtual_node(g_jraf_root, node)) 
    };

    if (!sf) return $main.hide();
    
    $main.show();
    $('#div_main_dsl_create').find('button')
        .button()
        .click(cl);
    
    jraf_bind_virtual(g_jraf_root, node, function()
    {
        $list.append($('<span/>', {text: 'kids\n'}));
        jraf_node_up(jraf_virtual_node(g_jraf_root, node, function()
        {
            console.log(Object.keys(this.kids.length));
        }));
    });
}
