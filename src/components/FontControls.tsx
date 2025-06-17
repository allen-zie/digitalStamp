import React from 'react';
import { Type } from 'lucide-react';

interface FontControlsProps {
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'bolder';
  onFontSizeChange: (size: number) => void;
  onFontWeightChange: (weight: 'normal' | 'bold' | 'bolder') => void;
}

const FontControls: React.FC<FontControlsProps> = ({
  fontSize,
  fontWeight,
  onFontSizeChange,
  onFontWeightChange
}) => {
  const fontWeightOptions = [
    { value: 'normal', label: 'Normal', preview: 'Aa' },
    { value: 'bold', label: 'Bold', preview: 'Aa' },
    { value: 'bolder', label: 'Bolder', preview: 'Aa' }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Type className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-700">Typography</h3>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Font Size: {fontSize}px
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="10"
            max="24"
            value={fontSize}
            onChange={(e) => onFontSizeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>10px</span>
            <span>12px</span>
            <span>14px</span>
            <span>16px</span>
            <span>18px</span>
            <span>20px</span>
            <span>22px</span>
            <span>24px</span>
          </div>
        </div>
      </div>

      {/* Font Weight */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Font Weight
        </label>
        <div className="grid grid-cols-3 gap-3">
          {fontWeightOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onFontWeightChange(option.value)}
              className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                fontWeight === option.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div 
                className="text-xl mb-1"
                style={{ fontWeight: option.value }}
              >
                {option.preview}
              </div>
              <div className="text-xs">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Size Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quick Sizes
        </label>
        <div className="flex space-x-2">
          {[10, 12, 14, 16, 18, 20].map((size) => (
            <button
              key={size}
              onClick={() => onFontSizeChange(size)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                fontSize === size
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontControls;