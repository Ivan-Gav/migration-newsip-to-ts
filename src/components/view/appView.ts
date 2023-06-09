import News from './news/news';
import Sources from './sources/sources';
import NewsApiResponse from '../interface/newsapiresponse';

class AppView {
  // private news: News;

  // private sources: Sources;

  // constructor() {
  //   this.news = new News();
  //   this.sources = new Sources();
  // }

  public static drawNews(data?: NewsApiResponse): void {
    const values = data?.articles ? data?.articles : [];
    News.draw(values);
  }

  public static drawSources(data?: NewsApiResponse): void {
    const values = data?.sources ? data?.sources : [];
    Sources.draw(values);
  }
}

export default AppView;
