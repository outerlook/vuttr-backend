import type { AWS } from "@serverless/typescript";
import { cognitoPartialConfig } from "src/deployment/serverless/cognito/cognito";
import { deepmerge } from "@fastify/deepmerge";
import { lambdasConfig } from "src/deployment/serverless/lambda/all-lambdas";
import { dynamodbConfig } from "src/deployment/serverless/dynamodb/dynamodb-config";
import { O } from "ts-toolbelt";

const serverlessConfiguration = {
  service: "desafio-backend",
  frameworkVersion: "*",
  plugins: ["serverless-localstack"],
  custom: {
    localstack: {
      stages: ["local"],
      host: "http://localhost",
      edgePort: 4566,
      autostart: true,
      lambda: {
        mountCode: true,
      },
      networks: ["host"],
    },
  },
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
  },
} satisfies AWS;

// creating a type-safe merge function
const mergeAWSConfig = (...configs: O.Partial<AWS, "deep">[]) =>
  deepmerge({ all: true })(...configs);

export default mergeAWSConfig(
  serverlessConfiguration,
  cognitoPartialConfig,
  lambdasConfig,
  dynamodbConfig
);
