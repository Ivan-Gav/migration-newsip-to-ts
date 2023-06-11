/* eslint-disable max-lines-per-function */
import './news.css';
import NewsApiArticle from '../../interface/newsapiarticle';

class News {
  private static getElement<T extends HTMLElement>(root: HTMLElement | Document, selector: string): T {
    const element = root.querySelector<T>(selector);
    if (!element) {
      throw new TypeError(`No ${selector} found in ${root}`);
    }
    return element;
  }

  public static draw(data: Readonly<NewsApiArticle>[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = this.getElement<HTMLTemplateElement>(document, '#newsItemTemp');

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

      if (idx % 2) this.getElement(newsClone, '.news__item').classList.add('alt');

      this.getElement(newsClone, '.news__meta-photo').style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;
      this.getElement(newsClone, '.news__meta-author').textContent = item.author || item.source.name;
      this.getElement(newsClone, '.news__meta-date').textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      this.getElement(newsClone, '.news__description-title').textContent = item.title;
      this.getElement(newsClone, '.news__description-source').textContent = item.source.name;
      this.getElement(newsClone, '.news__description-content').textContent = item.description;
      this.getElement(newsClone, '.news__read-more a').setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    this.getElement(document, '.news').innerHTML = '';
    this.getElement(document, '.news').appendChild(fragment);
  }
}

export default News;
