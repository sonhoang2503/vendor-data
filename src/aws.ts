import AWS from "aws-sdk";
import { AWSRegion } from "./types/aws";

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
