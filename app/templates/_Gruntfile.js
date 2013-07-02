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
   * Options
   */
  var src = grunt.option('src') || '';

  /**
   * Build -- global config json
   */

  var globalConfig = require('./code_base/assets/nglue.json'),
    globalComponentFiles,
    globalLessFiles,
    moduleComponentFiles,
    allModuleComponentFiles = [],
    moduleLessFiles;

  var convertKeyToArray = function (object, keyName, array) {
    var key,
      retArray = [];

    for (key in object[keyName]) {
      if (object[keyName].hasOwnProperty(key)) {
        if (array !== undefined) {
          array.push(object[keyName][key]);
        } else {
          retArray.push(object[keyName][key]);
        }
      }
    }

    if (array === undefined) {
      return retArray;
    }
  };

  var convertKeyToKeyValuesArray = function (object, keyName, moduleName, array) {
    var key;

    for (key in object[keyName]) {
      if (object[keyName].hasOwnProperty(key)) {

        array.push({
          name: moduleName,
          value: object[keyName][key]
        });
      }
    }
  };

  var findModuleNameBasedOnComponentURL = function (componentURL, array) {
    var i,
      len;

    len = array.length;

    for (i = 0; i < len; ++i) {
      if (array[i].value === componentURL) {
        return array[i].name;
      }
    }
  };

  var removeDuplicationAndUpdateURL = function (array, array_keys) {
    var latest = [];
    array.reduce(function (a, b) {
      if (a.indexOf(b) < 0) {
        a.push(b);
        latest.push(findModuleNameBasedOnComponentURL(b, array_keys) + '/' + b);
      }
      return a;
    }, []);
    return latest;
  }

  /**
   * Define apps modules for app task
   */

  globalComponentFiles = convertKeyToArray(globalConfig, 'dependencies', undefined);
  globalLessFiles = convertKeyToArray(globalConfig, 'less', undefined);

  if (src !== '') {
    var moduleConfig = require('./code_base/apps/' + src + '/nglue.json');
    moduleComponentFiles = convertKeyToArray(moduleConfig, 'nglue-dependencies', undefined);
    moduleLessFiles = convertKeyToArray(moduleConfig, 'less', undefined);

    grunt.log.writeln('\nGrunt the following dependencies: ' + JSON.stringify(moduleComponentFiles) + '\n');
    grunt.log.writeln('\nGrunt the following less files: ' + JSON.stringify(moduleLessFiles) + '\n');

    var len = moduleComponentFiles.length,
      i,
      moduleDepn,
      moduleConfigUrl,
      allModuleComponentFiles_keys = [],
      allModuleLessFiles_keys = [];

    for (i = 0; i < len; ++i) {
      moduleConfigUrl = './code_base/modules/' + moduleComponentFiles[i] + '/nglue.json';
      grunt.log.writeln('Loading: ' + moduleConfigUrl);
      moduleDepn = require(moduleConfigUrl);

      convertKeyToKeyValuesArray(moduleDepn, 'dependencies', moduleComponentFiles[i], allModuleComponentFiles_keys);
      convertKeyToKeyValuesArray(moduleDepn, 'less', moduleComponentFiles[i], allModuleLessFiles_keys);

      convertKeyToArray(moduleDepn, 'dependencies', allModuleComponentFiles);
      convertKeyToArray(moduleDepn, 'less', moduleLessFiles);
    }

    moduleLessFiles = removeDuplicationAndUpdateURL(moduleLessFiles, allModuleLessFiles_keys);
    allModuleComponentFiles = removeDuplicationAndUpdateURL(allModuleComponentFiles, allModuleComponentFiles_keys);

    // TODO: EE add validation to ensure component files are the same files for each module
    grunt.log.writeln('\nApp dependencies: ' + JSON.stringify(allModuleComponentFiles));
    grunt.log.writeln('\nApp less:' + JSON.stringify(moduleLessFiles));

    grunt.option('appComponentName', moduleConfig.name);
    grunt.option('appComponentNameVersion', moduleConfig.version);
  }

  /**
   * Build -- mapping
   */

  globalComponentFiles = globalComponentFiles.map(function (p) {
    return 'code_base/assets/' + p;
  });

  globalLessFiles = globalLessFiles.map(function (p) {
    return 'code_base/assets/style/' + p;
  });

  allModuleComponentFiles = allModuleComponentFiles.map(function (p) {
    return 'code_base/modules/' + p;
  });

  grunt.log.write('\n Loading \'code_base/assets/nglue.json\'\n');

  grunt.initConfig({

    /**
     * We read in our `package.json` file so we can access the package name and
     * version.
     */
    pkg: grunt.file.readJSON('package.json'),
    glblpkg: grunt.file.readJSON('./code_base/assets/nglue.json'),

    optionSrc: grunt.option('src'),
    appComponentName: grunt.option('appComponentName'),
    appComponentNameVersion: grunt.option('appComponentNameVersion'),

    clean: [
      'code_base/dist/'
    ],

    uglify: {
      globalComponentFiles: {
        options: {
          compress: {
            unsafe: false
          }
        },
        files: {
          'code_base/dist/js/<%= glblpkg.name %>-<%= glblpkg.version %>.min.js': globalComponentFiles,
          'code_base/dist/js/<%= glblpkg.name %>-latest.min.js': globalComponentFiles
        }
      },
      allModuleComponentFiles: {
        options: {
          compress: {
            unsafe: false
          }
        },
        files: {
          'code_base/dist/js/<%= appComponentName %>-<%= appComponentNameVersion %>.min.js': allModuleComponentFiles,
          'code_base/dist/js/<%= appComponentName %>-latest.min.js': allModuleComponentFiles,
          'code_base/apps/<%= optionSrc %>/<%= appComponentName %>-latest.min.js': allModuleComponentFiles
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

  grunt.registerTask('default', ['clean', 'copy', 'uglify:globalComponentFiles', 'less']);
  grunt.registerTask('app', ['uglify:allModuleComponentFiles']);
};