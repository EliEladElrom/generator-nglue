# Generator-nglue
[![Build Status](https://secure.travis-ci.org/eladelrom/generator-nglue.png?branch=master)](https://travis-ci.org/eladelrom/generator-nglue)

![nglue logo](https://raw.github.com/EladElrom/poet/ei-pages/effectiveidea/public/images/nglue-logo-small.jpg)

`nglue` is lightweight architectural micro-framework it stands for the internal architecture of the processor. It provides the skeleton, around the exact needs/features of your application. In other words, nglue framework provides the starting point for your application’s architecture.

Although it is a bit opinionated, it is not intended to be a *boilerplate* code.  This is `Yeoman` generator and `gruntjs` tasks to help you build and manage large `Angularjs` projects that includes many re-usable modules (components) and apps.  This project will help you glue these re-usable modules together as one app.
The problem this generator is aiming to solve is to be able to create stand alone re-usable modules as well as glue these modules together as an `app` so you can share these modules between projects and develop each module as it's own entity.

An `app` can be anything; a page on a website, a mobile app or page, component that include few modules attached together and so on.  This project holds the basics and meant to be simplify so you can suite the project to your exact needs. Additionally, it helps create structure to your large project so member of the team can dive in and start working and deploy quickly.
Deployment scripts helps take these modules from stand alone to glued app and than deployment.

## workflow

The first step is creating a re-usable modules, the idea is that you try and extract each piece of functionality as it's own entity
and once each module works on it's own than you `glue` them together to form an app.  Than you deploy and finally you integrate into a site or as an application.

## Getting started
- Create your project and cd: `mkdir myproject && cd $_`
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-nglue`
- Run: `yo nglue`

This will create the project scaffolding, install bower components & install grunt.

## Demonstration

[![Demo](https://raw.github.com/EladElrom/poet/ei-pages/effectiveidea/public/images/nglue-asciiio.jpg)](http://ascii.io/a/4165/)

## Sub-commands

Create a module and add templates;

> yo nglue:module [module name]

Create an app and add templates;

> yo nglue:apps [app name]

## Deployment

### Concatenating minifies global js files

Grunt command to combines and minifies all the global js files for usage by modules and apps.  Here you can add all the js components you install using bower or added manually.  By default the generator installs; `angular` and `angular-mocks`.
The magic happens in the `nglue.json` file, you can add all the files you need to be usage by your project globally.  Globally, means that every single module used would need these libraries.

In addition to global js files you can also add your global less files and have them compile into one css file.  By default we add `base.less` file, but feel free to add other files as needed, just ensure you add them to this config file to build.

Here's the default initial file you are given when you initialize the generator;

<pre>
{
  "version": "0.0.0",
  "name": "your-project-name-global-components",
  "dependencies": {
    "angular": "bower_components/angular/angular.js"
  },
  "devDependencies": {
    "angular-mocks": "bower_components/angular-mocks/angular-mocks.js"
  },
  "less": {
    "base" : "../styles/base.less"
  },
  "copy": {
    "src": "assets/images"
  }
}
</pre>

### Grunt tasks:

>grunt

Once you run `grunt` the compiled js and css files will be published to `code_base/dist/`.  Assets files will be copied, less files will be compiled.
It uses the `config.js > name` and `version` to generate the names as follow;

<pre>
// global style
styles/your-project-name-global-components-0.0.0.css
styles/your-project-name-global-components-latest.css

// global components
js/your-project-name-global-components-0.0.0.min.js
js/your-project-name-global-components-latest.min.js

// global dev-dependencies components
js/your-project-name-global-components-dev-dependencies-0.0.0.min.js
js/your-project-name-global-components-dev-dependencies-latest.min.js
</pre>

To build a min module component file for an app do the following;

> grunt app --src=detail-page-app

This grunt task will fetch the `nglue.config` file from the app and will glue together all the modules bower and none bower components as well as a less files.
The `nglue.config` file of an app includes all modules you are adding together and than it go to work and pick each `nglue.confoig` from each module to create the component
library and less files.  When you created the app using `yo nglue:apps detail-page` it will create the scaffolding and template as well as basic `nglue.config` file.

Here's an example of an app `nglue.config` file;

<pre>
{
  "version": "0.0.1",
  "name": "detail-page-app",
  "dependencies": {
  },
  "nglue-dependencies": {
    "map": "map",
    "dropdown": "dropdown",
    "infinite-scroll": "infinite-scroll",
    "menu": "menu",
    "sorting": "sorting"
}
</pre>

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
