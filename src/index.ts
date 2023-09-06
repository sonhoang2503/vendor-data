import {
  dynamodbDescribeTable,
  dynamodbCreateTable,
  dynamodbDeleteTable,
  dynamodbCreateRecord,
} from "./aws";
import vendors from "./data/vendos";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

const init = async () => {
  const vendorsTablleName = "vendors";
  const vendorsTablleParams: AWS.DynamoDB.CreateTableInput = {
    TableName: vendorsTablleName,
    KeySchema: [
      {
        AttributeName: "twitterId",
        KeyType: "HASH",
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: "twitterId",
        AttributeType: "S",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };

  const vendorsTable = await dynamodbDescribeTable(vendorsTablleName);
  if (!(vendorsTable instanceof Error)) {
    // DELETE THE TABLE
    console.log("Triggered");
    await dynamodbDeleteTable(vendorsTablleName);
    await sleep(6000);
  }

  await dynamodbCreateTable(vendorsTablleParams);
  await sleep(6000);

  for (const i in vendors) {
    const vendor = vendors[i];
    const res = await dynamodbCreateRecord(vendorsTablleName, vendor);
    if (res instanceof Error) {
      console.log("Error:", vendor, res);
    }
  }
};

init();
