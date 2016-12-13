// (C) 2016

function wid_get_jq_user_email() {
    var $new = $();
    $new = $new.add('<div>');
    
    $new.append($('<label/>')
        .text('E-mail: ')
        .attr('for', 'input_user_email'));
        
    $new.append($('<input/>', {
            id: 'input_user_email'
        })
        .on('input', function () {
            wid_input_email($(this))
        })
        .attr('maxlength', '40'));
    
    $new.append($('<button/>', {
            id: 'button_user_email',
            text: B_TXT.SEND_EMAIL
        })
        .on('click', function () {
            wid_nc_login()
        })
        .button()
        .button('disable'));
    
    return $new;
}


function wid_get_jq_user_profile(name) {
    var $new = $();
    
    $new = $new.add('<div>', {
        id: 'div_user_profile'
    });
    
    $new.append($('<label/>')
        .text('Name')
        .attr('for', 'input_user_name'));
        
    $new.append($('<input/>', {
            id: 'input_user_name',
            value: name
        })
        .on('input', function () {
            wid_input_name($(this))
        })
        .attr('maxlength', '40'));
    
    $new.append($('<button/>', {
            id: 'button_user_name',
            text: B_TXT.CHANGE,
        })
        .on('click', function () {
            wid_nc_name()
        })
        .button()
        .button('disable'));
    
    $new.append($('<button/>', {
            id: 'button_user_logout',
            text: B_TXT.LOGOUT,
            click: function () {
                wid_nc_logout()
            }
        })
        .button());
        
    return $new;
} 


function wid_jq_ds_item_ctrl($obj, ds_id) {
    var $new = $();
    
    $new = $new.add('<div>', {
        id: 'div_ds_item_ctrl'
    });
    
    $obj.append($('<button/>', {
            text: B_TXT.DS_EDIT,
            id: 'button_ds_edit_' + ds_id,
            click: function () {
                wid_nc_ds_edit(ds_id);
            }
        }).button());
    
    $obj.append($('<button/>', {
            text: B_TXT.DS_SUBMIT,
            id: 'button_ds_submit_' + ds_id,
            click: function () {
                wid_nc_ds_submit(ds_id);
            }
        }).button());
    
    $obj.append( $('<button/>', {
        text: B_TXT.DS_DELETE,
        id: 'button_ds_delete_' + ds_id,
        click: function () { 
            wid_nc_ds_delete(ds_id);
        }
    }).button());
}
























