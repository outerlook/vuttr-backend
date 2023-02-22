import esbuild from "esbuild";
import { RouteConfig } from "src/api-routes/generator-scripts/generate-routes-config";
import { BUNDLES_PATH, LambdaConfig } from "src/lambda-adapter/lambdas-config";
import murmurhash from "murmurhash";
import fs from "fs";
import { isAuthenticationRequired } from "src/api-routes/auth/authorization-config";

export const bundleLambdas = async (
  routeConfigs: RouteConfig[]
): Promise<RouteConfig[]> => {
  const promises = routeConfigs.map(async (cfg) => {
    const { filepath, functionName } = cfg;

    const result = await esbuild.build({
      entryPoints: [filepath],
      bundle: true,
      write: false,
      platform: "node",
      target: "node16",
      external: ["aws-sdk"],
      format: "cjs",
      logLevel: "error",
    });

    // won't change if content doesn't change
    const hash = murmurhash.v3(result.outputFiles[0].text, 0).toString(16);
    const bundleName = `${hash}.js`;
    const bundlePath = `${BUNDLES_PATH}/${bundleName}`;
    fs.writeFileSync(bundlePath, result.outputFiles[0].text);

    return {
      ...cfg,
      functionName,
      filepath: bundlePath,
      config: {
        requiresAuth: isAuthenticationRequired(cfg.uriPath, cfg.method),
      },
    } as LambdaConfig;
  });

  return Promise.all(promises);
};
