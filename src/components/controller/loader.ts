import NewsApiResponse from '../interface/newsapiresponse';
import GetRespCallback from '../interface/getrespcallback';

type KeyOptions = {
  apiKey: string;
  sources?: string;
};

type Options = Partial<KeyOptions>;

type Endpoint = 'everything' | 'top-headlines' | 'sources';

enum Method {
  get = 'GET',
  post = 'POST',
}

class Loader {
  protected baseLink: string;

  protected options: KeyOptions;

  constructor(baseLink: string, options: KeyOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp(
    { endpoint, options = {} }: { endpoint: Endpoint; options?: Options },
    callback?: GetRespCallback
  ): void {
    if (!callback) {
      console.error('No callback for GET response');
    } else {
      this.load(Method.get, endpoint, callback, options);
    }
  }

  private static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: Options, endpoint: Endpoint): string {
    const urlOptions: Options = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof Options]}&`;
    });

    return url.slice(0, -1);
  }

  private load(method: Method, endpoint: Endpoint, callback: GetRespCallback, options: Options): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(Loader.errorHandler)
      .then((res: Response) => res.json())
      .then((data: Readonly<NewsApiResponse>) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;
