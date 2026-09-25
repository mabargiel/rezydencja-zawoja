import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

import { sanityDataset, sanityProjectId } from './env'

const builder = createImageUrlBuilder({ dataset: sanityDataset, projectId: sanityProjectId })

export const urlFor = (source: SanityImageSource) => builder.image(source).auto('format')
