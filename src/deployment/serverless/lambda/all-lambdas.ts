// don't forget to build before expecting this to work
import bundledLambdaConfig from "src/build-lambdas/__GENERATED__/bundles.json" assert { type: "json" };
import { O } from "ts-toolbelt";
import { AWS } from "@serverless/typescript";
import { lambdaConfigFromFn } from "src/deployment/serverless/lambda/lambda-from-fn";

export const lambdasConfig = {
  // @ts-ignore 😳
  functions: bundledLambdaConfig.reduce((acc, cfg) => {
    const newCfg = lambdaConfigFromFn(cfg);
    return { ...acc, ...newCfg } as NonNullable<AWS["functions"]>;
  }, {} as NonNullable<AWS["functions"]>),
} satisfies O.Partial<AWS, "deep"> as O.Partial<AWS, "deep">;
