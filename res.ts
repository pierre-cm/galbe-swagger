
import { file } from "bun";

import favicon16x16 from 'swagger-ui-dist/favicon-16x16.png' with {type: "file"}
import favicon32x32 from 'swagger-ui-dist/favicon-32x32.png' with {type: "file"}
import indexCss from 'swagger-ui-dist/index.css' with {type: "file"}
import indexHtml from 'swagger-ui-dist/index.html' with {type: "file"}
import swaggerInitializerJs from 'swagger-ui-dist/swagger-initializer.js' with {type: "file"}
import swaggerUiBundleJs from 'swagger-ui-dist/swagger-ui-bundle.js' with {type: "file"}
import swaggerUiStandalonePresetJs from 'swagger-ui-dist/swagger-ui-standalone-preset.js' with {type: "file"}
import swaggerUiCss from 'swagger-ui-dist/swagger-ui.css' with {type: "file"}
import swaggerUiCssMap from 'swagger-ui-dist/swagger-ui.css.map' with {type: "file"}
import swaggerUiJs from 'swagger-ui-dist/swagger-ui.js' with {type: "file"}

export default {
  '/favicon-16x16.png': file(favicon16x16),
  '/favicon-32x32.png': file(favicon32x32),
  '/index.css': file(indexCss),
  '/index.html': file(indexHtml),
  '/swagger-initializer.js': file(swaggerInitializerJs),
  '/swagger-ui-bundle.js': file(swaggerUiBundleJs),
  '/swagger-ui-standalone-preset.js': file(swaggerUiStandalonePresetJs),
  '/swagger-ui.css': file(swaggerUiCss),
  '/swagger-ui.css.map': file(swaggerUiCssMap),
  '/swagger-ui.js': file(swaggerUiJs),
}