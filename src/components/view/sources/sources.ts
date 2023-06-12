import './sources.css';
import NewsApiSource from '../../interface/newsapisource';

class Sources {
  private static getElement<T extends HTMLElement>(root: HTMLElement | Document, selector: string): T {
    const element = root.querySelector<T>(selector);
    if (!element) {
      throw new TypeError(`No ${selector} found in ${root}`);
    }
    return element;
  }

  public static disActivate(): void {
    document.querySelectorAll('.source__item').forEach((src) => src.classList.remove('active'));
  }

  public static activate(src: HTMLElement): void {
    if (src.classList.contains('source__item')) {
      src.classList.add('active');
    } else if (src.classList.contains('source__item-name')) {
      (src.parentElement as HTMLElement).classList.add('active');
    }
  }

  public static expandSources(): void {
    const expBtn = document.querySelector('.window-btn');
    const srcWindow = document.querySelector('.sources');

    const expBtnHandler = (e: Event): void => {
      const btn = e.target as HTMLElement;
      console.log(e.target);
      btn.classList.toggle('expand');
      if (srcWindow) {
        srcWindow.classList.toggle('expanded');
      }
    };

    if (expBtn) {
      expBtn.addEventListener('click', expBtnHandler);
    }
  }

  public static draw(data: Readonly<NewsApiSource>[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = this.getElement<HTMLTemplateElement>(document, '#sourceItemTemp');

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

      this.getElement(sourceClone, '.source__item-name').textContent = item.name;
      this.getElement(sourceClone, '.source__item').setAttribute('data-source-id', item.id);

      fragment.append(sourceClone);
    });

    this.getElement(document, '.sources').append(fragment);
  }
}

export default Sources;
