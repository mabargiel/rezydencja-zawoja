import { SubPage } from '@/components/SubPage'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('gallery')

export default function GalleryPage() {
  return <SubPage page="gallery" />
}
