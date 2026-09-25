import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  studioHost: 'rezydencja-zawoja',
  typegen: {
    generates: '../app/src/sanity/types.ts',
    overloadClientMethods: true,
    path: '../app/src/**/*.{ts,tsx}',
    schema: 'schema.json',
  },
  deployment: {
    appId: 'oj5dnyfvbj3p6gh1v9uqlowh',
    autoUpdates: true,
  },
})
