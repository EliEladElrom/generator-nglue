'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  if (!isValidJavascriptIdentifier(this.name)) {
    throw('invalid module name ' + this.name);
  } else {
    console.log('Creating module ' + this.name + ' at \'code_base/modules/\'');
    this.projectName = require(path.join(process.cwd(), 'package.json')).name;
    this.moduleDirectory = 'code_base/modules/' + this.name + '/';
    this.moduleName = this.name + 'Module';
    this.moduleControllerName = this.moduleName.charAt(0).toUpperCase() + this.moduleName.slice(1) + 'Controller';
  }
};

var isValidJavascriptIdentifier = function(str) {
  var validName = /^[$A-Z_][0-9A-Z_$]*$/i;
  return validName.test(str);
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.createStructure = function createStructure() {
  this.mkdir(this.moduleDirectory);
  this.mkdir(this.moduleDirectory + 'scripts');
  this.mkdir(this.moduleDirectory + 'scripts/controllers');
  this.mkdir(this.moduleDirectory + 'scripts/directives');
  this.mkdir(this.moduleDirectory + 'scripts/filters');
  this.mkdir(this.moduleDirectory + 'scripts/services');
  this.mkdir(this.moduleDirectory + 'assets');
  this.mkdir(this.moduleDirectory + 'assets/bower_components');
  this.mkdir(this.moduleDirectory + 'assets/components');
  this.mkdir(this.moduleDirectory + 'assets/images');
  this.mkdir(this.moduleDirectory + 'assets/styles');
  this.mkdir(this.moduleDirectory + 'assets/views');
};

ModuleGenerator.prototype.files = function files() {
  this.template('scripts/_app.js', this.moduleDirectory + 'scripts/app.js');
  this.template('scripts/controllers/_Module.js', this.moduleDirectory + 'scripts/controllers/' + this.moduleName + '.js');
  this.template('assets/styles/_Module.css', this.moduleDirectory + 'assets/styles/' + this.moduleName + '.css');
  this.template('assets/views/_Module.html', this.moduleDirectory + 'assets/views/' + this.moduleName + '.html');
  this.template('_ModuleInterface.js', this.moduleDirectory + this.moduleName + 'Interface.js');
  this.template('_index.html', this.moduleDirectory + 'index.html');
  this.template('_nglue.json', this.moduleDirectory + 'nglue.json');
};
