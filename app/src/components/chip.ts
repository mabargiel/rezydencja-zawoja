export function chipStateClass(isActive: boolean) {
  return isActive
    ? 'bg-accent font-medium text-surface'
    : 'border border-line text-text-secondary hover:border-accent hover:text-accent'
}
