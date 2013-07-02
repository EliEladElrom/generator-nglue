module.exports = function (grunt) {

  /**
   * Plugins
   */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-notify');

  /**
   * Build -- global
   */

  var globalConfig = require('./code_base/assets/nglue.json'),
    globaljsFiles = [],
    globalLessFiles = [],
    key;

  for (key in globalConfig.dependencies) {
    if (globalConfig.dependencies.hasOwnProperty(key)) {
      globaljsFiles.push(globalConfig.dependencies[key]);
    }
  }

  for (key in globalConfig.less) {
    if (globalConfig.less.hasOwnProperty(key)) {
      globalLessFiles.push(globalConfig.less[key]);
    }
  }

  globaljsFiles = globaljsFiles.map(function (p) {
    return 'code_base/assets/' + p;
  });

  globalLessFiles = globalLessFiles.map(function (p) {
    return 'code_base/assets/style/' + p;
  });

  grunt.log.write('reading information from \'code_base/assets/nglue.json\'');

  grunt.initConfig({

    /**
     * We read in our `package.json` file so we can access the package name and
     * version.
     */
    pkg: grunt.file.readJSON('package.json'),
    glblpkg: grunt.file.readJSON('./code_base/assets/nglue.json'),

    clean: [
      'code_base/dist/'
    ],

    uglify: {
      globaljsFiles: {
        options: {
          compress: {
            unsafe: false
          }
        },
        files: {
          'code_base/dist/js/<%= glblpkg.name %>-<%= glblpkg.version %>.min.js': globaljsFiles,
          'code_base/dist/js/<%= glblpkg.name %>-latest.min.js': globaljsFiles
        }
      }
    },

    less: {
      globalLessFiles: {
        options: {
          compress: {
            unsafe: false
          }
        },
        files: {
          'code_base/dist/style/<%= glblpkg.name %>-latest.css': globalLessFiles,
          'code_base/dist/style/<%= glblpkg.name %>-<%= glblpkg.version %>.css': globalLessFiles
        }
      }
    },

    /**
     * copy files to dist folder
     */
    copy: {
      assets: {
        files: [
          {
            src: [ 'code_base/apps/web/**' ],
            dest: 'web/',
            cwd: 'code_base/dist/apps/',
            expand: true
          },
          {
            expand: true,
            flatten: true,
            src: [ 'code_base/assets/fonts/*'],
            dest: 'code_base/dist/fonts/',
            filter: 'isFile'
          }
        ]
      }
    }

  });

  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'less']);
};