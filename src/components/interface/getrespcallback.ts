import NewsApiResponse from './newsapiresponse';

interface GetRespCallback {
  (data?: NewsApiResponse): void;
}

export default GetRespCallback;
