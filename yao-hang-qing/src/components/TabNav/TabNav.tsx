interface Tab {
  key: string;
  label: string;
}

interface TabNavProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
}

export default function TabNav({ tabs, activeKey, onChange }: TabNavProps) {
  return (
    <div className="flex border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
            activeKey === tab.key
              ? 'text-primary'
              : 'text-text-secondary hover:text-text'
          }`}
        >
          {tab.label}
          {activeKey === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t transition-all" />
          )}
        </button>
      ))}
    </div>
  );
}
