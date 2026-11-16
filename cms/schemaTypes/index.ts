import type { SchemaTypeDefinition } from 'sanity'

import { legalPage } from './documents/legalPage'
import { photo } from './documents/photo'
import { mediaSlot } from './objects/mediaSlot'
import { contactPage } from './singletons/contactPage'
import { galleryPage } from './singletons/galleryPage'
import { homePage } from './singletons/homePage'
import { interiorsPage } from './singletons/interiorsPage'
import { pricing } from './singletons/pricing'
import { promoBar } from './singletons/promoBar'
import { siteSettings } from './singletons/siteSettings'
import { surroundingsPage } from './singletons/surroundingsPage'
import { tracking } from './singletons/tracking'

export const schemaTypes: SchemaTypeDefinition[] = [
  mediaSlot,
  photo,
  siteSettings,
  promoBar,
  tracking,
  pricing,
  homePage,
  interiorsPage,
  surroundingsPage,
  galleryPage,
  contactPage,
  legalPage,
]
