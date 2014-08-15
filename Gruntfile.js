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
          {expand: true, cwd: 'data', src: ['**'], dest: 'deploy/data/'}
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
    },
    'gh-pages': {
      options: {
        base: 'deploy',
        message: 'Auto-generated gh-pages update'
      },
      src: ['**']
    }
    
  });

  // run everything and minify
  grunt.registerTask('default', ['jsonlint', 'jshint', 'jade', 'cssmin', 'uglify', 'concat', 'copy']);

  // clean deploy folder
  grunt.registerTask('clean', 'clean');

  // check that data sources file is valid json
  grunt.registerTask('test', 'jsonlint');

  // deploy to gh-pages, but make sure everything is built first
  grunt.registerTask('deploy', ['jsonlint', 'jshint', 'jade', 'cssmin', 'uglify', 'concat', 'copy', 'gh-pages']);

};