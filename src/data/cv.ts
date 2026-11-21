import cvSectionsJson from '../content/cv.json';

export type CvSection = { title: string; paragraphs: string[] };

export const cvSections: CvSection[] = cvSectionsJson;
