type KeyFactsProps = {
  facts: readonly { value: string; label: string }[]
}

export function KeyFacts({ facts }: KeyFactsProps) {
  return (
    <section className="bg-bg-dark px-5 py-10 lg:px-[120px] lg:py-16">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-6 lg:grid-cols-4 lg:gap-0">
        {facts.map((fact, index) => (
          <div
            key={fact.value}
            className={`flex flex-col-reverse gap-1 lg:gap-1.5 ${index > 0 ? 'lg:border-l lg:border-line-inverse lg:pl-10' : ''} ${index > 1 ? 'max-lg:border-t max-lg:border-line-inverse max-lg:pt-6' : ''}`}
          >
            <dt className="font-body text-xs tracking-[0.5px] text-text-inverse-dim lg:text-[13px] lg:tracking-[1px]">
              {fact.label}
            </dt>
            <dd className="font-display text-[30px] text-text-inverse lg:text-[38px]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
