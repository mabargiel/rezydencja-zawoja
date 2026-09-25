import { createClient } from 'next-sanity'

import { sanityDataset, sanityProjectId } from './env'

export const client = createClient({
  apiVersion: '2026-09-01',
  dataset: sanityDataset,
  perspective: 'published',
  projectId: sanityProjectId,
  useCdn: true,
})
