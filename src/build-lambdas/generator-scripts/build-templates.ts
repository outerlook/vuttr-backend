import {
  BUNDLES_PATH,
  GENERATED_PATH,
  LAMBDAS_PATH,
  routesConfig,
} from "src/build-lambdas/generator-scripts/config";
import { clearDirectory } from "src/utils/clear-directory";
import fs from "fs";
import { bundleLambdas } from "src/build-lambdas/generator-scripts/bundle-lambdas";
import { generateLambdaFiles } from "src/build-lambdas/generator-scripts/generate-lambda-files";

export const buildTemplates = async () => {
  reinitializeGeneratedDirectory();

  const builtLambdas = await generateLambdaFiles(routesConfig);
  const bundledLambdas = await bundleLambdas(builtLambdas);

  // create a file with the list of lambdas
  fs.writeFileSync(
    `${GENERATED_PATH}/bundles.json`,
    JSON.stringify(bundledLambdas, null, 2)
  );
};

/**
 * clear the generated directory and create the necessary folders
 */
const reinitializeGeneratedDirectory = () => {
  clearDirectory(GENERATED_PATH);
  const necessaryFolders = [BUNDLES_PATH, LAMBDAS_PATH];
  necessaryFolders.forEach((folder) => {
    fs.mkdirSync(folder, { recursive: true });
  });
};
