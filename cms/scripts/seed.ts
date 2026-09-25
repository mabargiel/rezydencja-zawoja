import { createReadStream } from 'node:fs'
import { basename, resolve } from 'node:path'

import { getCliClient } from 'sanity/cli'

import { layout, photoId, photos, pricing } from './seed-map'

type Localized = { pl: string; en: string; de: string }

const client = getCliClient({ apiVersion: '2026-09-01' })

type SeedDocument = Parameters<typeof client.createOrReplace>[0]

const imagesDir = resolve(process.cwd(), '../design/images')

const localized = (text: Localized) =>
  (['pl', 'en', 'de'] as const).map(language => ({
    _key: language,
    _type: 'internationalizedArrayStringValue',
    language,
    value: text[language],
  }))

const photoRef = (file: string) => ({ _type: 'reference', _ref: photoId(file) })

const slot = (file: string) => ({ _type: 'mediaSlot', photo: photoRef(file) })

const slotList = (files: string[]) =>
  files.map((file, index) => ({ ...slot(file), _key: `slot-${index}` }))

const photoRefList = (files: string[]) =>
  files.map(file => ({ ...photoRef(file), _key: photoId(file) }))

async function seedPhotos() {
  for (const photo of photos) {
    const asset = await client.assets.upload(
      'image',
      createReadStream(resolve(imagesDir, photo.file)),
      { filename: photo.file }
    )
    await client.createOrReplace({
      _id: photoId(photo.file),
      _type: 'photo',
      alt: localized(photo.alt),
      category: photo.category,
      image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    })
    console.log(`photo ${photo.file}`)
  }
}

async function heroVideoRef() {
  const path = process.env.HERO_VIDEO
  if (path) {
    const asset = await client.assets.upload('file', createReadStream(path), {
      contentType: 'video/mp4',
      filename: basename(path),
    })
    return asset._id
  }
  const existing = await client.fetch<string | null>(
    '*[_id == "homePage"][0].hero.video.asset._ref'
  )
  if (!existing) throw new Error('Set HERO_VIDEO to the path of the hero video for the first run')
  return existing
}

async function seedPages() {
  const { contactPage, galleryPage, homePage, interiorsPage, surroundingsPage } = layout
  const videoRef = await heroVideoRef()

  const documents: SeedDocument[] = [
    { _id: 'siteSettings', _type: 'siteSettings', season: 'summer' },
    {
      _id: 'homePage',
      _type: 'homePage',
      hero: {
        _type: 'videoSlot',
        poster: slot(homePage.heroPoster),
        video: { _type: 'file', asset: { _type: 'reference', _ref: videoRef } },
      },
      intro: { house: slot(homePage.intro.house), detail: slot(homePage.intro.detail) },
      spa: {
        saltGrotto: slot(homePage.spa.saltGrotto),
        hotTub: slot(homePage.spa.hotTub),
        sauna: slot(homePage.spa.sauna),
      },
      interiors: slot(homePage.interiors),
      location: slot(homePage.location),
      galleryPreview: photoRefList(homePage.galleryPreview),
    },
    {
      _id: 'interiorsPage',
      _type: 'interiorsPage',
      header: slot(interiorsPage.header),
      livingRoom: slot(interiorsPage.livingRoom),
      antiques: slot(interiorsPage.antiques),
      bedrooms: slot(interiorsPage.bedrooms),
      comfort: slot(interiorsPage.comfort),
      relaxation: slotList(interiorsPage.relaxation),
      details: slotList(interiorsPage.details),
    },
    {
      _id: 'surroundingsPage',
      _type: 'surroundingsPage',
      header: slot(surroundingsPage.header),
      babiaGora: slot(surroundingsPage.babiaGora),
      slopes: slot(surroundingsPage.slopes),
      trails: slot(surroundingsPage.trails),
      waterfalls: slot(surroundingsPage.waterfalls),
    },
    {
      _id: 'galleryPage',
      _type: 'galleryPage',
      header: slot(galleryPage.header),
      photos: photoRefList(galleryPage.photos),
    },
    {
      _id: 'contactPage',
      _type: 'contactPage',
      header: slot(contactPage.header),
      map: slot(contactPage.map),
    },
    {
      _id: 'pricing',
      _type: 'pricing',
      year: pricing.year,
      rates: pricing.rates.map((rate, index) => ({
        _key: `rate-${index}`,
        _type: 'rate',
        period: localized(rate.period),
        minimumStay: localized(rate.minimumStay),
        amount: rate.amount,
        unit: rate.unit,
        extraPerson: rate.extraPerson,
      })),
      addOns: pricing.addOns.map((addOn, index) => ({
        _key: `addon-${index}`,
        _type: 'addOn',
        name: localized(addOn.name),
        note: localized(addOn.note),
        amount: addOn.amount,
        unit: addOn.unit,
      })),
      facts: pricing.facts.map((fact, index) => ({
        _key: `fact-${index}`,
        _type: 'fact',
        label: localized(fact.label),
        value: localized(fact.value),
      })),
    },
  ]

  const transaction = client.transaction()
  for (const document of documents) transaction.createOrReplace(document)
  await transaction.commit()
  console.log(`${documents.length} singletons`)
}

await seedPhotos()
await seedPages()
