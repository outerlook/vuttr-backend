import { AWS } from "@serverless/typescript";
import { O } from "ts-toolbelt";
import { COGNITO_USER_POOL_NAME } from "src/deployment/serverless/cognito/constants";

export const AUTHORIZER_REF = "BasicAuthorizer";
export const authorizerConfig = {
  resources: {
    Resources: {
      // will be HTTP API authorizer
      [AUTHORIZER_REF]: {
        Type: "AWS::ApiGateway::Authorizer",
        Properties: {
          Name: COGNITO_USER_POOL_NAME,
          Type: "COGNITO_USER_POOLS",
          ProviderARNs: [
            {
              "Fn::GetAtt": ["CognitoUserPool", "Arn"],
            },
          ],
          IdentitySource: "method.request.header.Authorization",
          RestApiId: {
            Ref: "ApiGatewayRestApi",
          },
        },
      },
    },
  },
} satisfies O.Partial<AWS>;
