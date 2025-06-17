import React, { useState, useEffect, useRef } from 'react';
import { Palette, Download, Calendar, Type, Zap, Stamp } from 'lucide-react';
import StampPreview from './components/StampPreview';
import ColorPicker from './components/ColorPicker';
import FontControls from './components/FontControls';
import ExportControls from './components/ExportControls';

export interface StampData {
  companyName: string;
  companyDetails: string;
  date: string;
  useCurrentDate: boolean;
}

export interface StampStyle {
  borderColor: string;
  textColor: string;
  fontSize: number;
  fontWeight: 'normal' | 'bold' | 'bolder';
  design: 'circular' | 'rectangular' | 'oval' | 'diamond' | 'hexagonal';
}

function App() {
  const [stampData, setStampData] = useState<StampData>({
    companyName: 'Your Company Name',
    companyDetails: 'Address Line 1\nCity, State ZIP',
    date: new Date().toLocaleDateString(),
    useCurrentDate: true
  });

  const [stampStyle, setStampStyle] = useState<StampStyle>({
    borderColor: '#3B82F6',
    textColor: '#1F2937',
    fontSize: 14,
    fontWeight: 'bold',
    design: 'circular'
  });

  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'export'>('content');

  // Update date automatically if useCurrentDate is true
  useEffect(() => {
    if (stampData.useCurrentDate) {
      const interval = setInterval(() => {
        setStampData(prev => ({
          ...prev,
          date: new Date().toLocaleDateString()
        }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stampData.useCurrentDate]);

  const designOptions = [
    { id: 'circular', name: 'Circular', icon: '○' },
    { id: 'rectangular', name: 'Rectangular', icon: '▭' },
    { id: 'oval', name: 'Oval', icon: '◯' },
    { id: 'diamond', name: 'Diamond', icon: '◇' },
    { id: 'hexagonal', name: 'Hexagonal', icon: '⬢' }
  ] as const;

  const handleStampDataChange = (field: keyof StampData, value: string | boolean) => {
    setStampData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStyleChange = (field: keyof StampStyle, value: any) => {
    setStampStyle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-3">
            <Stamp className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Digital Stamp Creator</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Pro</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 text-yellow-500 mr-2" />
              Live Preview
            </h2>
            <StampPreview stampData={stampData} stampStyle={stampStyle} />
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-0">
                {[
                  { id: 'content', name: 'Content', icon: Type },
                  { id: 'style', name: 'Style', icon: Palette },
                  { id: 'export', name: 'Export', icon: Download }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 text-sm font-medium border-b-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={stampData.companyName}
                      onChange={(e) => handleStampDataChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Details
                    </label>
                    <textarea
                      value={stampData.companyDetails}
                      onChange={(e) => handleStampDataChange('companyDetails', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter address, phone, email..."
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Date
                      </label>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="useCurrentDate"
                          checked={stampData.useCurrentDate}
                          onChange={(e) => handleStampDataChange('useCurrentDate', e.target.checked)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="useCurrentDate" className="text-sm text-gray-600">
                          Use current date
                        </label>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={stampData.date}
                      onChange={(e) => handleStampDataChange('date', e.target.value)}
                      disabled={stampData.useCurrentDate}
                      className={`w-full px-4 py-3 border border-gray-300 rounded-lg transition-all duration-200 ${
                        stampData.useCurrentDate 
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                          : 'focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      }`}
                      placeholder="Enter date"
                    />
                  </div>
                </div>
              )}

              {/* Style Tab */}
              {activeTab === 'style' && (
                <div className="space-y-6">
                  {/* Design Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Stamp Design
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {designOptions.map((design) => (
                        <button
                          key={design.id}
                          onClick={() => handleStyleChange('design', design.id)}
                          className={`p-4 border-2 rounded-lg text-center transition-all duration-200 ${
                            stampStyle.design === design.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="text-2xl mb-1">{design.icon}</div>
                          <div className="text-xs font-medium">{design.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <ColorPicker
                    borderColor={stampStyle.borderColor}
                    textColor={stampStyle.textColor}
                    onBorderColorChange={(color) => handleStyleChange('borderColor', color)}
                    onTextColorChange={(color) => handleStyleChange('textColor', color)}
                  />

                  <FontControls
                    fontSize={stampStyle.fontSize}
                    fontWeight={stampStyle.fontWeight}
                    onFontSizeChange={(size) => handleStyleChange('fontSize', size)}
                    onFontWeightChange={(weight) => handleStyleChange('fontWeight', weight)}
                  />
                </div>
              )}

              {/* Export Tab */}
              {activeTab === 'export' && (
                <ExportControls
                  stampData={stampData}
                  stampStyle={stampStyle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;