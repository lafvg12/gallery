export interface AwsClientInterface {
  sendFile(client: any, params: any);
  getUrl(paramGetUrl: ParamGetUrl, clientS3: any): string;
}

export interface ParamGetUrl {
  Bucket: string;
  Key: string;
  Expires?: number;
}
