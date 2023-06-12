import AppLoader from './appLoader';
import GetRespCallback from '../interface/getrespcallback';
import Sources from '../view/sources/sources';

class AppController extends AppLoader {
  public getSources(callback: GetRespCallback): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews(e: Event, callback: GetRespCallback): void {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;
    console.log(target);

    Sources.disActivate();
    Sources.activate(target);

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
