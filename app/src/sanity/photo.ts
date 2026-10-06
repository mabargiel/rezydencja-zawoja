import type { ContactPageQueryResult } from './types'

type HeaderSlot = NonNullable<NonNullable<ContactPageQueryResult>['header']>

export type ResolvedPhoto = NonNullable<HeaderSlot['photo']>

export type KeyedPhoto = ResolvedPhoto & { _key: string }
