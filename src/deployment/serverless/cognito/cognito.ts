import { AWS } from "@serverless/typescript";
import { COGNITO_USER_POOL_NAME } from "src/deployment/serverless/cognito/constants";
import { O, F } from "ts-toolbelt";

export const cognitoPartialConfig = {
  resources: {
    Resources: {
      CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: COGNITO_USER_POOL_NAME,
          UsernameAttributes: ["email"],
        },
      },
    },
  },
  provider: {
    environment: {
      COGNITO_USER_POOL_NAME,
      COGNITO_USER_POOL_ID: {
        Ref: "CognitoUserPool",
      },
    },
  },
} satisfies O.Partial<AWS, "deep">;
