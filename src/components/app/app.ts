import AppController from '../controller/controller';
import AppView from '../view/appView';
import GetRespCallback from '../interface/getrespcallback';

class App {
  private controller: AppController;

  // private view: AppView;

  constructor() {
    this.controller = new AppController();
    // this.view = new AppView();
  }

  public start(): void {
    const newsCallback: GetRespCallback = (data) => AppView.drawNews(data);
    const sourceCallback: GetRespCallback = (data) => AppView.drawSources(data);

    (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
      this.controller.getNews(e, newsCallback)
    );
    this.controller.getSources(sourceCallback);
  }
}

export default App;
