import { getCliClient } from 'sanity/cli'

import { seedLegalPages } from './legal/seedLegalPages'

await seedLegalPages(getCliClient({ apiVersion: '2026-09-01' }))
