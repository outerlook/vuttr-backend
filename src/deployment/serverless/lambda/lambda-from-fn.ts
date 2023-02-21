import { AWS } from "@serverless/typescript";
import type { O } from "ts-toolbelt";
import { LambdaConfig } from "src/build-lambdas/generator-scripts/config";
import { AUTHORIZER_REF } from "src/deployment/serverless/cognito/authorizer";

export const lambdaConfigFromFn = ({
  config,
  filepath,
  uriPath,
  method,
}: LambdaConfig): O.Partial<AWS, "deep">["functions"] => {
  const safeUri = uriPath
    .split("/")
    .filter(Boolean) // remove empty strings
    .join("-")
    .replace(":", ""); // remove colons like :id
  const functionName = safeUri + "-" + method.toLowerCase();
  const fnPathWithoutExt = filepath.replace(/\.(j|t)s$/, "");
  return {
    [functionName]: {
      handler: `${fnPathWithoutExt}.handler`,
      events: [
        {
          http: {
            method,
            authorizer: config.requiresAuth
              ? {
                  type: "COGNITO_USER_POOLS",
                  authorizerId: {
                    Ref: AUTHORIZER_REF,
                  },
                }
              : undefined,
            path: uriPath,
          },
        },
      ],
    },
  };
};
