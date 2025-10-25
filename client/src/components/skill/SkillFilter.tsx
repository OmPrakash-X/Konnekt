import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-semibold">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-white">
                Filters
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategories.includes(category)
                        ? 'bg-white text-black'
                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Levels */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Difficulty Level
              </h4>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => toggleLevel(level)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedLevels.includes(level)
                        ? 'bg-white text-black'
                        : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Minimum Rating
              </h4>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={minRating}
                onChange={(e) => setMinRating(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>0</span>
                <span className="font-semibold text-white">
                  {minRating.toFixed(1)}+
                </span>
                <span>5</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={handleApply}
                className="flex-1 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                Apply
              </button>
              <button
                onClick={handleClear}
                className="flex-1 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SkillFilter;
