import { describe, expect, test } from "vitest";
import serverlessConfig from "../configuration";
import fs from "fs";
import { spawnSync } from "child_process";
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
          "handler": "/src/build-lambdas/__GENERATED__/bundles/7ab57ac7.handler",
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
          "handler": "/src/build-lambdas/__GENERATED__/bundles/29efcd05.handler",
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
          "handler": "/src/build-lambdas/__GENERATED__/bundles/847fe49e.handler",
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
          "handler": "/src/build-lambdas/__GENERATED__/bundles/b0905014.handler",
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
          "handler": "/src/build-lambdas/__GENERATED__/bundles/77dde4e3.handler",
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
