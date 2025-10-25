import React, { useState, useRef, useEffect } from 'react';

interface DropdownItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          {/* Glassmorphism Dropdown Menu */}
          <div className="bg-black/90 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="py-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200
                    ${
                      item.danger
                        ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  {item.icon && (
                    <span className={item.danger ? 'text-red-400' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
