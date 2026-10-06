'use client'

import { useEffect, useRef } from 'react'

import { chipStateClass } from '@/components/chip'
import { useSectionInView } from '@/lib/useSectionInView'

type Room = { id: string; label: string }

type RoomNavProps = {
  rooms: Room[]
  label: string
  roomsId: string
}

const topRowId = 'room-nav'

// The footer is shorter than half a screen, so the rooms' end never crosses mid-screen.
const belowNavbar = '-96px 0px 0px 0px'
const lowestQuarter = '-75% 0px 0px 0px'

export function RoomNav({ rooms, label, roomsId }: RoomNavProps) {
  const isTopRowInView = useSectionInView(topRowId, true, belowNavbar)
  const areRoomsInView = useSectionInView(roomsId, true, lowestQuarter)
  const isRailVisible = !isTopRowInView && areRoomsInView

  return (
    <>
      <nav
        id={topRowId}
        aria-label={label}
        className="sticky top-[68px] z-20 border-b border-line bg-bg/95 lg:static lg:border-0 lg:bg-transparent"
      >
        <ul className="flex gap-2.5 overflow-x-auto px-5 scrollbar-none py-3.5 lg:gap-3 lg:px-[120px] lg:pt-10 lg:pb-2">
          {rooms.map(room => (
            <li key={room.id} className="shrink-0">
              <RoomChip room={room} />
            </li>
          ))}
        </ul>
      </nav>

      <nav
        aria-label={label}
        className={`fixed top-1/2 right-[88px] z-20 hidden -translate-y-1/2 flex-col gap-3.5 border border-line bg-bg/90 px-5 py-[18px] backdrop-blur-md transition-[opacity,visibility] duration-300 lg:flex ${
          isRailVisible ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-3.5">
          {rooms.map(room => (
            <li key={room.id}>
              <RailLink room={room} />
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

function RoomChip({ room }: { room: Room }) {
  const isActive = useSectionInView(room.id, true)
  const chip = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const element = chip.current
    const row = element?.closest('ul')
    if (!isActive || !element || !row) return
    row.scrollTo({
      behavior: 'smooth',
      left: element.offsetLeft - (row.clientWidth - element.offsetWidth) / 2,
    })
  }, [isActive])

  return (
    <a
      ref={chip}
      href={`#${room.id}`}
      aria-current={isActive ? 'location' : undefined}
      className={`block px-4 py-2 font-body text-[12.5px] tracking-[0.5px] transition-colors lg:px-[22px] lg:py-2.5 lg:text-[13px] lg:tracking-[1px] ${chipStateClass(isActive)}`}
    >
      {room.label}
    </a>
  )
}

function RailLink({ room }: { room: Room }) {
  const isActive = useSectionInView(room.id, true)

  return (
    <a
      href={`#${room.id}`}
      aria-current={isActive ? 'location' : undefined}
      className={`flex items-center gap-2.5 font-body text-xs tracking-[1px] transition-colors hover:text-accent-warm-deep ${
        isActive ? 'font-medium text-accent-warm-deep' : 'text-text-secondary'
      }`}
    >
      <span
        aria-hidden
        className={`size-[7px] rounded-full border ${
          isActive ? 'border-accent-warm bg-accent-warm' : 'border-text-secondary'
        }`}
      />
      {room.label}
    </a>
  )
}
