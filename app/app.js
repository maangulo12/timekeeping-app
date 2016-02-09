(function() {
    'use strict';

    // Set current time
    var time = document.querySelector('.time-display');
    time.innerHTML = moment().format('LT');

    // Set alarm time
    var alarm = document.querySelector('.alarm-time');
    alarm.innerHTML = moment().format('LT');
})();
