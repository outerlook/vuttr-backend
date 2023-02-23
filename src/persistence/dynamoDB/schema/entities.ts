import DynamoDB from "aws-sdk/clients/dynamodb";
import { Entity } from "electrodb";
import { MAIN_TABLE_NAME } from "./tableDefinition";

const client = new DynamoDB.DocumentClient({region: "us-east-1"});

let namespace = "vuttr";
const Tool = new Entity(
  {
    model: {
      entity: "tool",
      version: "1",
      service: namespace,
    },
    attributes: {
      id: {
        type: "string",
        required: true,
      },
      title: {
        type: "string",
        required: true,
      },
      link: {
        type: "string",
        required: true,
      },
      description: {
        type: "string",
        required: true,
      },
      createdBy: {
        type: "string",
        required: true,
      },
      tags: {
        type: "set",
        required: true,
        default: [],
        items: "string",
      },
    },
    /*
     * TODO: Not sure if this is the best way to define access patterns
     *       I must yet review the documentation about composites and indexes
     */
    indexes: {
      byId: {
        pk: {
          field: "pk",
          composite: ["id"],
        },
        sk: {
          field: "sk",
          composite: [],
        }
      },
      // byTag: {} // TODO find way to create index for byTag access pattern?
      byTag: {
        pk: {
          field: "pk",
          composite: ["tags"],

        }
      }
    },
  },
  { client, table: MAIN_TABLE_NAME }
);

export const ddbEntities = {
  Tool,
};
