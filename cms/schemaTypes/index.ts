import type { SchemaTypeDefinition } from 'sanity'

import { photo } from './documents/photo'
import { mediaSlot } from './objects/mediaSlot'
import { videoSlot } from './objects/videoSlot'
import { contactPage } from './singletons/contactPage'
import { galleryPage } from './singletons/galleryPage'
import { homePage } from './singletons/homePage'
import { interiorsPage } from './singletons/interiorsPage'
import { pricing } from './singletons/pricing'
import { siteSettings } from './singletons/siteSettings'
import { surroundingsPage } from './singletons/surroundingsPage'

export const schemaTypes: SchemaTypeDefinition[] = [
  mediaSlot,
  videoSlot,
  photo,
  siteSettings,
  pricing,
  homePage,
  interiorsPage,
  surroundingsPage,
  galleryPage,
  contactPage,
]
