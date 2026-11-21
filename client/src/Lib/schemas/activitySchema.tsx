import { z } from 'zod';
import { requiredString } from '../Types/util/util';

export const activitySchema = z.object({
  title: requiredString('Title'),
  description: requiredString('Description'),
  category: requiredString('Category'),
  date: z.date({ error: 'Date is required' }), // <-- MUST be z.date(), NOT z.coerce.date()!
  location: z.object ({
    venue: requiredString('Venue'),
    city: z.string().optional(),
    latitude: z.number(),
    longitude: z.number()
  })
});

export type ActivitySchema = z.infer<typeof activitySchema>;
