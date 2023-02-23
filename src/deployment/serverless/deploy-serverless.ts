import { exec } from "child_process";
import path from "path";
import { SERVICE_ROOT } from "src/deployment/serverless/config";

/**
 * File created because this must be the root of serverless, but we want to have pnpm script to run deployment
 */
const deployServerless = async () => {
  const serverlessBinPath = path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    "serverless"
  );

  const additionalArgsFromCLI = process.argv.slice(2).join(" ");

  // serverless deploy --stage local
  const result = exec(`${serverlessBinPath} deploy ${additionalArgsFromCLI}`, {
    cwd: SERVICE_ROOT,
    shell: "/bin/bash",
  });

  result.stderr?.on("data", (data) => {
    console.error(data.toString());
  });

  result.stdout?.on("data", (data) => {
    console.info(data.toString());
  });

  result.on("error", (error) => {
    console.error(error);
  });

  const exitCode = await new Promise((resolve) => {
    result.on("exit", (code) => {
      resolve(code);
    });
  });

  if (exitCode !== 0) {
    throw new Error("Serverless deploy failed");
  } else {
    console.info("Serverless deploy succeeded");
  }
};

deployServerless();
