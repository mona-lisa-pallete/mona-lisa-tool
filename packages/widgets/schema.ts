export interface OssUploadPolicy {
    OSSAccessKeyId: string;
    key: string;
    policy: string;
    signature: string;
    success_action_status: number;
    timeout: number;
  }
  