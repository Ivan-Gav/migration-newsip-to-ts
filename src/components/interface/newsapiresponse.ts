import NewsApiSource from './newsapisource';
import NewsApiArticle from './newsapiarticle';

interface NewsApiResponse {
  status: 'ok' | 'error';
  code?: number;
  message?: string;
  totalResults?: number;
  articles?: NewsApiArticle[];
  sources?: NewsApiSource[];
}

export default NewsApiResponse;
