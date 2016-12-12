function wid_jq_ds_item_ctrl($obj, ds_id) {
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