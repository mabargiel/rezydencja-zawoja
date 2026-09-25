import { createInstance, type TFunction } from 'i18next'
import { notFound } from 'next/navigation'
import { lng } from 'next/root-params'

import { isLanguage, type Language } from './config'
import { messages } from './messages'

const translators = new Map<Language, TFunction>()

function createTranslator(language: Language): TFunction {
  const instance = createInstance()
  void instance.init({
    initAsync: false,
    interpolation: { escapeValue: false },
    lng: language,
    resources: { [language]: { translation: messages[language] } },
  })
  return instance.getFixedT(language)
}

export async function getLanguage(): Promise<Language> {
  const value = await lng()
  if (!isLanguage(value)) notFound()
  return value
}

export async function getT(): Promise<TFunction> {
  const language = await getLanguage()
  let t = translators.get(language)
  if (!t) {
    t = createTranslator(language)
    translators.set(language, t)
  }
  return t
}
