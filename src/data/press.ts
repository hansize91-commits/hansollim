import pressArticlesJson from '../content/press.json';

export type PressArticle = {
  title: string;
  outlet: string;
  date: string;
  href: string;
};

export const pressArticles: PressArticle[] = pressArticlesJson;
