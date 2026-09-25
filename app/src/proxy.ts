import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { type NextRequest, NextResponse } from 'next/server'

import {
  defaultLanguage,
  isLanguage,
  type Language,
  languageCookie,
  languages,
} from './i18n/config'

const oneYear = 60 * 60 * 24 * 365

function preferredLanguage(request: NextRequest): Language {
  const saved = request.cookies.get(languageCookie)?.value
  if (isLanguage(saved)) return saved

  const accepted = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') ?? '' },
  }).languages()

  try {
    const matched = match(accepted, languages, defaultLanguage)
    return isLanguage(matched) ? matched : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, firstSegment] = pathname.split('/')

  if (isLanguage(firstSegment)) {
    const response = NextResponse.next()
    if (request.cookies.get(languageCookie)?.value !== firstSegment) {
      response.cookies.set(languageCookie, firstSegment, {
        maxAge: oneYear,
        path: '/',
        sameSite: 'lax',
      })
    }
    return response
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLanguage(request)}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[^/]+$).*)'],
}
