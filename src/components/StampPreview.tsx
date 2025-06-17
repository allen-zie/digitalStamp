import React, { forwardRef } from 'react';
import { StampData, StampStyle } from '../App';

interface StampPreviewProps {
  stampData: StampData;
  stampStyle: StampStyle;
}

const StampPreview = forwardRef<HTMLDivElement, StampPreviewProps>(
  ({ stampData, stampStyle }, ref) => {
    const renderStampContent = () => {
      const lines = [
        stampData.companyName,
        ...stampData.companyDetails.split('\n').filter(line => line.trim()),
        stampData.date
      ].filter(line => line.trim());

      return lines.map((line, index) => (
        <div
          key={index}
          className={`text-center ${
            index === 0 ? 'font-bold text-lg' : 
            index === lines.length - 1 ? 'font-semibold text-sm mt-2' : 
            'text-sm'
          }`}
          style={{
            color: stampStyle.textColor,
            fontSize: index === 0 ? `${stampStyle.fontSize + 4}px` : `${stampStyle.fontSize}px`,
            fontWeight: index === 0 ? stampStyle.fontWeight : 'normal'
          }}
        >
          {line}
        </div>
      ));
    };

    const getStampClasses = () => {
      const baseClasses = "flex items-center justify-center p-8 bg-white relative";
      
      switch (stampStyle.design) {
        case 'circular':
          return `${baseClasses} rounded-full aspect-square border-4`;
        case 'rectangular':
          return `${baseClasses} rounded-lg border-4`;
        case 'oval':
          return `${baseClasses} rounded-full border-4`;
        case 'diamond':
          return `${baseClasses} rotate-45 border-4`;
        case 'hexagonal':
          return `${baseClasses} border-4 clip-hexagon`;
        default:
          return `${baseClasses} rounded-full aspect-square border-4`;
      }
    };

    const getContainerStyle = () => {
      const style: React.CSSProperties = {
        borderColor: stampStyle.borderColor,
        width: stampStyle.design === 'rectangular' ? '300px' : '250px',
        height: stampStyle.design === 'rectangular' ? '200px' : '250px',
      };

      if (stampStyle.design === 'oval') {
        style.aspectRatio = '4/3';
      }

      if (stampStyle.design === 'hexagonal') {
        style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
      }

      return style;
    };

    return (
      <div className="flex flex-col items-center space-y-6">
        <div ref={ref} className="flex justify-center">
          <div
            className={getStampClasses()}
            style={getContainerStyle()}
          >
            <div className={stampStyle.design === 'diamond' ? '-rotate-45' : ''}>
              {renderStampContent()}
            </div>
          </div>
        </div>

        {/* Sample Document Preview */}
        <div className="w-full max-w-md bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Sample Document</h3>
          <div className="text-sm text-gray-600 leading-relaxed mb-4">
            This is a sample document showing how your stamp would appear when applied.
            The stamp can be positioned anywhere on PDF or Word documents.
          </div>
          <div className="flex justify-end">
            <div
              className={`${getStampClasses()} scale-50 origin-center`}
              style={{
                ...getContainerStyle(),
                transform: `scale(0.4) ${stampStyle.design === 'diamond' ? 'rotate(45deg)' : ''}`,
              }}
            >
              <div className={stampStyle.design === 'diamond' ? '-rotate-45' : ''}>
                {renderStampContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StampPreview.displayName = 'StampPreview';

export default StampPreview;