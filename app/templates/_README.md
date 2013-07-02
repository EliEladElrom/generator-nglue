# <%= _.slugify(projectName) %>

To get started, run grunt and bower commands:

## Getting started
- Create your project and cd: `mkdir <%= _.slugify(projectName) %> && cd $_`
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
  "name": "<%= _.slugify(projectName) %>-global-components",
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
style/<%= _.slugify(projectName) %>-global-components-0.0.0.css
style/<%= _.slugify(projectName) %>-global-components-latest.css
js/<%= _.slugify(projectName) %>-global-components-0.0.0.min.js
js/<%= _.slugify(projectName) %>-global-components-latest.min.js
</pre>

To build a min module component file for an app do the following;

> grunt app --src=detail-page-app

This grunt task will fetch the `nglue.config` file from the app and will glue together all the modules bower and none bower components as well as a less files.
The `nglue.config` file of an app includes all modules you are adding together and than it go to work and pick each `nglue.confoig` from each module to create the component
library and less files.  When you created the app using `yo nglue:apps home` it will create the scaffolding and template as well as basic `nglue.config` file.

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