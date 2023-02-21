import { RouteConfig } from "src/api-routes/generator-scripts/generate-routes-config";
import { LAMBDAS_PATH } from "src/build-lambdas/generator-scripts/config";
import path from "path";
import fs from "fs";
import { getContentForLambdaFile } from "src/build-lambdas/generator-scripts/get-content-from-lambda-template";

export const generateLambdaFiles = async (routesConfig: RouteConfig[]) => {
  const promises = routesConfig.map(async (cfg, index) => {
    const lambdaContent = await getContentForLambdaFile(cfg);

    // new lambda names will be lambda-01.ts, lambda-02.ts, etc
    const lambdaName = `lambda-${index.toString().padStart(2, "0")}.ts`;
    const lambdaDir = LAMBDAS_PATH;
    const lambdaPath = path.join(lambdaDir, lambdaName);

    fs.writeFileSync(lambdaPath, lambdaContent);

    return {
      ...cfg,
      functionName: "handler", // defined in template
      filepath: lambdaPath,
    } as RouteConfig;
  });

  return Promise.all(promises);
};
