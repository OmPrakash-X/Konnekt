import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

interface SkillFilterProps {
  categories: string[];
  levels: string[];
  onFilterChange: (filters: {
    categories: string[];
    levels: string[];
    minRating: number;
  }) => void;
}

const SkillFilter: React.FC<SkillFilterProps> = ({
  categories,
  levels,
  onFilterChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
  };

  const toggleLevel = (level: string) => {
    const updated = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];
    setSelectedLevels(updated);
  };

  const handleApply = () => {
    onFilterChange({
      categories: selectedCategories,
      levels: selectedLevels,
      minRating,
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedLevels([]);
    setMinRating(0);
    onFilterChange({ categories: [], levels: [], minRating: 0 });
  };

  const activeFiltersCount =
    selectedCategories.length + selectedLevels.length + (minRating > 0 ? 1 : 0);

  return (
    <div className="relative">
      {/* Filter Button */}
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#32b8c6] text-white text-xs rounded-full flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </Button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Filters
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-[#32b8c6] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty Level
              </h4>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => toggleLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedLevels.includes(level)
                        ? 'bg-[#32b8c6] text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Rating
              </h4>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span>0</span>
                <span className="font-medium text-[#32b8c6]">
                  {minRating.toFixed(1)}+
                </span>
                <span>5</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button onClick={handleApply} fullWidth>
                Apply
              </Button>
              <Button onClick={handleClear} variant="outline" fullWidth>
                Clear
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillFilter;
