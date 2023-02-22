import routesConfig from "out/routes/routes-config.json";
import path from "path";
import { RouteConfig } from "src/api-routes/generator-scripts/generate-routes-config";
import { OUT_DIR_PATH } from "src/config";

export const TEMPLATE_PATH = require.resolve("./template-lambda.ts");
export const GENERATED_PATH = path.join(OUT_DIR_PATH, "lambdas");
export const BUNDLES_PATH = path.join(GENERATED_PATH, "bundles");
export const LAMBDAS_PATH = path.join(GENERATED_PATH, "source");

export type LambdaConfig = {
  config: {
    requiresAuth: boolean;
  };
} & RouteConfig;

export { routesConfig };
