import News from './news/news';
import Sources from './sources/sources';
import NewsApiResponse from '../interface/newsapiresponse';

type NewsResponse = Pick<NewsApiResponse, 'status' | 'totalResults' | 'articles'>;
type SourcesResponse = Pick<NewsApiResponse, 'status' | 'totalResults' | 'sources'>;

class AppView {
  public static drawNews(data?: Readonly<NewsResponse>): void {
    const values = data?.articles ? data?.articles : [];
    News.draw(values);
  }

  public static drawSources(data?: Readonly<SourcesResponse>): void {
    const values = data?.sources ? data?.sources : [];
    Sources.draw(values);
    Sources.expandSources();
  }
}

export default AppView;
