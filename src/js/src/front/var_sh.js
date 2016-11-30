// (C) 2016


'use strict';

var g_uid;

const GOOGLE_ID = '100038937843-duq0t7jc8pthv84n7d4r37953dlmqe24.apps.googleusercontent.com';
const FACEBOOK_ID = '1519315828096043';
const FACEBOOK_VER = 'v2.8';
const LINKEDIN_ID = '785rlivs65jktg'; // secret 'uynr5iTnXCygZkG8'
const LIVE_ID = '';

const G_PFX = 'au';
const G_MAX_FILE_SIZE = 10485760; ///10Mb
const PH_CMD = {
    PING: 'ping',
    LOGIN: 'login'
};

const IMG = {
    LOGO_WAIT: 'img/logo_wt.gif',
    LOGO_DONE: 'img/logo_dn.png',
    LOGO_FAIL: 'img/logo_fl.png',
    OPEN_FILE: 'img/fl_op.png'
};

var g_img = [
    IMG.LOGO_WAIT, IMG.LOGO_DONE, IMG.LOGO_FAIL, IMG.FILE_UP
];

var g_img_preload = [];

var g_progressbar = start_progressbar($('#img_logo'));
