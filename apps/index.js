'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ApplicationGenerator = module.exports = function ApplicationGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('Creating app ' + this.name + ' at \'code_base/apps/\'');
  if (!isValidJavascriptIdentifier(this.name)) {
    throw('invalid app name ' + this.name);
  } else {
    this.appDirectory = 'code_base/apps/' + this.name + '/';
    this.appName = this.name + 'App';
    this.appControllerName = this.appName.charAt(0).toUpperCase() + this.appName.slice(1) + 'Controller';
  }
};

var isValidJavascriptIdentifier = function(str) {
  var validName = /^[$A-Z_][0-9A-Z_$]*$/i;
  return validName.test(str);
};

util.inherits(ApplicationGenerator, yeoman.generators.NamedBase);

ApplicationGenerator.prototype.createStructure = function createStructure() {
  this.mkdir(this.appDirectory);
  this.mkdir(this.appDirectory + 'scripts');
  this.mkdir(this.appDirectory + 'scripts/controllers');
  this.mkdir(this.appDirectory + 'scripts/directives');
  this.mkdir(this.appDirectory + 'scripts/filters');
  this.mkdir(this.appDirectory + 'scripts/services');
  this.mkdir(this.appDirectory + 'assets');
  this.mkdir(this.appDirectory + 'assets/bower_components');
  this.mkdir(this.appDirectory + 'assets/components');
  this.mkdir(this.appDirectory + 'assets/images');
  this.mkdir(this.appDirectory + 'assets/styles');
  this.mkdir(this.appDirectory + 'assets/views');
};

ApplicationGenerator.prototype.files = function files() {
  this.template('scripts/_app.js', this.appDirectory + 'scripts/app.js');
  this.template('scripts/controllers/_App.js', this.appDirectory + 'scripts/controllers/' + this.appName + '.js');
  this.template('assets/views/_App.html', this.appDirectory + 'assets/views/' + this.appName + '.html');
  this.template('_index.html', this.appDirectory + 'index.html');
  this.template('_nglue.json', this.appDirectory + 'nglue.json');
};


