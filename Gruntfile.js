// Generated on 2016-02-11 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {



//  grunt.loadNpmTasks('grunt-contrib-concat');
//  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-ftp-deploy');

  // Time how long tasks take. Can help when optimizing build times
  //require('time-grunt')(grunt);




  // Define the configuration for all the tasks
  grunt.initConfig({


    concat: {
      files: {
        src: ['./app/scripts/*.js', './app/scripts/controllers/*.js','./app/scripts/services/*.js', './app/scripts/directives/*.js', './app/scripts/filters/*.js', './app/scripts/setting/*.js', './app/scripts/controllers/article/*.js', './app/scripts/controllers/event/*.js', './app/scripts/controllers/mypage/*.js'],
        dest: './app/script_mini/mixidea.js',
      }
    },

    uglify: {
      dist: {
        files: {
          './app/script_mini/mixidea-mini.js': './app/script_mini/mixidea.js'
        }
      }
    },

    'ftp-deploy': {
      build: {
        auth: {
          host: 'webdemo.dac.co.jp',
          port: 21,
          authKey: 'key1'
        },
        src: './',
        dest: '/public_html/hackerson',


        exclusions: ['./app/.sass-cache','./node_modules', './.ftppass','./.git']
      }
    },



  });




  grunt.registerTask('deploy',['ftp-deploy']);


  grunt.registerTask('deploy_concat',['concat','uglify','ftp-deploy']);




};

