import { plPLLocale } from '@sanity/locale-pl-pl'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { structureTool } from 'sanity/structure'

import { languages, singletonTypes } from './constants'
import { dataset, projectId } from './env'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Rezydencja Zawoja',

  projectId,
  dataset,

  plugins: [
    structureTool({ structure, title: 'Treści' }),
    visionTool(),
    plPLLocale(),
    internationalizedArray({
      buttonAddAll: false,
      defaultLanguages: ['pl', 'en', 'de'],
      fieldTypes: ['string'],
      languageDisplay: 'titleAndCode',
      languages,
    }),
  ],

  schema: {
    templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
    types: schemaTypes,
  },

  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action !== 'delete' && action !== 'duplicate')
        : actions,
    newDocumentOptions: (items, { creationContext }) =>
      creationContext.type === 'global'
        ? items.filter(item => !singletonTypes.has(item.templateId))
        : items,
  },
})
