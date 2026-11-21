import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const exhibitions = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/exhibitions',
  }),
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    category: z.enum(['solo', 'group', 'mapaduboo']),
    start: z.coerce.date(),
    end: z.coerce.date(),
    dateLabel: z.string().optional(),
    venue: z.string(),
    artists: z.array(z.string()).default([]),
    hours: z.string().optional(),
    opening: z.string().optional(),
    closed: z.string().optional(),
    poster: z.string().optional(),
    photos: z.string(),
  }),
});

export const collections = { exhibitions };
