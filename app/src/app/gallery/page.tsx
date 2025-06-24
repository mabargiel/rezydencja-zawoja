import Image from 'next/image'

import { getGallery } from '@/lib/queries'
import { GalleryImage } from '@/lib/schemas'

export default async function GalleryPage() {
  const gallery = await getGallery()

  if (!gallery) {
    return <p className="p-6 text-red-600">No gallery data found.</p>
  }

  const columnCount = 4
  const columns: GalleryImage[][] = Array.from({ length: columnCount }, () => [])

  gallery.images.forEach((img, index) => {
    columns[index % columnCount].push(img)
  })

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">{gallery.title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {columns.map((column, columnIndex) => (
          <div key={columnIndex} className="grid">
            {column.map((img, i) => {
              const { url, metadata } = img.asset
              const { width, height } = metadata.dimensions

              return (
                <div key={i}>
                  <Image
                    src={url}
                    alt=""
                    width={width}
                    height={height}
                    className="h-auto max-w-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </section>
  )
}
