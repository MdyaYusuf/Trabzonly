/** Smooth-scroll a list section to sit just below sticky header + filter chrome. */
export function scrollListToTop(listId: string, filtersId?: string) {
  const list = document.getElementById(listId)

  if (!list) {
    return
  }

  const filters = filtersId ? document.getElementById(filtersId) : null
  const headerOffset = window.matchMedia('(min-width: 640px)').matches ? 80 : 64
  const stickyClearance = filters
    ? Math.max(filters.getBoundingClientRect().bottom, headerOffset + filters.offsetHeight)
    : headerOffset
  const top = list.getBoundingClientRect().top + window.scrollY - stickyClearance - 8

  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}
