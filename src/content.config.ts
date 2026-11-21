import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const exhibitions = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/exhibitions',
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    titleEn: z.string().optional(),
    category: z.enum(['solo', 'group', 'mapaduboo']),
    year: z.number().optional(),
    // Higher order is newer. Used when a show has no start date.
    // When both shows have start dates, the dates win.
    order: z.number().optional(),
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    dateLabel: z.string().optional(),
    venue: z.string().optional(),
    artists: z.array(z.string()).default([]),
    hours: z.string().optional(),
    organizer: z.string().optional(),
    opening: z.string().optional(),
    closed: z.string().optional(),
    credit: z.string().optional(),
    poster: z.string().optional(),
    photos: z.string().optional(),
    gallery: z
      .array(z.union([z.string(), z.object({ image: z.string() })]))
      .optional(),
  }),
});

export const collections = { exhibitions };
