import type { PageHeaderQueryResult } from './types'

type HeaderSlot = NonNullable<NonNullable<PageHeaderQueryResult>['header']>

export type ResolvedPhoto = NonNullable<HeaderSlot['photo']>
