// /home/outerlook/GitHub/desafio-backend-mimoo/src/api-routes/__GENERATED__/routes-config.json
import routesConfig from "src/api-routes/__GENERATED__/routes-config.json";
import path from "path";
import { RouteConfig } from "src/api-routes/generator-scripts/generate-routes-config";

export const TEMPLATE_PATH = require.resolve("./template-lambda.ts");
export const GENERATED_PATH = path.join(process.cwd(), "src/build-lambdas/__GENERATED__");
export const BUNDLES_PATH = path.join(GENERATED_PATH, "bundles");
export const LAMBDAS_PATH = path.join(GENERATED_PATH, "lambdas");

export type LambdaConfig = {
  config: {
    requiresAuth: boolean;
  }
} & RouteConfig

export { routesConfig };
