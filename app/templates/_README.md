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

## Concatenating minifies global js files

Grunt command to combines and minifies all the global js files for usage by modules and apps.  Here you can add all the js components you install using bower or added manually.  By default the generator installs; `angular` and `angular-mocks`.
The magic happens in the `config.json` file, you can add all the files you need to be usage by your project globally.  Globally, means that every single module used would need these libraries.

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

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)