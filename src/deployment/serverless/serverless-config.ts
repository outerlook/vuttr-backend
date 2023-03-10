import type { AWS } from "@serverless/typescript";
import { cognitoPartialConfig } from "src/deployment/serverless/cognito/cognito";
import { deepmerge } from "@fastify/deepmerge";
import { lambdasConfig } from "src/deployment/serverless/lambda/all-lambdas";
import { dynamodbConfig } from "src/deployment/serverless/dynamodb/dynamodb-config";
import { O } from "ts-toolbelt";
import { authorizerConfig } from "src/deployment/serverless/cognito/authorizer";

const baseConfig = {
  service: "vuttr-backend",
  frameworkVersion: "*",
  provider: {
    region: "sa-east-1",
    name: "aws",
    runtime: "nodejs16.x",
  },
} satisfies AWS;

// creating a type-safe merge function
const mergeAWSConfig = (...configs: O.Partial<AWS, "deep">[]) =>
  deepmerge({ all: true })(...configs);

export default mergeAWSConfig(
  baseConfig,
  cognitoPartialConfig,
  lambdasConfig,
  dynamodbConfig,
  authorizerConfig
);
