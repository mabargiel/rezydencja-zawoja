import type { SanityClient } from 'sanity'

import { localizedArray } from '../localized'
import { toBlocks } from '../portableText'
import { privacyPolicy } from './privacyPolicy'
import { rentalTerms } from './rentalTerms'

const documents = { privacyPolicy, rentalTerms }

const languages = ['pl', 'en', 'de'] as const

const updatedAt = '2026-10-06'

// The owner edits these in the Studio; re-seeding must not overwrite their changes.
export async function seedLegalPages(client: SanityClient) {
  for (const [id, content] of Object.entries(documents)) {
    await client.createIfNotExists({
      _id: id,
      _type: 'legalPage',
      body: Object.fromEntries(
        languages.map(language => [language, toBlocks(`${language}`, content[language])])
      ),
      title: localizedArray(content.title),
      updatedAt,
    })
    console.log(`legal page ${id}`)
  }
}
