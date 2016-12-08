// (C) 2016


'use strict';

var g_uid;

const GOOGLE_CLIENT_ID = '100038937843-duq0t7jc8pthv84n7d4r37953dlmqe24.apps.googleusercontent.com';
const FACEBOOK_CLIENT_ID = '1519315828096043';
const LINKEDIN_CLIENT_ID = '785rlivs65jktg';
const WINDOWS_CLIENT_ID = 'c8cd888b-f0a7-483d-b427-6c058c1c4307';

const G_PFX = 'au';
const G_MAX_FILE_SIZE = 10485760; ///10Mb
const PH_CMD = {
    PING: 'ping',
    LOGIN: 'login'
};

const IMG = {
    LOGO_WAIT: 'img/logo_wt.gif',
    LOGO_DONE: 'img/logo_dn.png',
    LOGO_FAIL: 'img/logo_fl.png'
};

var g_img = [
    IMG.LOGO_WAIT, IMG.LOGO_DONE, IMG.LOGO_FAIL
];

var g_img_preload = [];

var g_pulse = wid_pulse();
