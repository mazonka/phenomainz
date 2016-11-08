// (C) 2016;


'use strict';


function is_email(data) {
    return (/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,6}$/i.test(data))
        ? true
        : false;
}
