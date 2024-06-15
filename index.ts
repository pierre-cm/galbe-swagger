import type { Galbe, GalbePlugin } from "galbe"
import { OpenAPISerializer } from "galbe/extras"
import res from "./res"

const DEFAULT_PATH = "/docs"

const softMerge = (base: any, override: any) => {
  for (const key in override) {
    if (override[key] instanceof Object && !(override[key] instanceof Array)) {
      if (!base[key]) Object.assign(base, { [key]: {} })
      softMerge(base[key], override[key])
    } else Object.assign(base, { [key]: override[key] })
  }
  return base
}
export default {
  name: "swagger",
  async init(config, galbe: Galbe) {
    if (!(config?.enabled ?? true)) return
    let basePath = config?.path || DEFAULT_PATH
    if (!basePath.startsWith("/")) basePath = `/${basePath}`
    let auto = config?.auto ?? true
    let baseSpec = config?.spec || {}
    let spec = auto
      ? softMerge(await OpenAPISerializer(galbe), baseSpec)
      : baseSpec

    galbe.get(basePath, async (ctx) => {
      ctx.set.headers["location"] = `${basePath}/`
      ctx.set.status = 302
    })
    galbe.get(`${basePath}/*`, async (ctx) => {
      let fPath = new URL(ctx.request.url).pathname.slice(basePath.length)
      if (fPath === "/") fPath = "/index.html"

      if (fPath.endsWith(".js"))
        ctx.set.headers["content-type"] = "application/javascript"
      else if (fPath.endsWith(".css"))
        ctx.set.headers["content-type"] = "text/css"
      else if (fPath.endsWith(".html"))
        ctx.set.headers["content-type"] = "text/html"
      else {
        let type = "application/octet-stream"
        if (fPath.endsWith(".png")) type = "image/png"
        ctx.set.headers["content-type"] = type
        //@ts-ignore
        return res[fPath].arrayBuffer()
      }

      //@ts-ignore
      let file = await res[fPath].text()

      if (fPath === "/index.html") {
        file = file.replace(
          /<title>([^<]*)<\/title>/,
          `<title>${spec?.info?.title || "Swagger UI"}</title>`
        )
        file = file.replace(
          /<\/body>/,
          `<script>
          window.onload = function() {
              const ui = SwaggerUIBundle({
                  spec: ${JSON.stringify(spec)},
                  dom_id: '#swagger-ui',
                  presets: [
                      SwaggerUIBundle.presets.apis,
                      SwaggerUIStandalonePreset
                  ],
                  layout: "BaseLayout",
                  // docExpansion: "none", // Collapse all sections by default
                  operationsSorter: "alpha", // Sort operations alphabetically
                  defaultModelRendering: "model", // Show schemas by default
                  showExtensions: true, // Display extensions (x- values)
                  showCommonExtensions: true, // Display common extensions
                  supportedSubmitMethods: ["get", "post", "put", "delete", "patch"] // Only allow these methods
              });
          }
      </script>`
        )
      }
      return file
    })
    if (Bun.env.BUN_ENV === "development")
      console.log(
        `\x1b[1;30m📖 Swagger UI\x1b[0m \x1b[4;34mhttp://localhost:${galbe?.config?.port}${basePath}\x1b[0m\n`
      )
  },
} as GalbePlugin
