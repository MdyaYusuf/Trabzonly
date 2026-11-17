/** ~3 feed cards visible; scroll stays inside the panel. */
export const FEED_SCROLL_PANEL_CLASS =
  'h-[min(110vh,88rem)] overflow-y-auto overscroll-contain px-space-md py-space-sm sm:px-space-lg [scrollbar-width:thin] [scrollbar-color:rgba(31,27,23,0.16)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-on-surface/12 hover:[&::-webkit-scrollbar-thumb]:bg-on-surface/22'

export function measureRemovedFeedHeight(scrollRoot: HTMLElement, removedIds: string[]) {
  let height = 0

  for (const id of removedIds) {
    const node = scrollRoot.querySelector<HTMLElement>(
      `[data-feed-post-id="${CSS.escape(id)}"]`,
    )

    if (node) {
      height += node.offsetHeight
    }
  }

  return height
}
