# Generator-nglue
[![Build Status](https://secure.travis-ci.org/EladElrom/generator-nglue.png?branch=master)](https://travis-ci.org/EladElrom/generator-nglue)

Although it is a bit opinionated, it is not intended to be a *boilerplate* code.  This is `Yeoman` generator and `gruntjs` tasks to help build and manage large `Angularjs` projects that includes many re-usable modules (components/widgets) and apps that glow these re-usable modules together.  The problem this generator is aiming to solve is to be able to create stand alone re-usable modules as well as glow these modules together as an `app`.
An `app` can be anything; a page on a website, a mobile app or page, component that include few modules attached together and so on.  This project holds the basics and meant to be simplify so you can suite the project to your exact needs. Additionally, it helps create structure to your large project so member of the team can dive in and start working and deploy quickly.

## workflow

The first step is creating a re-usable modules (component), the idea is that you try and extract each piece of functionality as it's own entity
and once each module works on it's own than you `glue` them together to form an app.  Than you deploy and finally you integrate into a site or as an application.

To get started, run grunt and bower commands:

## Getting started
- Create your project and cd: `mkdir myproject && cd $_`
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-nglue`
- Run: `yo nglue`

## Sub-commands

Create a module and add templates;

> yo nglue:module [module name]

Create an app and add templates;

> yo nglue:apps [app name]

## Concatenating minifies global js files

Grunt command to combines and minifies all the global js files for usage by modules and apps.  Here you can add all the js components you install using bower or added manually.  By default the generator installs; `angular` and `angular-mocks`.
The magic happens in the `nglue.json` file, you can add all the files you need to be usage by your project globally.  Globally, means that every single module used would need these libraries.

In addition to global js files you can also add your global less files and have them compile into one css file.  By default we add `base.less` file, but feel free to add other files as needed, just ensure you add them to this config file to build.

Here's the default initial file you are given when you initialize the generator;

<pre>
{
  "version": "0.0.0",
  "name": "your-project-name-global-components",
  "dependencies": {
    "angular": "bower_components/angular/angular.js",
    "angular-mocks": "bower_components/angular-mocks/angular-mocks.js"
  },
  "less": {
    "base" : "../style/base.less"
  }
}
</pre>

Once you run `grunt` the compiled js and css files will be published to `code_base/dist/`.  It uses the `config.js > name` and `version` to generate the names as follow;

<pre>
style/your-project-name-global-components-0.0.0.css
style/your-project-name-global-components-latest.css
js/your-project-name-global-components-0.0.0.min.js
js/your-project-name-global-components-latest.min.js
</pre>

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)