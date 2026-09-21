import type { PublicMemberTab, PublicMemberTabId } from '../utils/publicMemberProfileTypes'

type PublicMemberProfileTabsProps = {
  tabs: PublicMemberTab[]
  activeTab: PublicMemberTabId
  onChange: (tab: PublicMemberTabId) => void
}

export function PublicMemberProfileTabs({
  tabs,
  activeTab,
  onChange,
}: PublicMemberProfileTabsProps) {
  return (
    <nav
      aria-label="Profil bölümleri"
      className="flex gap-0 overflow-x-auto border-b border-outline-variant/50"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              onChange(tab.id)
            }}
            className={`font-label inline-flex shrink-0 items-center gap-space-xs border-b-2 px-space-md py-space-sm text-label-md uppercase transition-colors ${
              isActive
                ? 'border-primary font-bold text-primary'
                : 'border-transparent text-on-surface-variant hover:text-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            {tab.label} ({tab.count})
          </button>
        )
      })}
    </nav>
  )
}
