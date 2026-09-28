import { useCallback, useSyncExternalStore } from 'react'

const visibility = new Map<string, boolean>()

export function useSectionInView(id: string | undefined, enabled: boolean): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const element = id && enabled ? document.getElementById(id) : null
      if (!id || !element) return () => {}

      const observer = new IntersectionObserver(
        ([entry]) => {
          visibility.set(id, entry.isIntersecting)
          onChange()
        },
        { rootMargin: '-50% 0px -50% 0px' }
      )
      observer.observe(element)
      return () => {
        observer.disconnect()
        visibility.delete(id)
      }
    },
    [id, enabled]
  )

  return useSyncExternalStore(
    subscribe,
    () => (id && enabled ? (visibility.get(id) ?? false) : false),
    () => false
  )
}
