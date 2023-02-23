import { AWS } from "@serverless/typescript";
import { COGNITO_USER_POOL_NAME } from "src/deployment/serverless/cognito/constants";
import { O } from "ts-toolbelt";

const cognitoUserPool = "CognitoUserPool";
export const cognitoPartialConfig = {
  resources: {
    Resources: {
      [cognitoUserPool]: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: COGNITO_USER_POOL_NAME,
          UsernameAttributes: ["email"],
          AutoVerifiedAttributes: ["email"],
        },
      },
      CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: COGNITO_USER_POOL_NAME,
          UserPoolId: {
            Ref: cognitoUserPool,
          },
          GenerateSecret: false,
          ExplicitAuthFlows: ["ADMIN_NO_SRP_AUTH"],
        },
      },
    },
  },
  provider: {
    environment: {
      COGNITO_USER_POOL_NAME,
      COGNITO_USER_POOL_ID: {
        Ref: cognitoUserPool,
      },
    },
  },
} satisfies O.Partial<AWS, "deep">;
