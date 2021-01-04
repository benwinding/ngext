<p align="center">
  <img alt="ngext" width="300" src="https://i.imgur.com/nK7qiGI.png">
</p>

<div align="center">
A routing framework for angular inspired by React's <a href="https://github.com/vercel/next.js">next.js</a>.
</div>

<div align="center">

<!-- [START badges] -->
[![NPM Version](https://img.shields.io/npm/v/ngext.svg)](https://www.npmjs.com/package/ngext) 
[![License](https://img.shields.io/npm/l/ngext.svg)](https://github.com/benwinding/ngext/blob/master/LICENSE) 
[![Downloads/week](https://img.shields.io/npm/dm/ngext.svg)](https://www.npmjs.com/package/ngext) 
[![Github Issues](https://img.shields.io/github/issues/benwinding/ngext.svg)](https://github.com/benwinding/ngext)
<!-- [END badges] -->

</div>

## Introduction

Ngext is a tool which abstracts an angular application and drastically simplifies the routing. It has the following features: 

- File-based routing (no more routing modules!)
- All lazy loaded modules generation
- Dynamic configurations (no more static angular.json files)
- Declarative route layouts
- Server-side rendering, (HTML file for each page!)
- Compatible with all your existing angular files `@NgModules`, `@Components`, ...etc

## Links

- [Documentation](https://benwinding.github.io/ngext/)

## Get Started

**Install**
``` sh
npm i -g ngext
```
**Usage**
```
Usage: ngext [options] [command]

Options:
  -v, --version      output the version number
  -h, --help         display help for command

Commands:
  new [ProjectName]  Creates a new project
  build              Builds the ngext app
  export             Exports the ngext app with SSR
  dev                Runs the ngext app locally
  help [command]     display help for command
```

## Why use this?

Angular has many elegant abstractions, `@Component`, `@Module`, `@Injectable`. However, the routing in Angular is not a simple abstraction.

In order to add a new page, Angular routing requires that you edit 3 places; add a component file, declare component in a module, and add a route to a routing module.

![comparison](../imgs/ngext-comparison.png)

This project attempts to encapsulate this into a single abstraction `@PageComponent`, which contains the component, dependencies and the route path which is generated from the page location. Making it easier than ever to add new pages to Angular apps.
