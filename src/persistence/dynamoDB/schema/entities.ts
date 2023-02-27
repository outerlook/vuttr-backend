import DynamoDB from "aws-sdk/clients/dynamodb";
import { Entity, Service } from "electrodb";
import { MAIN_TABLE_NAME } from "./tableDefinition";

export const client = new DynamoDB.DocumentClient({ region: "us-east-1" });

const namespace = "vuttr";
const taggedToolsCollection = "taggedTools";

const Tool = new Entity({
  model: {
    entity: "Tool",
    version: "1",
    service: namespace,
  },
  attributes: {
    toolId: {
      type: "string",
      required: true,
    },
    createdBy: {
      type: "string",
    },
    title: {
      type: "string",
    },
    link: {
      type: "string",
    },
    description: {
      type: "string",
    },
    tags: {
      type: 'set',
      items: 'string'
    }
  },
  indexes: {
    byId: {
      collection: taggedToolsCollection,
      pk: {
        field: "pk",
        composite: ["toolId"],
      },
      sk: {
        field: "sk",
        composite: [],
      },
    },
  },
});

const ToolTag = new Entity({
  model: {
    entity: "ToolTag",
    version: "1",
    service: namespace,
  },
  attributes: {
    toolId: {
      type: "string",
      required: true,
    },
    tag: {
      type: "string",
      required: true,
    }
  },
  indexes: {
    byToolId: {
      collection: taggedToolsCollection,
      pk: {
        field: "pk",
        composite: ["toolId"],
      },
      sk: {
        field: "sk",
        composite: ["tag"],
      }
    },
    byTag: {
      index: 'gs1',
      pk: {
        field: "gs1pk",
        composite: ["tag"],
      },
      sk: {
        field: "gs1sk",
        composite: ["toolId"],
      }
    }
  }
})

export const VuttrService = new Service(
  {
    tool: Tool,
    toolTag: ToolTag,
  },
  { client, table: MAIN_TABLE_NAME }
);
