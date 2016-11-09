// (C) 2016


'use strict';


const PH_CMD = {
    PING: 'ping',
    LOGIN: 'login'
};

const AU_CMD = {
    PING: 'au ping',
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

var g_progressbar = start_progressbar($('#img_logo'));
