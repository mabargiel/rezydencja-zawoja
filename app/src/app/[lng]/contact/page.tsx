import { Suspense } from 'react'

import { ContactCard } from '@/components/contact/ContactCard'
import { ContactForm, type ContactFormProps } from '@/components/contact/ContactForm'
import { Directions } from '@/components/contact/Directions'
import { PrefilledContactForm } from '@/components/contact/PrefilledContactForm'
import { PageHeader } from '@/components/PageHeader'
import { localizedHref, pagePaths } from '@/config/site'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { contactPageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('contact')

export default async function ContactPage() {
  const [language, t] = await Promise.all([getLanguage(), getT()])
  const { data } = await sanityFetch({
    params: { lng: language },
    query: contactPageQuery,
    stega: false,
  })

  const formProps: ContactFormProps = {
    contactHref: localizedHref(language, pagePaths.contact),
    copy: {
      errors: t('pages.contact.errors', { returnObjects: true }),
      form: t('pages.contact.form', { returnObjects: true }),
      sent: t('pages.contact.sent', { returnObjects: true }),
    },
    language,
    privacyHref: localizedHref(language, pagePaths.privacyPolicy),
  }

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.contact.eyebrow')}
        title={t('pages.contact.title')}
        intro={t('pages.contact.intro')}
        image={data?.header?.photo}
      />
      <div className="flex flex-col gap-9 px-5 pt-10 pb-12 lg:flex-row-reverse lg:items-start lg:gap-16 lg:px-[120px] lg:py-[100px]">
        <ContactCard />
        <div className="relative min-w-0 lg:flex-1">
          <Suspense fallback={<ContactForm {...formProps} />}>
            <PrefilledContactForm {...formProps} />
          </Suspense>
        </div>
      </div>
      <Directions map={data?.map?.photo} />
    </main>
  )
}
