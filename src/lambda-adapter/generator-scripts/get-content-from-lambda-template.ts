import { RouteConfig } from "src/api-routes/generator-scripts/generate-routes-config";
import fs from "fs";
import { TEMPLATE_PATH } from "src/lambda-adapter/lambdas-config";

/**
 * to generate the lambda functions
 * it uses template-lambda.ts as a template
 * then replaces `"TEMPLATE" as any` with the function name
 * and add the import statement
 */
export const getContentForLambdaFile = async (config: RouteConfig) => {
  const { filepath, functionName } = config;
  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");
  const newTemplate = template.replace(
    `"TEMPLATE" as any`,
    functionName as string
  );
  const relativePath = filepath
    // remove root path to make it relative from root
    .replace(process.cwd() + "/", "")
    // remove extension
    .replace(".ts", "");
  const newTemplateWithImport = `import { ${functionName} } from "${relativePath}";\n${newTemplate}`;

  return newTemplateWithImport;
};
