// (C) 2016


'use strict';


const B_TXT = {
    PHENO: 'Phenomainz',
    GOOGLE: 'Google',
    FACEBOOK: 'Facebook',
    LINKEDIN: 'LinkedIn',
    WINDOWS: 'Windows',
    PROFILE: 'Profile',
    SEND_EMAIL: 'Send email',
    CHANGE: 'Change',
    LOGOUT: 'Logout',
    PING: 'Ping',
    DS_CREATE_NEW: 'Create new dataset',
    DS_LIST_UPDATE: 'Update list',
    DS_DELETE: 'DELETE',
    DS_EDIT: 'EDIT',
    DS_UPDATE: 'UPDATE',
};

const L_TXT = {
    OPEN_FILE: 'Open file',
    UPLOAD_FILE: 'Upload'
};

const M_TXT = {
    ERROR: 'ERROR: ',
    RELOAD: 'Are you sure?',
    EMAIL: 'An email with link has been sent to ',
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

const PHENOD = {
    OK: 'OK',
    AUTH: 'AUTH'
}