import { Color } from './mockData';

interface ColorSelectorProps {
  colors: Color[];
  selectedColor: Color;
  onColorChange: (color: Color) => void;
}

export const ColorSelector = ({ colors, selectedColor, onColorChange }: ColorSelectorProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Cor</h3>
      <div className="flex space-x-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorChange(color)}
            className={`w-8 h-8 rounded-full border border-gray-200 focus:outline-none ring-2 ring-offset-2 ${color.class} ${
              selectedColor.name === color.name ? color.selectedClass : 'ring-transparent'
            }`}
            aria-label={color.name}
          />
        ))}
      </div>
    </div>
  );
};
