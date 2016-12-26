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
    SUBMIT: 'Submit',
    LOGOUT: 'Logout',
    PING: 'Ping',
    CREATE_NEW: 'Create new dataset',
    UPDATE_LIST: 'Update list',
    DELETE: 'Delete',
    FILE: 'New file',
    TITLE: 'Title',
    DSC: 'Description',
    CANCEL: 'Cancel',
    SET: 'Set',
    YES: 'Yes',
    NO: 'No',
    UPDATE: 'Update',
    CAT: 'Category',
    KWD: 'Keywords',
    ADD_KWD: 'Add keyword'
};

const L_TXT = {
    OPEN_FILE: 'Open file',
    UPLOAD_FILE: 'Upload',
    COUNTER: 'Logins counter: ',
    LAST_LOGIN: 'Last login: ',
    EMAIL: 'E-mail: ',
    USER_NAME: 'User name: ',
    VOLUME: 'Volume: ',
    NSPCAT: 'Not specified category',
    CURCAT: 'Current category',
    SUBCAT: 'Subcategories',
    KWD_SEL: 'Select keyword',
};

const M_TXT = {
    ERROR: 'ERROR!\n',
    RELOAD: 'Are you sure?',
    EMAIL: 'An email with link has been sent to ',
    BYE: 'Bye!',
    HELLO: 'Hello!\nYou could create your first dataset',
    SURE: 'Are your sure?',
    S_EXPIRED: 'Session expired',
    DEL_KWD: 'Delete keyword?',
    get FILE_IS_HUGE() {
        return this.ERROR + 'File is too big. Maximum file size is ' + G_MAX_FILE_SIZE + ' bytes';
    },
    get FILE_IS_EMPTY() {
        return this.ERROR + 'File is empty';
    },
    get FILE_READ_ERROR() {
        return this.ERROR + 'File read error';
    },
    get FILE_TYPE_ERR() {
        return this.ERROR + 'File type error';
    },
    get TABLE_ERROR() {
        return this.ERROR + 'Table error in line ';
    }
};

const PHENOD = {
    OK: 'OK',
    AUTH: 'AUTH'
}
