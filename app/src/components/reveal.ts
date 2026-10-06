const delays = ['', 'reveal-delay-1', 'reveal-delay-2', 'reveal-delay-3']

export function revealDelay(index: number) {
  return delays[index % delays.length]
}
