'use strict';

var showTime = document.querySelector('.show-time');
var hMode    = document.querySelector('.hour-checkbox');
var sMode    = document.querySelector('.seconds-checkbox');
var dMode    = document.querySelector('.daylight-checkbox');
var aMode    = document.querySelector('.alarm-checkbox');
var aMsg     = document.querySelector('.alarm-msg');
var aTime    = document.querySelector('.alarm-time');
var aSound   = document.querySelector('.alarm-sound');
var timeZone = document.querySelector('.timezone-dropdown');

var getMoment;
var setMoment = moment.tz('Europe/London');
var timeSet   = false;

hMode.checked = false;
sMode.checked = false;
dMode.checked = false;
aMode.checked = false;

$('.hour-checkbox').bootstrapSwitch();
$('.seconds-checkbox').bootstrapSwitch();
$('.daylight-checkbox').bootstrapSwitch();
$('.alarm-checkbox').bootstrapSwitch();

toggleAlarm();
updateTime();

function toggleAlarm() {
    if (aMode.checked) {
        aMsg.innerHTML = 'Alarm is set for';
        aTime.innerHTML = 'TIME GOES HERE';
    }
    else {
        aMsg.innerHTML  = 'Alarm is OFF';
        aTime.innerHTML = '';
    }
}

function updateTime() {
    getMoment = moment.tz('Europe/London');

    if (timeSet) {
        getOffset();
    } else {
        getTimeZone();
    }

    if (dMode.checked) {
        getMoment.add(1, 'hour');
    }

    if (hMode.checked && sMode.checked) {
        showTime.innerHTML = getMoment.format('H:mm:ss');
    }
    else if (hMode.checked && !sMode.checked) {
        showTime.innerHTML = getMoment.format('H:mm');
    }
    else if (!hMode.checked && sMode.checked) {
        showTime.innerHTML = getMoment.format('h:mm:ss A');
    }
    else {
        showTime.innerHTML = getMoment.format('h:mm A');
    }

    if (aMode.checked) {
        // aSound.play();
    }

    setTimeout(updateTime, 1000);
}

function reset() {
    timeSet = false;
}

function getTimeZone() {
    switch (timeZone.value) {
        case 'GMT':
            return;
        case 'UTC':
            return;
        case 'ECT':
            getMoment.add(1, 'h');
            return;
        case 'EET':
            getMoment.add(2, 'h');
            return
        case 'ART':
            getMoment.add(2, 'h');
            return;
        case 'EAT':
            getMoment.add(3, 'h');
            return;
        case 'MET':
            getMoment.add(3, 'h').add(30, 'm');
            return;
        case 'NET':
            getMoment.add(4, 'h');
            return;
        case 'PLT':
            getMoment.add(5, 'h');
            return;
        case 'IST':
            getMoment.add(5, 'h').add(30, 'm');
            return;
        case 'BST':
            getMoment.add(6, 'h');
            return;
        case 'VST':
            getMoment.add(7, 'h');
            return;
        case 'CTT':
            getMoment.add(8, 'h');
            return;
        case 'JST':
            getMoment.add(9, 'h');
            return;
        case 'ACT':
            getMoment.add(9, 'h').add(30, 'm');
            return;
        case 'AET':
            getMoment.add(10, 'h');
            return;
        case 'SST':
            getMoment.add(11, 'h');
            return;
        case 'NST':
            getMoment.add(12, 'h');
            return;
        case 'MIT':
            getMoment.subtract(11, 'h');
            return;
        case 'HST':
            getMoment.subtract(10, 'h');
            return;
        case 'AST':
            getMoment.subtract(9, 'h');
            return;
        case 'PST':
            getMoment.subtract(8, 'h');
            return;
        case 'PNT':
            getMoment.subtract(7, 'h');
            return;
        case 'MST':
            getMoment.subtract(7, 'h');
            return;
        case 'CST':
            getMoment.subtract(6, 'h');
            return;
        case 'EST':
            getMoment.subtract(5, 'h');
            return;
        case 'IET':
            getMoment.subtract(5, 'h');
            return;
        case 'PRT':
            getMoment.subtract(4, 'h');
            return;
        case 'CNT':
            getMoment.subtract(3, 'h').subtract(30, 'm');
            return;
        case 'AGT':
            getMoment.subtract(3, 'h');
            return;
        case 'BET':
            getMoment.subtract(3, 'h');
            return;
        case 'GST':
            getMoment.subtract(2, 'h');
            return;
        case 'CAT':
            getMoment.subtract(1, 'h');
            return;
        default:
            return;
    }
}

