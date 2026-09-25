import { SubPage } from '@/components/SubPage'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('interiors')

export default function InteriorsPage() {
  return <SubPage page="interiors" />
}
