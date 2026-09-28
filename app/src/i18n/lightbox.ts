import type { LightboxLabels } from '@/components/Lightbox'

import { getT } from './server'

export async function getLightboxLabels(): Promise<LightboxLabels> {
  const t = await getT()
  return {
    close: t('lightbox.close'),
    counter: t('lightbox.counter', { current: '{{current}}', total: '{{total}}' }),
    label: t('lightbox.label'),
    next: t('lightbox.next'),
    previous: t('lightbox.previous'),
  }
}
