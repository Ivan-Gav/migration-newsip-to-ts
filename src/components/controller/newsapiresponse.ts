interface NewsApiArticle {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsApiSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

interface NewsApiResponse {
  status: 'ok' | 'error';
  code?: number;
  message?: string;
  totalResults?: number;
  articles?: NewsApiArticle[];
  sources?: NewsApiSource[];
}

export default NewsApiResponse;
