import { BUNDLES_PATH, GENERATED_PATH, LAMBDAS_PATH, routesConfig } from "src/lambda-adapter/lambdas-config";
import fs from "fs";
import { bundleLambdas } from "src/lambda-adapter/generator-scripts/bundle-lambdas";
import { generateLambdaFiles } from "src/lambda-adapter/generator-scripts/generate-lambda-files";

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
  const necessaryFolders = [BUNDLES_PATH, LAMBDAS_PATH];
  necessaryFolders.forEach((folder) => {
    fs.mkdirSync(folder, { recursive: true });
  });
};
