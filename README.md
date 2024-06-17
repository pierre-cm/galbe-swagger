# Galbe Swagger Plugin

Swagger UI plugin for [Galbe](https://galbe.dev/) framework.

# Install

```bash
bun add galbe-swagger
```

# Usage

```ts
import swagger from "galbe-swagger"

const galbe = new Galbe({
  // ...
  plugin: {
    swagger: {
      enabled: true,
      path: "/docs",
      auto: true,
      spec: {
        info: {
          title: "Galbe Swagger Plugin API",
          description: "Description of Galbe Swagger API.",
          version: "0.1.0",
        },
      },
    },
  },
})

galbe.use(swagger)

export default galbe
```

## Config

**enabled** (boolean): Enable or disable the plugin. Default: `true`.

**path** (string): Path to serve the Swagger UI. Default: `/docs`.

**auto** (boolean): Auto infer spec from Galbe instance. Default: `true`.

**spec** (object): Open API 3.0 spec. Default: `{}`. If auto is `true` it will overrides auto inferred properties.
