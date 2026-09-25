import 'i18next'

import type { pl } from './messages/pl'

type Widen<T> = { [K in keyof T]: T[K] extends string ? string : Widen<T[K]> }

export type Messages = Widen<typeof pl>

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: { translation: typeof pl }
  }
}
