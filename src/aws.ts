import AWS from "aws-sdk";
import { AWSRegion } from "./types/aws";
import { Vendor } from "./types/twitter";
import { marshall } from "@aws-sdk/util-dynamodb";
import vendors from "./data/vendos";

AWS.config.update({ region: AWSRegion.AP_SOUTHEAST_1 });

const { DynamoDB } = AWS;
const dynamodb = new DynamoDB();

export const dynamodbCreateTable = async (
  params: AWS.DynamoDB.CreateTableInput
) => {
  try {
    const result = await dynamodb.createTable(params).promise();
    console.log("Table created", result);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }

    throw new Error("dynamodbCreateTable error object unknown type");
  }
};

export const dynamodbDescribeTable = async (tableName: string) => {
  try {
    const table = await dynamodb
      .describeTable({
        TableName: tableName,
      })
      .promise();

    console.log("Table retrieved", table);
    return table;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }

    throw new Error(`dynamodbDescribeTable error object unknown type`);
  }
};

export const dynamodbDeleteTable = async (tableName: string) => {
  try {
    const result = await dynamodb
      .deleteTable({
        TableName: tableName,
      })
      .promise();

    console.log("Table deleted", result);
    return result;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }

    throw new Error(`dynamodbDeleteTable error object unknown type`);
  }
};

export const dynamodbCreateRecord = async (
  tableName: string,
  vendor: Vendor
) => {
  try {
    const results = await dynamodb
      .putItem({
        TableName: tableName,
        Item: marshall(vendor),
      })
      .promise();

    console.log("Record created");
    return results;
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }

    throw new Error(`dynamodbDeleteTable error object unknown type`);
  }
};
