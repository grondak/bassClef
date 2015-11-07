var gulp = require('gulp'),
    jslint = require('gulp-jslint'),
    mocha = require('gulp-mocha'),
    files = ['music.js'];

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
gulp.task('test', ['jslint'], function () {
    
    return gulp.src('../tests/test.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it 
        .pipe(mocha({reporter: 'nyan'}));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['jslint', 'test']);