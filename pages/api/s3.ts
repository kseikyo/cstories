import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

import {
  BUCKET_NAME,
  S3_ACCESS_KEY,
  S3_ENDPOINT,
  S3_SECRET_KEY,
} from "@src/constants/env";

const s3 = new S3({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
  endpoint: S3_ENDPOINT,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  httpOptions: { timeout: 0 },
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1000mb",
    },
  },
};

const handleRequests = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { name, file } = req.body;

      const fileParams = {
        Bucket: BUCKET_NAME,
        Key: name,
        Body: file,
      };

      const response = await s3
        // @ts-ignore
        .upload(fileParams, {
          partSize: 64 * 1024 * 1024,
        })
        .promise();

      res.status(200).json({ response });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
  if (req.method === "GET") {
    try {
      const params = {
        Bucket: BUCKET_NAME,
        Key: "02.caving.mp4",
      };
      const url = s3.getSignedUrl("getObject", params);

      res.status(200).json({ url });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

export default handleRequests;
