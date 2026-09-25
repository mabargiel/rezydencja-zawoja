import { defineQuery } from 'next-sanity'

const isWinter = `*[_id == "siteSettings"][0].season == "winter"`

const photo = `{
  "alt": coalesce(alt[language == $lng][0].value, alt[language == "pl"][0].value),
  "image": image{
    hotspot,
    crop,
    asset->{ _id, metadata { lqip, dimensions { width, height } } }
  }
}`

export const pageHeaderQuery = defineQuery(`*[_id == $page][0]{
  "photo": select(${isWinter} && defined(header.winterPhoto) => header.winterPhoto->, header.photo->)${photo}
}`)
