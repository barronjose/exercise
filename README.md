## Description
Responsive Application with dummy service post calls to inject info into the page.

## Decision usage of technologies

The project contain the latest version of [Jquery](https://jquery.com/). The use of the library was decided because it reducing the coding time against using Vanilla JS because of the build in functions and Ajax request methods. There's no need for using [Bower](https://bower.io/), since jQuery is the only library that's is going to be used on the application.

It was decided not to use of a HTML responsive library such as [Bootstrap](http://getbootstrap.com/) because of the project scope. There's no need for a library of such size if the app requirements doesn't match or if most of the functions are not going to be used in.

The use of [Gulp](http://gulpjs.com/) was decided because is a simple Task Manager, there are multiple tasks available that helps to reduce the environment setup time and build process.

The CSS preprocessor [Sass](http://sass-lang.com/) is included in the project because it helps you having a more organized project, it reuses code using variables/functions and the capability of nesting code.

## Tools
- Gulp
- Ruby

## Dependencies
- Node 4 or newer
- NPM

## Install Node
To see Node documentation of how to install it click [here](https://nodejs.org/en/download/package-manager/)

## Setup
For this project you need to have [Nodejs v4.4.7](https://nodejs.org/en/), [Gulp](http://gulpjs.com/) and [Ruby](https://www.ruby-lang.org/en/downloads/) installed.

```
    git clone https://github.com/barronjose/exercise.git
    cd exercise
    npm install
    gem install sass
    gulp

```
