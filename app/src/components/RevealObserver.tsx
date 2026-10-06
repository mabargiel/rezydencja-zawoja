'use client'

import { useEffect } from 'react'

const selector = '.reveal, .reveal-left, .reveal-right, .reveal-media'

function isInViewport(element: Element) {
  return element.getBoundingClientRect().top < window.innerHeight
}

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const reveal = (element: Element) => element.setAttribute('data-revealed', '')

    const intersection = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          intersection.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )

    const track = (element: Element) => {
      if (element.hasAttribute('data-revealed')) return
      if (isInViewport(element)) reveal(element)
      else intersection.observe(element)
    }

    const trackWithin = (root: ParentNode) => root.querySelectorAll(selector).forEach(track)

    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue
          if (node.matches(selector)) track(node)
          trackWithin(node)
        }
      }
    })

    trackWithin(document)
    mutations.observe(document.body, { childList: true, subtree: true })
    document.documentElement.setAttribute('data-reveal-ready', '')

    return () => {
      intersection.disconnect()
      mutations.disconnect()
    }
  }, [])

  return null
}
