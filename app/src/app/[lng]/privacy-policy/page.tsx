import { LegalPage } from '@/components/legal/LegalPage'
import { pageMetadata } from '@/lib/metadata'

export const generateMetadata = () => pageMetadata('privacyPolicy')

export default function Page() {
  return <LegalPage page="privacyPolicy" />
}