function getOffset() {
    var minuteOffset = getMoment.diff(setMoment, 'm');
    getMoment.subtract(minuteOffset, 'm').add(1, 'm');
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
var selectedTimeMisc;

function initTimeModal() {
    selectedTimeHour    = 6;
    selectedTimeMinutes = 30;

    timeHour.innerHTML    = selectedTimeHour;
    timeMinutes.innerHTML = selectedTimeMinutes;

    if (hMode.checked) {
        selectedTimeMisc = null;
        timeMiscSide.style.display = 'none';
    }
    else {
        selectedTimeMisc           = 'AM';
        timeMiscSide.style.display = 'block';
        timeMisc.innerHTML         = selectedTimeMisc;
    }
}

function increaseTimeHour() {
    if (hMode.checked) {
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

function decreaseTimeHour() {
    if (hMode.checked) {
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

function toggleTimeMisc() {
    if (timeMisc.innerHTML == 'AM') {
        selectedTimeMisc = 'PM';
        timeMisc.innerHTML = selectedTimeMisc;
    }
    else {
        selectedTimeMisc = 'AM';
        timeMisc.innerHTML = selectedTimeMisc;
    }
}

function setTime() {
    $('#set-time-modal').modal('hide');
    hourConverter();
    setMoment.set({'hour': selectedTimeHour, 'minute': selectedTimeMinutes, 'seconds': 0});
    timeSet = true;
}

function hourConverter() {
    if (selectedTimeHour == 1 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 13;
    } else if (selectedTimeHour == 2 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 14;
    } else if (selectedTimeHour == 3 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 15;
    } else if (selectedTimeHour == 4 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 16;
    } else if (selectedTimeHour == 5 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 17;
    } else if (selectedTimeHour == 6 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 18;
    } else if (selectedTimeHour == 7 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 19;
    } else if (selectedTimeHour == 8 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 20;
    } else if (selectedTimeHour == 9 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 21;
    } else if (selectedTimeHour == 10 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 22;
    } else if (selectedTimeHour == 11 && selectedTimeMisc == 'PM') {
        selectedTimeHour = 23;
    } else if (selectedTimeHour == 12 && selectedTimeMisc == 'AM') {
        selectedTimeHour = 0;
    }
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

function initAlarmModal() {
    selectedAlarmHour    = 6;
    selectedAlarmMinutes = 30;

    alarmHour.innerHTML    = selectedAlarmHour;
    alarmMinutes.innerHTML = selectedAlarmMinutes;

    if (hMode.checked) {
        alarmMiscSide.style.display = 'none';
    }
    else {
        alarmMiscSide.style.display = 'block';
        alarmMisc.innerHTML         = 'AM';
    }
}

function increaseAlarmHour() {
    if (hMode.checked) {
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

function decreaseAlarmHour() {
    if (hMode.checked) {
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

function toggleAlarmMisc() {
    if (alarmMisc.innerHTML == 'AM') {
        alarmMisc.innerHTML = 'PM';
    }
    else {
        alarmMisc.innerHTML = 'AM';
    }
}

function setAlarm() {
    selectedAlarmTime = alarmHour.innerHTML + ':' + alarmMinutes.innerHTML;
}
