// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';
// 2. Define a schema for each collection you'd like to validate.

const newslettersCollection = defineCollection({
    schema: z.object({
      title: z.string(),
        tags: z.array(z.string()),
    }),
  });
  
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    'newsletters': newslettersCollection
};