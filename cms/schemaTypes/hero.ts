export default {
  name: 'hero',
  title: 'Hero Videos',
  type: 'document',
  fields: [
    {
      name: 'videos',
      title: 'Hero Videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/mp4,video/webm',
          },
        },
      ],
    },
  ],
}