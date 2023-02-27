import { client } from "src/persistence/dynamoDB/schema/entities";
import { MAIN_TABLE_NAME } from "src/persistence/dynamoDB/schema/tableDefinition";
import _ from "lodash";

export const truncateDynamoDBTable = async () => {
  const params = {
    TableName: MAIN_TABLE_NAME,
  };

  const scanResults = await client.scan(params).promise();

  const notDeleted = [];

  if (scanResults.Items) {
    const batches = _.chunk(scanResults.Items, 25);

    for (const batch of batches) {
      const batchParams = {
        RequestItems: {
          [MAIN_TABLE_NAME]: batch.map((item) => ({
            DeleteRequest: {
              Key: {
                pk: item.pk,
                sk: item.sk,
              },
            },
          })),
        },
      };

      const { UnprocessedItems } = await client
        .batchWrite(batchParams)
        .promise();
      if (UnprocessedItems && Object.keys(UnprocessedItems).length > 0) {
        notDeleted.push(...UnprocessedItems[MAIN_TABLE_NAME]);
      }
    }
  }

  if (notDeleted.length) {
    throw new Error(
      `Could not delete all items from DynamoDB table ${MAIN_TABLE_NAME}. ${notDeleted.length} items were not deleted.`
    );
  }
};
