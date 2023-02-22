import { expect, test } from "vitest";
import serverlessConfig from "../serverless-config";
import { removeOutsideProjectPath } from "src/utils/remove-outside-project-path";

test("check full configuration", () => {
  expect(removeOutsideProjectPath(serverlessConfig)).toMatchInlineSnapshot(`
    {
      "custom": {
        "localstack": {
          "autostart": true,
          "edgePort": 4566,
          "host": "http://localhost",
          "lambda": {
            "mountCode": true,
          },
          "networks": [
            "host",
          ],
          "stages": [
            "local",
          ],
        },
      },
      "frameworkVersion": "*",
      "functions": {
        "login-post": {
          "events": [
            {
              "http": {
                "method": "post",
                "path": "/login",
              },
            },
          ],
          "handler": "/out/lambdas/bundles/2759899b.handler",
        },
        "signup-post": {
          "events": [
            {
              "http": {
                "method": "post",
                "path": "/signup",
              },
            },
          ],
          "handler": "/out/lambdas/bundles/78d1316.handler",
        },
        "tools-get": {
          "events": [
            {
              "http": {
                "authorizer": {
                  "authorizerId": {
                    "Ref": "BasicAuthorizer",
                  },
                  "type": "COGNITO_USER_POOLS",
                },
                "method": "get",
                "path": "/tools",
              },
            },
          ],
          "handler": "/out/lambdas/bundles/b17d870a.handler",
        },
        "tools-id-delete": {
          "events": [
            {
              "http": {
                "authorizer": {
                  "authorizerId": {
                    "Ref": "BasicAuthorizer",
                  },
                  "type": "COGNITO_USER_POOLS",
                },
                "method": "delete",
                "path": "/tools/:id",
              },
            },
          ],
          "handler": "/out/lambdas/bundles/b9163c9f.handler",
        },
        "tools-post": {
          "events": [
            {
              "http": {
                "authorizer": {
                  "authorizerId": {
                    "Ref": "BasicAuthorizer",
                  },
                  "type": "COGNITO_USER_POOLS",
                },
                "method": "post",
                "path": "/tools",
              },
            },
          ],
          "handler": "/out/lambdas/bundles/92c50260.handler",
        },
      },
      "plugins": [
        "serverless-localstack",
      ],
      "provider": {
        "environment": {
          "COGNITO_USER_POOL_ID": {
            "Ref": "CognitoUserPool",
          },
          "COGNITO_USER_POOL_NAME": "COGNITO_USER_POOL_NAME",
        },
        "name": "aws",
        "runtime": "nodejs16.x",
      },
      "resources": {
        "Resources": {
          "CognitoUserPool": {
            "Properties": {
              "UserPoolName": "COGNITO_USER_POOL_NAME",
              "UsernameAttributes": [
                "email",
              ],
            },
            "Type": "AWS::Cognito::UserPool",
          },
          "VUTTRTable": {
            "Properties": {
              "AttributeDefinitions": [
                {
                  "AttributeName": "pk",
                  "AttributeType": "S",
                },
                {
                  "AttributeName": "sk",
                  "AttributeType": "S",
                },
                {
                  "AttributeName": "gsi1pk",
                  "AttributeType": "S",
                },
                {
                  "AttributeName": "gsi1sk",
                  "AttributeType": "S",
                },
              ],
              "BillingMode": "PAY_PER_REQUEST",
              "GlobalSecondaryIndexes": [
                {
                  "IndexName": "gsi1pk-gsi1sk-index",
                  "KeySchema": [
                    {
                      "AttributeName": "gsi1pk",
                      "KeyType": "HASH",
                    },
                    {
                      "AttributeName": "gsi1sk",
                      "KeyType": "RANGE",
                    },
                  ],
                  "Projection": {
                    "ProjectionType": "ALL",
                  },
                },
              ],
              "KeySchema": [
                {
                  "AttributeName": "pk",
                  "KeyType": "HASH",
                },
                {
                  "AttributeName": "sk",
                  "KeyType": "RANGE",
                },
              ],
              "TableName": "vuttr-table",
            },
            "Type": "AWS::DynamoDB::Table",
          },
        },
      },
      "service": "desafio-backend",
    }
  `);
});
