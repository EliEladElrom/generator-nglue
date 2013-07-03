'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('Creating module ' + this.name + ' at \'code_base/modules/\'');
  this.moduleDirectory = 'code_base/modules/' + this.name + '/';
  this.moduleName = this.name + 'Module';
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
  this.template('assets/views/_Module.html', this.moduleDirectory + 'assets/views/' + this.moduleName + '.html');
  this.template('_index.html', this.moduleDirectory + 'index.html');
  this.template('_nglue.json', this.moduleDirectory + 'nglue.json');
};
