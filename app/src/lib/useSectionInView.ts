import { useCallback, useSyncExternalStore } from 'react'

const visibility = new Map<string, boolean>()

const middleOfViewport = '-50% 0px -50% 0px'

export function useSectionInView(
  id: string | undefined,
  enabled: boolean,
  rootMargin: string = middleOfViewport
): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const element = id && enabled ? document.getElementById(id) : null
      if (!id || !element) return () => {}

      const key = `${id}|${rootMargin}`
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibility.set(key, entry.isIntersecting)
          onChange()
        },
        { rootMargin }
      )
      observer.observe(element)
      return () => observer.disconnect()
    },
    [id, enabled, rootMargin]
  )

  return useSyncExternalStore(
    subscribe,
    () => (id && enabled ? (visibility.get(`${id}|${rootMargin}`) ?? false) : false),
    () => false
  )
}
