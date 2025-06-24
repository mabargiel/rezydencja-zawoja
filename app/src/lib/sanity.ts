import { createClient } from 'next-sanity'

export const sanity = createClient({
  apiVersion: '2023-01-01',
  dataset: 'production',
  projectId: 'r9qn2ra2',
  useCdn: true,
})
