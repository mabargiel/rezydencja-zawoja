import { DocumentsIcon } from '@sanity/icons/Documents'
import { ImagesIcon } from '@sanity/icons/Images'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

import { singletons, type SingletonType } from './constants'
import { photoCategories } from './schemaTypes/documents/photo'

const singleton = (S: StructureBuilder, type: SingletonType) =>
  S.listItem()
    .title(singletons[type])
    .schemaType(type)
    .child(S.document().schemaType(type).documentId(type).title(singletons[type]))

const pages: SingletonType[] = [
  'homePage',
  'interiorsPage',
  'surroundingsPage',
  'galleryPage',
  'contactPage',
]

export const structure: StructureResolver = S =>
  S.list()
    .title('Treści')
    .items([
      singleton(S, 'siteSettings'),
      S.divider(),
      S.listItem()
        .title('Strony')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Strony')
            .items(pages.map(type => singleton(S, type)))
        ),
      singleton(S, 'pricing'),
      S.divider(),
      S.listItem()
        .title('Biblioteka zdjęć')
        .icon(ImagesIcon)
        .child(
          S.list()
            .title('Biblioteka zdjęć')
            .items([
              S.listItem()
                .title('Wszystkie')
                .child(S.documentTypeList('photo').title('Wszystkie zdjęcia')),
              S.divider(),
              ...photoCategories.map(category =>
                S.listItem()
                  .title(category.title)
                  .child(
                    S.documentTypeList('photo')
                      .title(category.title)
                      .filter('_type == "photo" && category == $category')
                      .params({ category: category.value })
                  )
              ),
            ])
        ),
    ])
