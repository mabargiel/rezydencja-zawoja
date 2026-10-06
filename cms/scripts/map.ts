import { getCliClient } from 'sanity/cli'

import { azureMapPhotoId } from './seed-map'

const client = getCliClient({ apiVersion: '2026-09-01' })

process.loadEnvFile('.env')

const house = { lat: 49.64051614064316, lng: 19.558586753262016 }

// Azure caps static images at 2000px wide; the height keeps the design's 1440×560 map ratio.
const width = 2000
const height = Math.round((width * 560) / 1440)

async function renderMap() {
  const key = process.env.AZURE_MAPS_KEY
  if (!key) throw new Error('Set AZURE_MAPS_KEY in cms/.env')

  const url = new URL('https://atlas.microsoft.com/map/static')
  url.search = new URLSearchParams({
    'api-version': '2024-04-01',
    center: `${house.lng},${house.lat}`,
    height: String(height),
    language: 'pl-PL',
    tilesetId: 'microsoft.base.road',
    width: String(width),
    zoom: '13',
  }).toString()

  const response = await fetch(url, { headers: { 'subscription-key': key } })
  if (!response.ok) {
    throw new Error(`Azure Maps returned ${response.status}: ${await response.text()}`)
  }
  return Buffer.from(await response.arrayBuffer())
}

const asset = await client.assets.upload('image', await renderMap(), {
  filename: 'mapa-zawoja-azure.png',
})

await client.createOrReplace({
  _id: azureMapPhotoId,
  _type: 'photo',
  alt: [
    {
      _key: 'pl',
      _type: 'internationalizedArrayStringValue',
      language: 'pl',
      value: 'Mapa Zawoi z położeniem Rezydencji Zawoja w Zawoi Mosorne',
    },
    {
      _key: 'en',
      _type: 'internationalizedArrayStringValue',
      language: 'en',
      value: 'Map of Zawoja showing Rezydencja Zawoja in Zawoja Mosorne',
    },
    {
      _key: 'de',
      _type: 'internationalizedArrayStringValue',
      language: 'de',
      value: 'Karte von Zawoja mit der Lage der Rezydencja Zawoja in Zawoja Mosorne',
    },
  ],
  category: 'surroundings',
  image: {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    hotspot: { _type: 'sanity.imageHotspot', height: 1, width: 1, x: 0.5, y: 0.5 },
  },
})

await client
  .patch('contactPage')
  .setIfMissing({ map: { _type: 'mediaSlot' } })
  .set({ 'map.photo': { _type: 'reference', _ref: azureMapPhotoId } })
  .commit()

console.log(`map ${width}×${height} uploaded as ${azureMapPhotoId}`)
