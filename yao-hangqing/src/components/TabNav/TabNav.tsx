import { Link } from 'react-router-dom';

interface TabItem {
  key: string;
  label: string;
  path?: string;
}

interface TabNavProps {
  tabs: TabItem[];
  activeKey: string;
  onTabChange: (key: string) => void;
}

export default function TabNav({ tabs, activeKey, onTabChange }: TabNavProps) {
  return (
    <div className="flex gap-1 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            activeKey === tab.key
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
