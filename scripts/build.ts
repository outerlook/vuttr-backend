import { buildRoutes } from "../src/api-routes/generator-scripts/build-routes";
import { buildTemplates } from "src/build-lambdas/generator-scripts/build-templates";
import { clearDirectory } from "src/utils/clear-directory";
import { OUT_DIR_PATH } from "src/paths-config";
import { createDirRecursively } from "src/utils/create-dir-recursively";
import { buildServerlessConfig } from "src/deployment/serverless/build-serverless-config";

async function main() {
  createDirRecursively(OUT_DIR_PATH)
  clearDirectory(OUT_DIR_PATH);
  await buildRoutes();
  await buildTemplates();
  await buildServerlessConfig();
}

main().then(() => console.log("DONE"));
