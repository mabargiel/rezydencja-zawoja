import { PageHeader } from '@/components/PageHeader'
import { BedroomCards } from '@/components/subpages/BedroomCards'
import { RoomNav } from '@/components/subpages/RoomNav'
import { RoomSection } from '@/components/subpages/RoomSection'
import { getLightboxLabels } from '@/i18n/lightbox'
import { getLanguage, getT } from '@/i18n/server'
import { pageMetadata } from '@/lib/metadata'
import { sanityFetch } from '@/sanity/live'
import { interiorsPageQuery } from '@/sanity/queries'

export const generateMetadata = () => pageMetadata('interiors')

const roomsId = 'rooms'

export default async function InteriorsPage() {
  const [language, t, lightbox] = await Promise.all([getLanguage(), getT(), getLightboxLabels()])
  const { data } = await sanityFetch({
    params: { lng: language },
    query: interiorsPageQuery,
    stega: false,
  })

  const rooms = (data?.rooms ?? []).flatMap(room =>
    room.type && room.photos?.length ? [{ ...room, photos: room.photos, type: room.type }] : []
  )
  const bedrooms = data?.bedrooms ?? []
  const openPhoto = t('pages.interiors.openPhoto')

  return (
    <main>
      <PageHeader
        eyebrow={t('pages.interiors.eyebrow')}
        title={t('pages.interiors.title')}
        intro={t('pages.interiors.intro')}
        image={data?.header?.photo}
      />
      <RoomNav
        label={t('pages.interiors.nav')}
        roomsId={roomsId}
        rooms={rooms.map(room => ({
          id: room.type,
          label: t(`pages.interiors.rooms.${room.type}.short`),
        }))}
      />
      <div id={roomsId} className="divide-y divide-line">
        {rooms.map(room => (
          <RoomSection
            key={room._key}
            id={room.type}
            eyebrow={`${t(`pages.interiors.rooms.${room.type}.name`)} · ${t(`pages.interiors.rooms.${room.type}.floor`)}`}
            title={t(`pages.interiors.rooms.${room.type}.title`)}
            body={t(`pages.interiors.rooms.${room.type}.body`)}
            facts={t(`pages.interiors.rooms.${room.type}.facts`, { returnObjects: true })}
            photos={room.photos}
            openPhoto={openPhoto}
            lightbox={lightbox}
          >
            {room.type === 'bedrooms' && bedrooms.length > 0 && (
              <BedroomCards
                bedrooms={bedrooms}
                labels={{ guests: t('pages.interiors.guests'), openPhoto }}
                lightbox={lightbox}
              />
            )}
          </RoomSection>
        ))}
      </div>
    </main>
  )
}
