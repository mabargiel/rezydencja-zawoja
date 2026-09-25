import { createClient } from 'next-sanity'

import { sanityDataset, sanityProjectId } from './env'

export const sanity = createClient({
  apiVersion: '2023-01-01',
  dataset: sanityDataset,
  projectId: sanityProjectId,
  useCdn: true,
})
