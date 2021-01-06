# cli
The ngext CLI has the following functionality.

## `ngext new $APP_NAME`

Creates a new **ngext** app in the current directory (or absolute path) under the folder `./$APP_NAME`

## `ngext build`

Builds the **ngext** app.

## `ngext export`

Builds the **ngext** app, then applys SSR (Server-Side Rendering) and outputs the app to the folder specified in `ngext.config.js`.

## `ngext dev`

Serves the **ngext** app, watches for changes.

```
Options:
  -p, --port <PORT>  Port for the dev server (default is 4200)
```

## `ngext help`

Shows commands with help.

## `ngext -v`

Outputs npm version number.
