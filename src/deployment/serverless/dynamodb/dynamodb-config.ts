import { AWS } from "@serverless/typescript";
import { O } from "ts-toolbelt";
import { tableDefinition } from "src/persistence/dynamoDB/schema/tableDefinition";

export const dynamodbConfig = {
  resources: {
    Resources: {
      VUTTRTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: tableDefinition,
      },
    },
  },
} satisfies O.Partial<AWS, "deep">;
