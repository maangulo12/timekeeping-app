'use strict';

var gulp         = require('gulp');
var winInstaller = require('electron-windows-installer');

gulp.task('create-windows-installer', function(done) {
  return winInstaller({
    appDirectory:    './build/win32',
    outputDirectory: './release',
    arch:            'ia32'
  }).then(done).catch(done);
});

gulp.task('default', ['create-windows-installer']);
