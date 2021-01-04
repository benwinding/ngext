# PAGES

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
