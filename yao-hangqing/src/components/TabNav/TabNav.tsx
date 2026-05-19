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
    <div className="flex gap-6 border-b border-border-subtle">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`pb-3 text-sm font-medium transition-colors relative ${
            activeKey === tab.key
              ? 'text-accent border-b-2 border-accent'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
