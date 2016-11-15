// (C) 2016


'use strict';


const BTN_TEXT = {
    LOGIN: 'Login',
    PROFILE: 'Profile',
    SEND_EMAIL: 'Send email',
    PING: 'Ping'
};

const LBL_TEXT = {
    OPEN_FILE: 'Open file',
    UPLOAD_FILE: 'Upload'
};

const MSG = {
    ERROR: 'ERROR: ',
    RELOAD: 'Are you sure?',
    get FILE_IS_HUGE () { 
        return this.ERROR + 'File is too big. Maximum file size is ' + G_MAX_FILE_SIZE + ' bytes';
    },
    get FILE_IS_EMPTY () {
        return this.ERROR + 'File is empty';
    },
    get FILE_READ_ERROR () {
        return this.ERROR + 'File read error';
    },
    get FILE_TYPE_ERR () {
        return this.ERROR + 'File type error';
    },
    get TABLE_ERROR () {
        return this.ERROR + 'Table error in line ';
    } 
};
