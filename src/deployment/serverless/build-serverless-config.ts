import fs from "fs";
import path from "path";
import { SERVICE_ROOT } from "src/deployment/serverless/config";
import serverlessConfig from "src/deployment/serverless/serverless-config";

/**
 *   write configuration to serverless.json, so serverless can read it
 *   not using serverless.ts because I don't want to use ts-node (doesn't work well ESM etc)
 */
export const buildServerlessConfig = () => {
  fs.writeFileSync(
    path.join(SERVICE_ROOT, "serverless.json"),
    JSON.stringify(serverlessConfig)
  );
};
