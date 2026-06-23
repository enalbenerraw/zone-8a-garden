import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      order: z.number(),
      category: z.enum(['Plan', 'Plant', 'Protect']),
      updated: z.string(),
      timeline: z.boolean().optional(),
      // Optional single optimized photo shown at the top of a guide.
      hero: z
        .object({
          src: image(),
          alt: z.string(),
          caption: z.string().optional(),
        })
        .optional(),
    }),
});

// Chronological photo log of the bed through the seasons. One entry per visit.
// Photos live alongside entries in src/content/journal/_photos and are
// optimized at build time via the image() helper.
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Phase in the rotation, e.g. "Summer: nitrogen fixers".
      phase: z.string(),
      date: z.date(),
      photos: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .min(1),
    }),
});

export const collections = { guides, journal };
