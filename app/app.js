'use strict';

var time    = document.querySelector('.time-display');
var alarm   = document.querySelector('.alarm-time');
var mode    = document.querySelector('.hour-checkbox');
var seconds = document.querySelector('.seconds-checkbox');

// init
seconds.checked = true;
updateTime();

// updateTime function
function updateTime() {
    var modeChecked    = mode.checked;
    var secondsChecked = seconds.checked;

    if (modeChecked && secondsChecked) {
        time.innerHTML  = moment().format('H:mm:ss');
        alarm.innerHTML = moment().format('H:mm');
    }
    else if (modeChecked && !secondsChecked) {
        time.innerHTML  = moment().format('H:mm');
        alarm.innerHTML = moment().format('H:mm');
    }
    else if (!modeChecked && secondsChecked) {
        time.innerHTML  = moment().format('h:mm:ss A');
        alarm.innerHTML = moment().format('h:mm A');
    }
    else {
        time.innerHTML  = moment().format('h:mm A');
        alarm.innerHTML = moment().format('h:mm A');
    }

    setTimeout(updateTime, 1000);
}
