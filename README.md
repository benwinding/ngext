# ngext

A routing framework for angular inspired by React's [next.js](https://github.com/vercel/next.js).

## Features

- File-based routing
- Lazy loaded modules generation

## Get Started

**Install**
``` sh
npm i -g ngext
```
**New App**
``` sh
ngext new myapp
```

## Why?

The routing in Angular has always annoyed me. It's verbose, complex and redundant. Most applications can get away with a *subset* of Angular's routing capabilities, which are:

- 1 to 1 relationship between Page Components and Routes
- Route path should be generated from the filesystem path of the Page Component

Reducing the application routing to these constraints, makes generating the boilerplate much easier and applications much simpler to understand. It's even closer to the way older websites used to work!

## How?

This project uses a 2 stage build system. Stage 1 translates the `@ngext` Components into standard Angular `@NgModule`'s and `@Components`. Stage 2 generates the application, like a normal angular application.

## Thanks

Special thanks to [next.js](https://nextjs.org/) and [nuxt.js](https://nuxtjs.org/), which were both big influences to this project.
