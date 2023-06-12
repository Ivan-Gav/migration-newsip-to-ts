import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: 'eef9fc46616347dbbfb3e24da3a43690', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
