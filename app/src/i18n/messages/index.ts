import type { Language } from '../config'
import type { Messages } from '../types'
import { de } from './de'
import { en } from './en'
import { pl } from './pl'

export const messages: Record<Language, Messages> = { de, en, pl }
