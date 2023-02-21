import { exec } from "child_process";
import path from "path";
import esbuild from "esbuild";
import configuration from "src/deployment/serverless/configuration";
import fs from "fs";


/**
 * File created because this must be the root of serverless, but we want to have pnpm script to run deployment
 */
const main = async () => {
  const serverlessBinPath = path.join(process.cwd(), "node_modules", ".bin", "serverless");
  // write configuration to serverless.json, so serverless can read it
  // not using serverless.ts because I don't want to use ts-node (doesn't work well ESM etc)
  fs.writeFileSync(
    path.join(__dirname, "serverless.json"),
    JSON.stringify(configuration)
  );

  // serverless deploy --stage local
  const result = exec(
    // `node {} deploy --config configuration.ts --stage local`,
    `${serverlessBinPath} deploy --stage local`,
    {
      cwd: __dirname,
      shell: "/bin/bash",
    }
  );

  result.stderr?.on("data", (data) => {
    console.error(data.toString());
  })

  result.stdout?.on("data", (data) => {
    console.info(data.toString());
  })

  result.on("error", (error) => {
    console.error(error);
  })

  const exitCode = await new Promise((resolve) => {
    result.on("exit", (code) => {
      resolve(code);
    })
  })

  if (exitCode !== 0) {
    throw new Error("Serverless deploy failed");
  } else {
    console.info("Serverless deploy succeeded");
  }



  // console.info(result.stdout?.toString());
  // if (result.status !== 0) {
  //   console.error(result.stderr?.toString());
  //   console.error(result.error?.toString());
  //   throw new Error("Serverless deploy failed");
  // }

};

main();
