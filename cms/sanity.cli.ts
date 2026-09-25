import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  studioHost: 'rezydencja-zawoja',
  deployment: {
    appId: 'oj5dnyfvbj3p6gh1v9uqlowh',
    autoUpdates: true,
  },
})
