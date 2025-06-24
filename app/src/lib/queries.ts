import { groq } from 'next-sanity'

import { sanity } from './sanity'
import { GallerySchema, HeroSchema } from './schemas'

const galleryQuery = groq`
  *[_type == "photoGallery"][0]{
    title,
    images[]{
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  }
`

export async function getGallery(): Promise<GallerySchema> {
  return await sanity.fetch(galleryQuery)
}

const heroQuery = groq`
  *[_type == "hero"][0]{
    headline,
    ctaText,
    ctaLink,
    videos[]{
      asset->{
        url
      }
    }
  }
`

export async function getHero(): Promise<HeroSchema> {
  return await sanity.fetch(heroQuery)
}
