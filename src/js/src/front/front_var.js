// (C) 2016


'use strict';

var g_user_id = '';
var g_keywords = [];
var g_ds = []; //dataset tree

const TD_LOGIN = 'td_login';
const TD_PROFILE = 'td_profile';
const td_dslist = 'td_dslist';
const td_dsitem_create = 'td_dsitem_create';
const H1_DS = 'h1_ds_';
const DIV_DS = 'div_ds_';
const DIV_DS_LIST = 'div_ds_list';


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

const INPUT_MAX = '40';

const IMG = {
    LOGO_WAIT: 'img/logo_wt.gif',
    LOGO_DONE: 'img/logo_dn.png',
    LOGO_FAIL: 'img/logo_fl.png',
    AJAX_LOAD: 'img/ajax_load.gif',
    CROSS:     'img/cross.png'
};

var g_img = [
    IMG.LOGO_WAIT, IMG.LOGO_DONE, IMG.LOGO_FAIL, IMG.AJAX_LOAD, IMG.CROSS,
];

var g_img_preload = [];

var g_pulse = wid_pulse();
