import { defineQuery } from 'next-sanity'

const isWinter = `*[_id == "siteSettings"][0].season == "winter"`

const photoFields = `
  "alt": coalesce(alt[language == $lng][0].value, alt[language == "pl"][0].value),
  "image": image{
    hotspot,
    crop,
    asset->{ _id, metadata { lqip, dimensions { width, height } } }
  }`

const photo = `{${photoFields}}`

const resolvedSlot = `"photo": select(${isWinter} && defined(winterPhoto) => winterPhoto->, photo->)${photo}`

const period = `coalesce(period[language == $lng][0].value, period[language == "pl"][0].value)`
const minimumStay = `coalesce(minimumStay[language == $lng][0].value, minimumStay[language == "pl"][0].value)`
const addOnName = `coalesce(name[language == $lng][0].value, name[language == "pl"][0].value)`
const addOnNote = `coalesce(note[language == $lng][0].value, note[language == "pl"][0].value)`
const factLabel = `coalesce(label[language == $lng][0].value, label[language == "pl"][0].value)`
const factValue = `coalesce(value[language == $lng][0].value, value[language == "pl"][0].value)`

export const homePageQuery = defineQuery(`{
  "home": *[_id == "homePage"][0]{
    hero{
      "videoUrl": select(${isWinter} && defined(winterVideo) => winterVideo.asset->url, video.asset->url),
      poster{ ${resolvedSlot} }
    },
    intro{ house{ ${resolvedSlot} }, detail{ ${resolvedSlot} } },
    spa{ saltGrotto{ ${resolvedSlot} }, hotTub{ ${resolvedSlot} }, sauna{ ${resolvedSlot} } },
    interiors{ ${resolvedSlot} },
    location{ ${resolvedSlot} },
    "galleryPreview": galleryPreview[]->{ "_key": _id, ${photoFields} }
  },
  "pricing": *[_id == "pricing"][0]{
    year,
    rates[]{ _key, "period": ${period}, "minimumStay": ${minimumStay}, amount, unit, extraPerson },
    addOns[]{ _key, "name": ${addOnName}, "note": ${addOnNote}, amount, unit },
    facts[]{ _key, "label": ${factLabel}, "value": ${factValue} }
  }
}`)

const bedroomName = `coalesce(name[language == $lng][0].value, name[language == "pl"][0].value)`
const bedroomBeds = `coalesce(beds[language == $lng][0].value, beds[language == "pl"][0].value)`

export const interiorsPageQuery = defineQuery(`*[_id == "interiorsPage"][0]{
  header{ ${resolvedSlot} },
  rooms[]{ _key, type, "photos": photos[]->{ "_key": _id, ${photoFields} } },
  bedrooms[]{
    _key,
    "name": ${bedroomName},
    "beds": ${bedroomBeds},
    guests,
    "photos": photos[]->{ "_key": _id, ${photoFields} }
  }
}`)

export const surroundingsPageQuery = defineQuery(`*[_id == "surroundingsPage"][0]{
  header{ ${resolvedSlot} },
  babiaGora{ ${resolvedSlot} },
  slopes{ ${resolvedSlot} },
  trails{ ${resolvedSlot} },
  waterfalls{ ${resolvedSlot} }
}`)

export const galleryPageQuery = defineQuery(`*[_id == "galleryPage"][0]{
  header{ ${resolvedSlot} },
  "photos": photos[]->{ "_key": _id, category, ${photoFields} }
}`)

export const contactPageQuery = defineQuery(`*[_id == "contactPage"][0]{
  header{ ${resolvedSlot} },
  map{ ${resolvedSlot} }
}`)
