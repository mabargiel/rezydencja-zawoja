import { SubPage } from '@/components/SubPage'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('contact')

export default function ContactPage() {
  return <SubPage page="contact" />
}
