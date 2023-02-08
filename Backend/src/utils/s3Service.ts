import { S3 } from "aws-sdk";

export const s3Uplaod = async (
  file: any,
  keyPath: string,
  fileUUID: string,
) => {
  const s3 = new S3();
  const params = {
    Bucket: "galore-mobile-bucket",
    Key: `${keyPath}/${fileUUID}`,
    Body: file.buffer,
  };
  const result = s3.upload(params).promise();
  return result;
};

export const s3Delete = async (key: string, keyPath: string) => {
  const s3 = new S3();
  const params = {
    Bucket: "galore-mobile-bucket",
    Key: `${keyPath}/${key}`,
  };
  const result = s3.deleteObject(params).promise();
  return result;
};
