import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'line' | 'pills';
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = 'line',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id);

  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div
        className={`
          flex gap-2
          ${variant === 'line' ? 'border-b border-gray-200 dark:border-gray-700' : ''}
        `}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 font-medium text-sm
              transition-all duration-200
              ${
                variant === 'line'
                  ? activeTab === tab.id
                    ? 'border-b-2 border-[#32b8c6] text-[#32b8c6] dark:text-[#32b8c6]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  : activeTab === tab.id
                  ? 'bg-[#32b8c6] text-white rounded-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg'
              }
            `}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">{activeContent}</div>
    </div>
  );
};

export default Tabs;
