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
    <div className="flex gap-8 border-b border-paper-dark">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`pb-3 text-sm font-medium transition-all relative ${
            activeKey === tab.key
              ? 'text-jade border-b-2 border-jade'
              : 'text-ink-light hover:text-jade'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
