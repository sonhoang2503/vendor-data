import { dynamodbDescribeTable, dynamodbCreateTable } from "./aws";

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
  if (vendorsTable) {
  }

  //   await dynamodbCreateTable(vendorsTablleParams);
};
