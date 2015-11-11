var gulp = require('gulp'),
    jslint = require('gulp-jslint'),
    mocha = require('gulp-mocha'),
    files = ['lib/index.js', 'test/test.js', 'spec/music-spec.js'],
    jasmine = require('gulp-jasmine'),
    istanbul = require('gulp-istanbul');

// npm install gulp-jslint
gulp.task('jslint', function() {
    
	return gulp.src(files)
 
	    // pass your directives 
	    // as an object 
	    .pipe(jslint({
			// these directives can 
			// be found in the official 
			// JSLint documentation. 
			node: true,
			    evil: true,
			    nomen: true,
 
			    // you can also set global 
			    // declarations for all source 
			    // files like so: 
			    global: [],
			    predef: [],
			    // both ways will achieve the 
			    // same result; predef will be 
			    // given priority because it is 
			    // promoted by JSLint 
 
			    // pass in your prefered 
			    // reporter like so: 
			    reporter: 'default',
			    // ^ there's no need to tell gulp-jslint 
			    // to use the default reporter. If there is 
			    // no reporter specified, gulp-jslint will use 
			    // its own. 
 
			    // specifiy custom jslint edition 
			    // by default, the latest edition will 
			    // be used 
			    edition: '2014-07-08',
 
			    // specify whether or not 
			    // to show 'PASS' messages 
			    // for built-in reporter 
			    errorsOnly: false
			    }))
 
	    // error handling: 
	    // to handle on error, simply 
	    // bind yourself to the error event 
	    // of the stream, and use the only 
	    // argument as the error object 
	    // (error instanceof Error) 
	    .on('error', function (error) {
		    console.error(String(error));
		});
    });

// npm install --save-dev gulp-mocha    
gulp.task('mocha', ['jslint'], function () {
    
    return gulp.src('test/test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha({reporter: 'nyan'}));
});

gulp.task('jasmine', ['mocha'], function () {
    return gulp.src('spec/music-spec.js')
        .pipe(jasmine());
});

gulp.task('pre-coverage', ['jasmine'], function () {
  return gulp.src(['lib/**/*.js'])
    // Covering files 
    .pipe(istanbul())
    // Force `require` to return covered files 
    .pipe(istanbul.hookRequire());
});

gulp.task('coverage', ['pre-coverage'], function () {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran 
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90% 
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jslint', 'mocha', 'jasmine', 'coverage']);