'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ApplicationGenerator = module.exports = function ApplicationGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('Creating app ' + this.name + ' at \'code_base/apps/\'');
  this.moduleDirectory = 'code_base/apps/' + this.name + '/';
};

util.inherits(ApplicationGenerator, yeoman.generators.NamedBase);

ApplicationGenerator.prototype.createStructure = function createStructure() {
  this.mkdir(this.moduleDirectory);
  this.mkdir(this.moduleDirectory + 'assets');
  this.mkdir(this.moduleDirectory + 'assets/style');
  this.mkdir(this.moduleDirectory + 'assets/images');
  this.mkdir(this.moduleDirectory + 'assets/components');
  this.mkdir(this.moduleDirectory + 'assets/bower_components');
};

ApplicationGenerator.prototype.files = function files() {
  this.template('app.js', this.moduleDirectory + 'app/app.js');
  this.template('_index.html', this.moduleDirectory + 'index.html');
  this.template('_nglue.json', this.moduleDirectory + 'nglue.json');
};


