'use strict';

// Time Main
var time         = document.querySelector('.time-display');
var hourMode     = document.querySelector('.hour-checkbox');
var secondsMode  = document.querySelector('.seconds-checkbox');
var daylightMode = document.querySelector('.daylight-checkbox');

// Alarm Main
var alarmMsg   = document.querySelector('.alarm-msg');
var alarmTime  = document.querySelector('.alarm-time');
var alarmMode  = document.querySelector('.alarm-checkbox');
var alarmSound = document.querySelector('.alarm-sound');

// Set Alarm Modal
var alarmHour    = document.querySelector('.set-alarm-hour');
var alarmMinutes = document.querySelector('.set-alarm-minutes');
var alarmMisc    = document.querySelector('.set-alarm-misc');

// init time
secondsMode.checked = true;

alarmMode.checked   = true;
alarmMsg.innerHTML = 'Alarm is set for';

var setHour    = 6;
var setMinutes = 30;

alarmHour.innerHTML    = setHour;
alarmMinutes.innerHTML = setMinutes;
alarmMisc.innerHTML    = 'AM';

updateTime();

$('.hour-checkbox').bootstrapSwitch();
$('.seconds-checkbox').bootstrapSwitch();
$('.daylight-checkbox').bootstrapSwitch();
$('.alarm-checkbox').bootstrapSwitch();

function updateTime() {
    var hour    = hourMode.checked;
    var seconds = secondsMode.checked;
    var alarm   = alarmMode.checked;

    if (hour && seconds) {
        time.innerHTML = moment().format('H:mm:ss');

        if (alarm) {
            alarmTime.innerHTML = moment().format('H:mm');
        }
    }
    else if (hour && !seconds) {
        time.innerHTML = moment().format('H:mm');

        if (alarm) {
            alarmTime.innerHTML = moment().format('H:mm');
        }
    }
    else if (!hour && seconds) {
        time.innerHTML = moment().format('h:mm:ss A');

        if (alarm) {
            alarmTime.innerHTML = moment().format('h:mm A');
        }
    }
    else {
        time.innerHTML = moment().format('h:mm A');

        if (alarm) {
            alarmTime.innerHTML = moment().format('h:mm A');
        }
    }

    setTimeout(updateTime, 1000);
}

function toggleAlarm() {
    if (alarmMode.checked) {
        alarmMsg.innerHTML = 'Alarm is set for';
        alarmSound.play();
    }
    else {
        alarmMsg.innerHTML  = 'Alarm is off';
        alarmTime.innerHTML = '';
    }
}

// Increase Hour function
function increaseHour() {
    if (hourMode.checked) {
        if (setHour < 23) {
            setHour++;
            alarmHour.innerHTML = setHour;
        }
    }
    else {
        if (setHour < 12) {
            setHour++;
            alarmHour.innerHTML = setHour;
        }
    }
}
// Decrease Hour function
function decreaseHour() {
    if (setHour > 1) {
        setHour--;
        alarmHour.innerHTML = setHour;
    }
}

// Increase Minutes function
function increaseMinutes() {
    if (setMinutes < 59) {
        setMinutes++;

        if (setMinutes <= 9) {
            alarmMinutes.innerHTML = '0' + setMinutes;
        }
        else {
            alarmMinutes.innerHTML = setMinutes;
        }
    } else {
        setMinutes = 0;
        alarmMinutes.innerHTML = '0' + setMinutes;
    }
}
// Decrease Minutes function
function decreaseMinutes() {
    if (setMinutes > 0) {
        setMinutes--;

        if (setMinutes <= 9) {
            alarmMinutes.innerHTML = '0' + setMinutes;
        }
        else {
            alarmMinutes.innerHTML = setMinutes;
        }
    } else {
        setMinutes = 59;
        alarmMinutes.innerHTML = setMinutes;
    }
}

function toggleMisc() {

}
