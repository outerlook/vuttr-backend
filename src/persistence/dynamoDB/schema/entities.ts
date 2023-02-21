import DynamoDB from "aws-sdk/clients/dynamodb";
import { Entity } from "electrodb";
import { MAIN_TABLE_NAME } from "./tableDefinition";

const client = new DynamoDB.DocumentClient();

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
    indexes: {
      byId: {
        pk: {
          field: "pk",
          composite: ["id"],
        },
      },
      // byTag: {} // TODO find way to create index for byTag access pattern?
    },
  },
  { client, table: MAIN_TABLE_NAME }
);

export const ddbEntities = {
  Tool,
};
