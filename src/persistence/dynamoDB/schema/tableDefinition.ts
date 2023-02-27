export const MAIN_TABLE_NAME = "vuttr-table";
// generic single table design based on https://electrodb.dev/en/modeling/schema/
export const tableDefinition = {
  TableName: MAIN_TABLE_NAME,
  KeySchema: [
    {
      AttributeName: "pk",
      KeyType: "HASH",
    },
    {
      AttributeName: "sk",
      KeyType: "RANGE",
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: "pk",
      AttributeType: "S",
    },
    {
      AttributeName: "sk",
      AttributeType: "S",
    },
    {
      AttributeName: "gsi1pk",
      AttributeType: "S",
    },
    {
      AttributeName: "gsi1sk",
      AttributeType: "S",
    },
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "gs1",
      KeySchema: [
        {
          AttributeName: "gsi1pk",
          KeyType: "HASH",
        },
        {
          AttributeName: "gsi1sk",
          KeyType: "RANGE",
        },
      ],
      Projection: {
        ProjectionType: "ALL",
      },
    },
  ],
  BillingMode: "PAY_PER_REQUEST",
};
