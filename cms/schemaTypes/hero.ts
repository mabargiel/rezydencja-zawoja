import { defineArrayMember, defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Videos',
  type: 'document',
  fields: [
    defineField({
      name: 'videos',
      title: 'Hero Videos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'file',
          options: { accept: 'video/mp4,video/webm' },
        }),
      ],
    }),
  ],
})
