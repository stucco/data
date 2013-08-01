'use strict';

/*global require:true, module:true */
module.exports = function (grunt) {

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    jshint: {
      options: {
        laxcomma: true,
        laxbreak: true,
        asi: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      files: ['source/assets/js/main.js']
    },
    copy: {
      app: {
        files: [
          {expand: true, cwd: 'source/static', src: ['**'], dest: 'deploy/'},
          {expand: true, cwd: 'source/assets', src: ['**'], dest: 'deploy/'},
          {src: ['data/sources.json'], dest: 'deploy/'}
        ]
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: true
          }
        },
        files: {
          'deploy/index.html': 'source/templates/index.jade',
          'deploy/404.html': 'source/templates/404.jade'
        }
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      app: {
        src: ['source/assets/js/main.js',
              'source/assets/js/jquery.tablesorter.js'],
        dest: 'deploy/js/scripts.min.js'
      }
    },
    cssmin: {
      'deploy/css/style.min.css': [
        'source/assets/css/app.css'
      ]
    },
    concat: {
      js: {
        src: ['source/assets/js/main.js',
              'source/assets/js/jquery.tablesorter.js'],
        dest: 'deploy/js/scripts.min.js'
      },
      css: {
        src: ['source/assets/css/app.css'],
        dest: 'deploy/css/style.min.css'
      }
    },
    watch: {
      files: '<config:jshint.files>',
      tasks: 'jshint concat'
    },
    clean: {
      deploy: ['deploy']
    },
    jsonlint: {
      data: {
        src: [ 'data/sources.json' ]
      }
    }
    
  });

  // Default task will be invoked when grunt is called without any argument
  // concatenate but dont minify anything
  grunt.registerTask('default', ['jsonlint', 'jshint', 'jade', 'concat', 'copy']);

  // run everything and minify
  grunt.registerTask('prod', ['jsonlint', 'jshint', 'jade', 'cssmin', 'uglify', 'concat', 'copy']);

  // clean deploy folder
  grunt.registerTask('clean', 'clean');

  // check that data sources file is valid json
  grunt.registerTask('test', 'jsonlint');  

};