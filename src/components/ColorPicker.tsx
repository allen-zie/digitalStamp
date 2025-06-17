import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  borderColor: string;
  textColor: string;
  onBorderColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  borderColor,
  textColor,
  onBorderColorChange,
  onTextColorChange
}) => {
  const presetColors = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#F97316', // Orange
    '#EF4444', // Red
    '#10B981', // Green
    '#F59E0B', // Yellow
    '#6B7280', // Gray
    '#1F2937', // Dark Gray
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Palette className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-700">Colors</h3>
      </div>

      {/* Border Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Border Color
        </label>
        <div className="flex items-center space-x-3 mb-3">
          <input
            type="color"
            value={borderColor}
            onChange={(e) => onBorderColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={borderColor}
            onChange={(e) => onBorderColorChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
            placeholder="#000000"
          />
        </div>
        <div className="grid grid-cols-8 gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => onBorderColorChange(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                borderColor === color ? 'border-gray-800 ring-2 ring-gray-300' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Text Color
        </label>
        <div className="flex items-center space-x-3 mb-3">
          <input
            type="color"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="w-12 h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
          />
          <input
            type="text"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
            placeholder="#000000"
          />
        </div>
        <div className="grid grid-cols-8 gap-2">
          {presetColors.map((color) => (
            <button
              key={color}
              onClick={() => onTextColorChange(color)}
              className={`w-8 h-8 rounded-lg border-2 transition-all duration-200 hover:scale-110 ${
                textColor === color ? 'border-gray-800 ring-2 ring-gray-300' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;