import { buildRoutes } from "../src/api-routes/generator-scripts/build-routes";
import { buildTemplates } from "src/build-lambdas/generator-scripts/build-templates";

async function main() {
  await buildRoutes();
  await buildTemplates();
}

main().then(() => console.log("DONE"));
