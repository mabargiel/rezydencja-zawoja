export type GallerySchema = {
  title: string
  images: {
    asset: {
      url: string
      metadata: { dimensions: { width: number; height: number } }
    }
  }[]
}

export type HeroSchema = {
  headline: string
  ctaText: string
  ctaLink: string
  videos: [
    {
      asset: {
        url: string
      }
    },
  ]
}

export type GalleryImage = GallerySchema['images'][number]
