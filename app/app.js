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

// Time Zone Main
var timeZoneDropdown = document.querySelector('.timezone-dropdown');

init();

function init() {
    // Seconds mode init
    secondsMode.checked = true;
    // Alarm mode init
    alarmMode.checked  = true;
    alarmMsg.innerHTML = 'Alarm is set for';
    // Bootstrap-Switch
    $('.hour-checkbox').bootstrapSwitch();
    $('.seconds-checkbox').bootstrapSwitch();
    $('.daylight-checkbox').bootstrapSwitch();
    $('.alarm-checkbox').bootstrapSwitch();
    // Show Time
    updateTime();
}

function updateTime() {
    var hour    = hourMode.checked;
    var seconds = secondsMode.checked;
    var alarm   = alarmMode.checked;

    var getMoment = moment.tz(getTimeZone());

    if (hour && seconds) {
        time.innerHTML = getMoment.format('H:mm:ss');

        if (alarm) {
            alarmTime.innerHTML = getMoment.format('H:mm');
        }
    }
    else if (hour && !seconds) {
        time.innerHTML = getMoment.format('H:mm');

        if (alarm) {
            alarmTime.innerHTML = getMoment.format('H:mm');
        }
    }
    else if (!hour && seconds) {
        time.innerHTML = getMoment.format('h:mm:ss A');

        if (alarm) {
            alarmTime.innerHTML = getMoment.format('h:mm A');
        }
    }
    else {
        time.innerHTML = getMoment.format('h:mm A');

        if (alarm) {
            alarmTime.innerHTML = getMoment.format('h:mm A');
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

function getTimeZone() {
    switch (timeZoneDropdown.value) {
        case 'GMT':
            return 'Europe/London';
        case 'UTC':
            return 'Antarctica/Troll';
        case 'ECT':
            return 'Europe/Madrid';
        case 'EET':
            return 'Europe/Sofia';
        case 'ART':
            return 'Africa/Cairo';
        case 'EAT':
            return 'Africa/Nairobi';
        case 'MET':
            return 'Asia/Tehran';
        case 'NET':
            return 'Asia/Dubai';
        case 'PLT':
            return 'Asia/Karachi';
        case 'IST':
            return 'Asia/Colombo';
        case 'BST':
            return 'Asia/Dhaka';
        case 'VST':
            return 'Asia/Bangkok';
        case 'CTT':
            return 'Asia/Shanghai';
        case 'JST':
            return 'Asia/Tokyo';
        case 'ACT':
            return 'Australia/Darwin';
        case 'AET':
            return 'Australia/Lindeman';
        case 'SST':
            return 'Australia/Melbourne';
        case 'NST':
            return 'Pacific/Tarawa';
        case 'MIT':
            return 'Pacific/Niue';
        case 'HST':
            return 'Pacific/Honolulu';
        case 'AST':
            return 'America/Sitka';
        case 'PST':
            return 'America/Los_Angeles';
        case 'PNT':
            return 'America/Phoenix';
        case 'MST':
            return 'America/Denver';
        case 'CST':
            return 'America/Monterrey';
        case 'EST':
            return 'America/New_York';
        case 'IET':
            return 'America/Indiana';
        case 'PRT':
            return 'America/Puerto_Rico';
        case 'CNT':
            return 'America/St_Johns';
        case 'AGT':
            return 'America/Argentina/Mendoza';
        case 'BET':
            return 'America/Bahia';
        case 'GST':
            return 'Atlantic/South_Georgia';
        case 'CAT':
            return 'Atlantic/Azores';
        default:
    }       return 'Europe/London';
}

//***********************************************************************
//************************* SET ALARM MODAL *****************************
//***********************************************************************
var alarmHour     = document.querySelector('.set-alarm-hour');
var alarmMinutes  = document.querySelector('.set-alarm-minutes');
var alarmMisc     = document.querySelector('.set-alarm-misc');
var alarmMiscSide = document.querySelector('.set-alarm-misc-side');

var selectedAlarmTime;
var selectedAlarmHour;
var selectedAlarmMinutes;

// Init
function initAlarmModal() {
    selectedAlarmHour    = 6;
    selectedAlarmMinutes = 30;

    alarmHour.innerHTML    = selectedAlarmHour;
    alarmMinutes.innerHTML = selectedAlarmMinutes;

    if (hourMode.checked) {
        alarmMiscSide.style.display = 'none';
    }
    else {
        alarmMiscSide.style.display = 'block';
        alarmMisc.innerHTML         = 'AM';
    }
}

// Increase Alarm Hour
function increaseAlarmHour() {
    if (hourMode.checked) {
        if (selectedAlarmHour < 23) {
            selectedAlarmHour++;
        }
        else {
            selectedAlarmHour = 0;
        }
    }
    else {
        if (selectedAlarmHour < 12) {
            selectedAlarmHour++;
        }
        else {
            selectedAlarmHour = 1;
        }
    }
    alarmHour.innerHTML = selectedAlarmHour;
}

// Decrease Alarm Hour
function decreaseAlarmHour() {
    if (hourMode.checked) {
        if (selectedAlarmHour > 0) {
            selectedAlarmHour--;
        }
        else {
            selectedAlarmHour = 23;
        }
    }
    else {
        if (selectedAlarmHour > 1) {
            selectedAlarmHour--;
        }
        else {
            selectedAlarmHour = 12;
        }
    }
    alarmHour.innerHTML = selectedAlarmHour;
}

// Increase Alarm Minutes
function increaseAlarmMinutes() {
    if (selectedAlarmMinutes < 59) {
        selectedAlarmMinutes++;

        if (selectedAlarmMinutes <= 9) {
            alarmMinutes.innerHTML = '0' + selectedAlarmMinutes;
        }
        else {
            alarmMinutes.innerHTML = selectedAlarmMinutes;
        }
    } else {
        selectedAlarmMinutes = 0;
        alarmMinutes.innerHTML = '0' + selectedAlarmMinutes;
    }
}

// Decrease Alarm Minutes
function decreaseAlarmMinutes() {
    if (selectedAlarmMinutes > 0) {
        selectedAlarmMinutes--;

        if (selectedAlarmMinutes <= 9) {
            alarmMinutes.innerHTML = '0' + selectedAlarmMinutes;
        }
        else {
            alarmMinutes.innerHTML = selectedAlarmMinutes;
        }
    } else {
        selectedAlarmMinutes = 59;
        alarmMinutes.innerHTML = selectedAlarmMinutes;
    }
}

// Toggle AM/PM
function toggleAlarmMisc() {
    if (alarmMisc.innerHTML == 'AM') {
        alarmMisc.innerHTML = 'PM';
    }
    else {
        alarmMisc.innerHTML = 'AM';
    }
}

// Set Alarm
function setAlarm() {
    selectedAlarmTime = alarmHour.innerHTML + ':' + alarmMinutes.innerHTML;
}

//***********************************************************************
//************************** SET TIME MODAL *****************************
//***********************************************************************
var timeHour     = document.querySelector('.set-time-hour');
var timeMinutes  = document.querySelector('.set-time-minutes');
var timeMisc     = document.querySelector('.set-time-misc');
var timeMiscSide = document.querySelector('.set-time-misc-side');

var selectedTimeHour;
var selectedTimeMinutes;

// Init
function initTimeModal() {
    selectedTimeHour    = 6;
    selectedTimeMinutes = 30;

    timeHour.innerHTML    = selectedTimeHour;
    timeMinutes.innerHTML = selectedTimeMinutes;

    if (hourMode.checked) {
        timeMiscSide.style.display = 'none';
    }
    else {
        timeMiscSide.style.display = 'block';
        timeMisc.innerHTML         = 'AM';
    }
}

// Increase Time Hour
function increaseTimeHour() {
    if (hourMode.checked) {
        if (selectedTimeHour < 23) {
            selectedTimeHour++;
        }
        else {
            selectedTimeHour = 0;
        }
    }
    else {
        if (selectedTimeHour < 12) {
            selectedTimeHour++;
        }
        else {
            selectedTimeHour = 1;
        }
    }
    timeHour.innerHTML = selectedTimeHour;
}

// Decrease Time Hour
function decreaseTimeHour() {
    if (hourMode.checked) {
        if (selectedTimeHour > 0) {
            selectedTimeHour--;
        }
        else {
            selectedTimeHour = 23;
        }
    }
    else {
        if (selectedTimeHour > 1) {
            selectedTimeHour--;
        }
        else {
            selectedTimeHour = 12;
        }
    }
    timeHour.innerHTML = selectedTimeHour;
}

// Increase Time Minutes
function increaseTimeMinutes() {
    if (selectedTimeMinutes < 59) {
        selectedTimeMinutes++;

        if (selectedTimeMinutes <= 9) {
            timeMinutes.innerHTML = '0' + selectedTimeMinutes;
        }
        else {
            timeMinutes.innerHTML = selectedTimeMinutes;
        }
    } else {
        selectedTimeMinutes = 0;
        timeMinutes.innerHTML = '0' + selectedTimeMinutes;
    }
}

// Decrease Time Minutes
function decreaseTimeMinutes() {
    if (selectedTimeMinutes > 0) {
        selectedTimeMinutes--;

        if (selectedTimeMinutes <= 9) {
            timeMinutes.innerHTML = '0' + selectedTimeMinutes;
        }
        else {
            timeMinutes.innerHTML = selectedTimeMinutes;
        }
    } else {
        selectedTimeMinutes = 59;
        timeMinutes.innerHTML = selectedTimeMinutes;
    }
}

// Toggle AM/PM
function toggleTimeMisc() {
    if (timeMisc.innerHTML == 'AM') {
        timeMisc.innerHTML = 'PM';
    }
    else {
        timeMisc.innerHTML = 'AM';
    }
}

// Set Time
function setTime() {

}
