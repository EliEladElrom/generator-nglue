'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ModuleGenerator = module.exports = function ModuleGenerator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);
    console.log('Creating module  ' + this.name + ' at \'code_base/modules/\'');
    this.moduleDirectory = 'code_base/modules/' + this.name + '/';
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.createStructure = function createStructure() {
  this.mkdir(this.moduleDirectory);
  this.mkdir(this.moduleDirectory + 'app');
  this.mkdir(this.moduleDirectory + 'assets');
  this.mkdir(this.moduleDirectory + 'assets/style');
  this.mkdir(this.moduleDirectory + 'assets/images');
  this.mkdir(this.moduleDirectory + 'assets/components');
  this.mkdir(this.moduleDirectory + 'assets/bower_components');
};

ModuleGenerator.prototype.files = function files() {
  this.template('app.js', this.moduleDirectory + 'app/app.js');
  this.template('_partial.html', this.moduleDirectory + this.name + '_partial.html');
  this.template('_controller.js', this.moduleDirectory + this.name + '_controller.js');
  this.template('_index.html', this.moduleDirectory + 'index.html');
  this.template('_config.json', this.moduleDirectory + 'config.json');
};
