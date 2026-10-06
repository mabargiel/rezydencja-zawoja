import type { SanityClient } from 'sanity'

import { toBlocks } from '../portableText'
import { privacyPolicy } from './privacyPolicy'
import { rentalTerms } from './rentalTerms'

const documents = { privacyPolicy, rentalTerms }

const languages = ['pl', 'en', 'de'] as const

const updatedAt = '2026-10-06'

// createIfNotExists: once seeded, the owner edits these texts in the Studio, and re-running the
// seed must never overwrite their changes.
export async function seedLegalPages(client: SanityClient) {
  for (const [id, content] of Object.entries(documents)) {
    await client.createIfNotExists({
      _id: id,
      _type: 'legalPage',
      body: Object.fromEntries(
        languages.map(language => [language, toBlocks(`${language}`, content[language])])
      ),
      title: languages.map(language => ({
        _key: language,
        _type: 'internationalizedArrayStringValue',
        language,
        value: content.title[language],
      })),
      updatedAt,
    })
    console.log(`legal page ${id}`)
  }
}
