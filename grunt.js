/*global module:false*/
module.exports = function (grunt) {

  // lint - uses [jshint](https://github.com/jshint/jshint/)
  // jade - uses [jade](https://github.com/visionmedia/jade)
  // min - uses [uglify-js](https://github.com/mishoo/UglifyJS)
  // mincss - uses [csslint](https://github.com/stubbornella/csslint/wiki/Rules)

  // load jade and other contributed tasks
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-mincss');

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: ['source/assets/*.js']
    },
    copy: {
      staticFiles: {
        src: [ 'source/static/*'],
        dest: 'deploy/'
      },
      img: {
        src: [ 'source/assets/img/*'],
        dest: 'deploy/img'
      },
      jquery: {
        src: [ 'source/assets/js/jquery-1.8.2.min.js' ],
        dest: 'deploy/js/'
      },
      data: {
        src: [ 'data/*' ],
        dest: 'deploy/data'
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
    min: {
      app: {
        src: ['source/assets/js/main.js',
              'source/assets/js/jquery.tablesorter.js'],
        dest: 'deploy/js/scripts.min.js'
      }
    },
    mincss : {
      'deploy/css/style.min.css': [
        'source/assets/css/app.css'
      ]
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    clean: [
      'deploy'
    ],
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true
      }
    },
    uglify: {
      
    }
    
  });

  // Default task will be invoked when grunt is called without any argument
  // run everything
  grunt.registerTask('default', 'jade mincss lint min copy');

  // clean deploy folder
  grunt.registerTask('clean', 'clean');

  // Copy is a separate task, since it does not need to be run as often
  grunt.registerMultiTask('copy', 'Copy static files to deployment directory', function () {
    var path = require("path"),
        files = grunt.file.expand(this.file.src),
        dest = this.file.dest;

    grunt.log.writeln('Copying files for ' + this.target + '.');
        
    files.forEach(function (file) {      
      grunt.file.copy(file, path.join(dest, path.basename(file)), {noProcess: true});
      grunt.log.writeln('File "' + file + '" copied to "' + dest + '".');
    });
  });

};