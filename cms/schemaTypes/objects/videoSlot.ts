import { PlayIcon } from '@sanity/icons/Play'
import { defineField, defineType } from 'sanity'

const videoOptions = { accept: 'video/mp4,video/webm' }

export const videoSlot = defineType({
  name: 'videoSlot',
  title: 'Wideo',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'video',
      title: 'Wideo',
      type: 'file',
      options: videoOptions,
      validation: rule => rule.required(),
    }),
    defineField({
      name: 'winterVideo',
      title: 'Wideo zimowe',
      description: 'Pokazywane zamiast wideo głównego, gdy w ustawieniu „Sezon” wybrano zimę.',
      type: 'file',
      options: videoOptions,
    }),
    defineField({
      name: 'poster',
      title: 'Kadr zastępczy',
      description: 'Pokazywany przed załadowaniem wideo i gdy odtwarzanie jest wyłączone.',
      type: 'mediaSlot',
      validation: rule => rule.required(),
    }),
  ],
})
