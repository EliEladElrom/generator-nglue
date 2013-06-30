# Generator-nglue
[![Build Status](https://secure.travis-ci.org/EladElrom/generator-nglue.png?branch=master)](https://travis-ci.org/EladElrom/generator-nglue)

Although it is a bit opinionated, it is not intended to be a *boilerplate* code.  This is `Yeoman` and `gruntjs` tasks to help build and manage large `Angularjs` projects that includes many re-usable components and apps that glow these re-usable components together.  The problem this generator is aiming to solve is to be able to create stand alone re-usable modules as well as glow these modules together as an `app`.
An `app` can be anything; a page on a website, a mobile app or page, component that include few modules attached together and so on.  This project holds the basics and meant to be simplify so you can suite the project to your exact needs. Additionally, it helps create structure to your large project so member of the team can dive in and start working and deploy quickly.

To get started, run grunt and bower commands:

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-nglue`
- Run: `yo nglue`

## Sub-commands

Create a module and add templates;

> yo nglue:module [module name]

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)