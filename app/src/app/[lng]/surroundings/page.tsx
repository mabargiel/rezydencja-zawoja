import { SubPage } from '@/components/SubPage'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('surroundings')

export default function SurroundingsPage() {
  return <SubPage page="surroundings" />
}
