interface TabItem {
  key: string;
  label: string;
}

interface TabNavProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export default function TabNav({ tabs, activeKey, onTabChange }: TabNavProps) {
  return (
    <div className="flex flex-wrap gap-2 p-1 bg-card rounded-2xl border border-border-light shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative ${
            activeKey === tab.key
              ? 'bg-primary text-white shadow-md'
              : 'text-text-secondary hover:text-primary hover:bg-primary-50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
