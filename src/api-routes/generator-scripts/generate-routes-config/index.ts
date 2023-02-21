import path from "path";
import glob from "glob";
import { processFile } from "src/api-routes/generator-scripts/process-file/process-file";
import fs from "fs";

const METHODS = ["get", "post", "put", "del", "patch"];

export type RouteConfig = {
  filepath: string;
  uriPath: string;
  method: (typeof METHODS)[number];
  functionName: string;
};
export const generateRoutesConfig = async (
  rootPath: string,
  outputDir: string
): Promise<void> => {
  const routesConfigPath = path.join(outputDir, "routes-config.json");
  const files = await getFiles(rootPath);

  const filesWithFunctions = files.map((file) => processFile(file, rootPath));

  const routesConfig: RouteConfig[] =
    filesWithFunctions.flatMap(fileToRouteConfig);

  fs.writeFileSync(routesConfigPath, JSON.stringify(routesConfig));

  // generate d.ts file:
  const dTsContent = `declare const items: ${JSON.stringify(routesConfig)}; export default items;`;
  const dtsPath = path.join(outputDir, "routes-config.d.ts");
  fs.writeFileSync(dtsPath, dTsContent);
};

const fileToRouteConfig = (
  file: ReturnType<typeof processFile>
): RouteConfig[] => {
  const { filepath, uriPath, functionNames } = file;
  return functionNames.map((functionName) => {
    const method = functionName.toLowerCase();
    if (!METHODS.includes(method))
      throw new Error(`Invalid method: ${method} in file ${filepath}`);
    return {
      filepath,
      uriPath,
      method: method === "del" ? "delete" : method, // delete is a reserved word for fn declarations
      functionName,
    };
  });
};

const getFiles = async (rootPath: string): Promise<string[]> => {
  const pattern = path.join(rootPath, "**", "*.ts");
  return new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
};
