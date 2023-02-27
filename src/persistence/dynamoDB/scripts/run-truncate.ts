import { truncateDynamoDBTable } from "src/persistence/dynamoDB/scripts/truncate-table";

truncateDynamoDBTable().then(
  () => {
    console.log("Table truncated successfully");
    process.exit(0);
  }
)