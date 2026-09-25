export default {
  name: 'photoGallery',
  title: 'Photo Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Gallery Title',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
}