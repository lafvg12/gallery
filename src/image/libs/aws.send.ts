import { AwsClientInterface, ParamGetUrl } from './aws-client-interface';
import { S3Client } from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';

class AwsClient implements AwsClientInterface {
  async sendFile(clientS3: any, params: any) {
    const client = new S3Client(clientS3);
    try {
      const results = await client.send(new PutObjectCommand(params));
      console.log(
        'Successfully created ' +
          params.Key +
          ' and uploaded it to ' +
          params.Bucket +
          '/' +
          params.Key,
      );
      return results; // For unit tests.
    } catch (err) {
      console.log('Error', err);
    }
  }

  getUrl(param: ParamGetUrl, clientS3: any): any {
    const pdfP = new S3(clientS3);
    const signedUrl = pdfP.getSignedUrl('getObject', {
      ...param,
      Expires: 900, // S3 default is 900 seconds (15 minutes)
    });
    return signedUrl;
  }
}

export default AwsClient;
