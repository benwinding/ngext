# ngext

A new ngext project generates several folders, but not all of them are necessary. Below is the function of each folder.

## `~/pages`

This directory contains your application *pages*.
Each page file is mapped to a url route in your application.

```
PAGE FILE                    ROUTE PATH
~/pages/page.ts          ->  /page
~/pages/folder/index.ts  ->  /folder
~/pages/folder/page.ts   ->  /folder/page
~/pages/users/:id.ts     ->  /users/:id
```

Compiled routes are found in `~/.ngext/src/routes.ts`

## `~/static`

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your static files.
Each file inside this directory is mapped to `/`.
Thus you'd want to delete this README.md before deploying to production.

Example: `~/static/robots.txt` is mapped as `/robots.txt`.

## `~/components`

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your application *components*.
Include them in your page modules

## `~/global`

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your application *global* NgModule.
The `GlobalModule` gets added to the `app.module`, and should *NOT* be included in any pages imports. 
Services, Modules and Compnoents in this module will be accessible from all pages in the application.

## `~/layouts`

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your application *layouts*.
Layouts let you define custom arrangements for each page route.

## `~/guards`

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your application *guards*.
Guards let you define custom functions that can be run, before loading page routes.

## `~/styles`

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains all your *SCSS styles*, which are included by ngext in the build.

