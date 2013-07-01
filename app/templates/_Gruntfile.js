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

  var globalConfig = require('code_base/assets/config.json')
     ,property = globalConfig.js;

  grunt.initConfig({

      /**
       * We read in our `package.json` file so we can access the package name and
       * version.
       */
      pkg: grunt.file.readJSON('package.json')

  });

  // tasks
  // grunt.registerTask('default', []);
};
