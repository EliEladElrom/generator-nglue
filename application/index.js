'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


var ApplicationGenerator = module.exports = function ApplicationGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ApplicationGenerator, yeoman.generators.NamedBase);


