import NewsApiResponse from './newsapiresponse';

type Options = {
  apiKey?: string;
  sources?: string;
};

type Endpoint = 'everything' | 'top-headlines' | 'sources';

enum Method {
  get = 'GET',
  post = 'POST',
}

class Loader {
  protected baseLink: string;
  protected options: Options;

  constructor(baseLink: string, options: Options) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: Endpoint; options: Options },
    callback = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load(Method.get, endpoint, callback, options);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: Options, endpoint: Endpoint): string {
    const urlOptions: Options = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof Options]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: Method, endpoint: Endpoint, callback: Function, options: Options = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: NewsApiResponse) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;
