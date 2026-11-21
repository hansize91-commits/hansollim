import siteJson from '../content/site.json';

export type SiteContent = {
  name: string;
  description: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  homeImage: string;
  homeImageAlt: string;
};

export const site: SiteContent = siteJson;
