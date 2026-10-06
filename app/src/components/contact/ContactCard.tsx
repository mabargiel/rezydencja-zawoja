import { Clock4, Mail, MapPin, Phone } from 'lucide-react'
import type { ReactNode } from 'react'

import { phoneHref, site } from '@/config/site'
import { getT } from '@/i18n/server'

export async function ContactCard() {
  const t = await getT()

  return (
    <aside
      aria-labelledby="contact-card-title"
      className="flex flex-col gap-6 bg-bg-dark p-7 lg:w-[440px] lg:shrink-0 lg:gap-7 lg:p-11"
    >
      <h2
        id="contact-card-title"
        className="font-display text-[26px] leading-[1.15] text-text-inverse lg:text-[28px]"
      >
        {t('pages.contact.card.title')}
      </h2>
      <dl className="flex flex-col gap-6 lg:gap-7">
        <InfoRow
          icon={<MapPin size={17} strokeWidth={1.5} />}
          label={t('pages.contact.card.address')}
        >
          {site.address.map(line => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </InfoRow>
        <InfoRow icon={<Phone size={17} strokeWidth={1.5} />} label={t('pages.contact.card.phone')}>
          <a href={phoneHref} className="transition-colors hover:text-accent-warm">
            {site.phone}
          </a>
        </InfoRow>
        <InfoRow icon={<Mail size={17} strokeWidth={1.5} />} label={t('pages.contact.card.email')}>
          <a
            href={`mailto:${site.email}`}
            className="break-all transition-colors hover:text-accent-warm"
          >
            {site.email}
          </a>
        </InfoRow>
        <InfoRow icon={<Clock4 size={17} strokeWidth={1.5} />} label={t('pages.contact.card.stay')}>
          <span className="block">{t('pages.contact.card.checkIn', { time: site.checkIn })}</span>
          <span className="block">{t('pages.contact.card.checkOut', { time: site.checkOut })}</span>
        </InfoRow>
      </dl>
      <a
        href={phoneHref}
        className="mt-1 flex items-center justify-center gap-[9px] bg-accent-warm py-3.5 font-body text-[13px] font-medium tracking-[1.5px] text-bg-dark uppercase transition-colors hover:bg-text-inverse lg:mt-2 lg:py-[15px]"
      >
        <Phone aria-hidden size={15} strokeWidth={1.75} />
        {t('pages.contact.card.call')}
      </a>
    </aside>
  )
}

type InfoRowProps = {
  icon: ReactNode
  label: string
  children: ReactNode
}

function InfoRow({ icon, label, children }: InfoRowProps) {
  return (
    <div className="flex gap-3.5 lg:gap-4">
      <span
        aria-hidden
        className="flex size-[38px] shrink-0 items-center justify-center bg-text-inverse/8 text-accent-warm lg:size-10"
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5 lg:gap-[3px]">
        <dt className="font-body text-[10.5px] tracking-[2px] text-accent-warm lg:text-[11px]">
          {label}
        </dt>
        <dd className="font-body text-[14.5px] leading-[1.45] text-text-inverse lg:text-[15.5px]">
          {children}
        </dd>
      </div>
    </div>
  )
}
