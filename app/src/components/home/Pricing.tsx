import { Clock4, Info, Mail, PawPrint, Phone, ShieldCheck, Wifi } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { phoneHref, site } from '@/config/site'
import type { Language } from '@/i18n/config'
import { formatPrice } from '@/lib/formatPrice'
import type { HomePageQueryResult } from '@/sanity/types'

type PricingData = NonNullable<HomePageQueryResult['pricing']>
type Unit = 'night' | 'stay' | 'week' | 'weekend'

type PricingProps = {
  language: Language
  pricing: PricingData
  labels: {
    eyebrow: string
    title: string
    note: string
    period: string
    minimumStay: string
    price: string
    extraPerson: string
    bookingTitle: string
    bookingBody: string
    units: Record<Unit, string>
  }
}

const factIcons = [Clock4, ShieldCheck, PawPrint, Wifi]

const headClass = 'pb-3.5 text-left font-body text-[11px] font-normal tracking-[2.5px] uppercase'

export function Pricing({ language, pricing, labels }: PricingProps) {
  const money = (amount: number | null, unit: Unit | null | undefined, showUnit: boolean) =>
    amount === null
      ? ''
      : `${formatPrice(amount, language)}${showUnit && unit ? ` / ${labels.units[unit]}` : ''}`

  const rates = (pricing.rates ?? []).map(rate => ({
    key: rate._key,
    minimumStay: rate.minimumStay,
    period: rate.period,
    price: money(rate.amount, rate.unit, rate.unit === 'night'),
    surcharge: rate.extraPerson?.amount
      ? `+ ${money(rate.extraPerson.amount, rate.extraPerson.unit, true)}`
      : '',
  }))
  const addOns = (pricing.addOns ?? []).map(addOn => ({
    key: addOn._key,
    name: addOn.name,
    note: addOn.note,
    price: money(addOn.amount, addOn.unit, true),
  }))

  return (
    <section
      id="pricing"
      className="flex scroll-mt-24 flex-col gap-8 bg-surface px-5 py-14 lg:gap-16 lg:px-[120px] lg:pt-[120px] lg:pb-[110px]"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[110px]">
        <div className="lg:w-[560px] lg:shrink-0">
          <SectionHeading eyebrow={labels.eyebrow} title={labels.title} />
        </div>
        <p className="font-body text-[15px] leading-[1.7] text-text-secondary lg:text-base">
          {labels.note}
        </p>
      </div>

      <table className="hidden w-full border-collapse text-text-secondary lg:table">
        <thead>
          <tr>
            <th scope="col" className={headClass}>
              {labels.period}
            </th>
            <th scope="col" className={`${headClass} w-[250px]`}>
              {labels.minimumStay}
            </th>
            <th scope="col" className={`${headClass} w-[240px]`}>
              {labels.price}
            </th>
            <th scope="col" className={`${headClass} w-[210px]`}>
              {labels.extraPerson}
            </th>
          </tr>
        </thead>
        <tbody className="font-body text-[14.5px]">
          {rates.map(rate => (
            <tr key={rate.key} className="border-t border-line">
              <th
                scope="row"
                className="py-5 pr-6 text-left font-display text-2xl font-normal text-text-primary"
              >
                {rate.period}
              </th>
              <td className="py-5 pr-6">{rate.minimumStay}</td>
              <td className="py-5 pr-6 text-[17px] font-medium text-text-primary">{rate.price}</td>
              <td className="py-5">{rate.surcharge}</td>
            </tr>
          ))}
          {addOns.map(addOn => (
            <tr key={addOn.key} className="border-t border-line">
              <th scope="row" className="py-5 pr-6 text-left font-normal">
                <span className="block font-display text-2xl text-text-primary">{addOn.name}</span>
                <span className="block text-[13px]">{addOn.note}</span>
              </th>
              <td className="py-5 pr-6" />
              <td className="py-5 pr-6 text-[17px] font-medium text-text-primary">{addOn.price}</td>
              <td className="py-5" />
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="flex flex-col lg:hidden">
        {rates.map(rate => (
          <li key={rate.key} className="flex flex-col gap-2.5 border-t border-line py-5">
            <div className="flex justify-between gap-4">
              <span className="font-display text-[19px] text-text-primary">{rate.period}</span>
              <span className="shrink-0 font-body text-base font-medium text-text-primary">
                {rate.price}
              </span>
            </div>
            <div className="flex justify-between gap-4 font-body text-[13px] text-text-secondary">
              <span>{rate.minimumStay}</span>
              <span className="shrink-0">{rate.surcharge}</span>
            </div>
          </li>
        ))}
        {addOns.map(addOn => (
          <li key={addOn.key} className="flex flex-col gap-2.5 border-t border-line py-5">
            <div className="flex justify-between gap-4">
              <span className="font-display text-[19px] text-text-primary">{addOn.name}</span>
              <span className="shrink-0 font-body text-base font-medium text-text-primary">
                {addOn.price}
              </span>
            </div>
            <span className="font-body text-[13px] text-text-secondary">{addOn.note}</span>
          </li>
        ))}
      </ul>

      <ul className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-6">
        {(pricing.facts ?? []).map((fact, index) => {
          const Icon = factIcons[index] ?? Info
          return (
            <li key={fact._key} className="flex flex-col gap-2.5 border-t border-line pt-[18px]">
              <Icon aria-hidden size={20} strokeWidth={1.5} className="text-accent-warm-deep" />
              <span className="font-body text-sm font-medium text-text-primary lg:text-[15px]">
                {fact.label}
              </span>
              <span className="font-body text-[13px] leading-[1.55] text-text-secondary lg:text-[13.5px]">
                {fact.value}
              </span>
            </li>
          )
        })}
      </ul>

      <div className="flex flex-col gap-5 bg-bg-dark p-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-7">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-[24px] text-text-inverse lg:text-[26px]">
            {labels.bookingTitle}
          </h3>
          <p className="font-body text-sm text-text-inverse-dim">{labels.bookingBody}</p>
        </div>
        <div className="flex flex-col gap-3 font-body text-base font-medium text-text-inverse lg:flex-row lg:items-center lg:gap-10 lg:text-[17px]">
          <a href={phoneHref} className="flex items-center gap-2.5 hover:text-accent-warm">
            <Phone aria-hidden size={16} strokeWidth={1.75} className="text-accent-warm" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex items-center gap-2.5 hover:text-accent-warm"
          >
            <Mail aria-hidden size={16} strokeWidth={1.75} className="text-accent-warm" />
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}
