'use client'

import { ArrowRight, Calendar, User } from 'lucide-react'
import { type ReactNode, useState } from 'react'

type BookingBarProps = {
  action: string
  labels: {
    form: string
    arrival: string
    departure: string
    guests: string
    guestsAny: string
    submit: string
  }
}

const guestOptions = Array.from({ length: 10 }, (_, index) => index + 1)

const inputClass =
  'w-full min-w-0 bg-transparent font-body text-sm font-medium text-text-primary outline-none lg:text-[15px]'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function Field({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-1 items-center gap-3 lg:flex-none lg:px-7 lg:py-1.5 lg:first:pl-0">
      <span aria-hidden className="hidden text-accent lg:block">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="font-body text-[9.5px] tracking-[1.5px] text-text-secondary uppercase lg:text-[11px] lg:tracking-[2px]">
          {label}
        </span>
        {children}
      </span>
    </label>
  )
}

export function BookingBar({ action, labels }: BookingBarProps) {
  const [arrival, setArrival] = useState('')

  return (
    <form
      action={action}
      method="get"
      aria-label={labels.form}
      className="flex w-full flex-col gap-3.5 bg-surface p-5 lg:w-auto lg:flex-row lg:items-center lg:gap-0 lg:py-2.5 lg:pr-2.5 lg:pl-8"
    >
      <div className="flex gap-3 lg:items-center lg:gap-0 lg:divide-x lg:divide-line">
        <Field label={labels.arrival} icon={<Calendar size={18} strokeWidth={1.5} />}>
          <input
            type="date"
            name="arrival"
            min={today()}
            onChange={event => setArrival(event.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={labels.departure} icon={<Calendar size={18} strokeWidth={1.5} />}>
          <input type="date" name="departure" min={arrival || today()} className={inputClass} />
        </Field>
        <Field label={labels.guests} icon={<User size={18} strokeWidth={1.5} />}>
          <select name="guests" defaultValue="" className={inputClass}>
            <option value="">{labels.guestsAny}</option>
            {guestOptions.map(count => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2.5 bg-accent px-8 py-4 font-body text-[13px] font-medium tracking-[2px] text-surface uppercase transition-colors hover:bg-bg-dark"
      >
        {labels.submit}
        <ArrowRight aria-hidden size={16} strokeWidth={1.75} />
      </button>
    </form>
  )
}
