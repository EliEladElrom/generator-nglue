'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.askForName = function askForName() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'What\'s your project\'s name?'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};


Generator.prototype.app = function app() {
  this.mkdir('code_base');
  this.mkdir('code_base/apps');
//  this.mkdir('code_base/apps/mobile');
//  this.mkdir('code_base/apps/web');
  this.mkdir('code_base/assets');
  this.mkdir('code_base/assets/bower_components');
  this.mkdir('code_base/assets/components');
  this.mkdir('code_base/assets/css');
  this.mkdir('code_base/assets/fonts');
  this.mkdir('code_base/assets/images');
  this.mkdir('code_base/modules');
  this.mkdir('compile');
  this.mkdir('code_base/dist');
  this.mkdir('dist');

  this.copy('_.bowerrc', '.bowerrc');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'code_base/assets/config.json');
};

Generator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};




//Generator.prototype.setupEnv = function setupEnv() {
//  // Copies the contents of the generator `templates`
//  // directory into your users new application path
//  this.sourceRoot(path.join(__dirname, '../templates/common'));
//  this.directory('root', '.', true);
//  this.copy('gitignore', '.gitignore');
//};
