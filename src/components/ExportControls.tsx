import React, { useRef } from 'react';
import { Download, FileText, Image, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { StampData, StampStyle } from '../App';
import StampPreview from './StampPreview';

interface ExportControlsProps {
  stampData: StampData;
  stampStyle: StampStyle;
}

const ExportControls: React.FC<ExportControlsProps> = ({ stampData, stampStyle }) => {
  const stampRef = useRef<HTMLDivElement>(null);

  const exportAsImage = async (format: 'png' | 'jpg' = 'png') => {
    if (!stampRef.current) return;

    try {
      const canvas = await html2canvas(stampRef.current, {
        backgroundColor: 'transparent',
        scale: 3, // Higher resolution
        useCORS: true,
      });

      const link = document.createElement('a');
      link.download = `stamp-${stampData.companyName.replace(/\s+/g, '-').toLowerCase()}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
      alert('Error exporting image. Please try again.');
    }
  };

  const exportAsPDF = async () => {
    if (!stampRef.current) return;

    try {
      const canvas = await html2canvas(stampRef.current, {
        backgroundColor: 'transparent',
        scale: 3,
        useCORS: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 50; // 50mm width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add stamp to PDF (positioned in top right)
      pdf.addImage(imgData, 'PNG', 150, 20, imgWidth, imgHeight);

      // Add sample document content
      pdf.setFontSize(16);
      pdf.text('OFFICIAL DOCUMENT', 20, 30);
      
      pdf.setFontSize(12);
      pdf.text('This is a sample document demonstrating', 20, 50);
      pdf.text('how your digital stamp appears on PDF documents.', 20, 60);
      
      pdf.text('Document content would go here...', 20, 80);
      pdf.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 20, 95);
      pdf.text('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 20, 105);

      pdf.save(`stamped-document-${stampData.companyName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error exporting PDF. Please try again.');
    }
  };

  const printStamp = () => {
    if (!stampRef.current) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const stampHtml = stampRef.current.outerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Stamp - ${stampData.companyName}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              font-family: system-ui, -apple-system, sans-serif;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${stampHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Download className="w-5 h-5 text-gray-700" />
        <h3 className="text-lg font-semibold text-gray-700">Export Options</h3>
      </div>

      {/* Hidden stamp for export */}
      <div className="hidden">
        <StampPreview ref={stampRef} stampData={stampData} stampStyle={stampStyle} />
      </div>

      {/* Export Buttons */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <button
            onClick={() => exportAsImage('png')}
            className="flex items-center justify-center space-x-3 w-full p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-blue-700 font-medium"
          >
            <Image className="w-5 h-5" />
            <span>Export as PNG Image</span>
          </button>

          <button
            onClick={() => exportAsImage('jpg')}
            className="flex items-center justify-center space-x-3 w-full p-4 border-2 border-green-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-green-700 font-medium"
          >
            <Image className="w-5 h-5" />
            <span>Export as JPG Image</span>
          </button>

          <button
            onClick={exportAsPDF}
            className="flex items-center justify-center space-x-3 w-full p-4 border-2 border-purple-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-purple-700 font-medium"
          >
            <FileText className="w-5 h-5" />
            <span>Export as PDF Document</span>
          </button>

          <button
            onClick={printStamp}
            className="flex items-center justify-center space-x-3 w-full p-4 border-2 border-orange-200 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 text-orange-700 font-medium"
          >
            <Printer className="w-5 h-5" />
            <span>Print Stamp</span>
          </button>
        </div>
      </div>

      {/* Export Tips */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h4 className="font-semibold text-gray-700 mb-2">Export Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• PNG format preserves transparency for overlaying</li>
          <li>• JPG format creates smaller file sizes</li>
          <li>• PDF export creates a sample stamped document</li>
          <li>• Print option allows direct printing of the stamp</li>
          <li>• All exports are high-resolution (3x scale)</li>
        </ul>
      </div>

      {/* Usage Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">How to Use Your Stamp</h4>
        <div className="text-sm text-blue-700 space-y-2">
          <p><strong>For Word Documents:</strong></p>
          <p>1. Export as PNG image</p>
          <p>2. Insert → Pictures in Word</p>
          <p>3. Position and resize as needed</p>
          
          <p className="mt-3"><strong>For PDF Documents:</strong></p>
          <p>1. Use PDF editor (Adobe Acrobat, etc.)</p>
          <p>2. Add image/stamp feature</p>
          <p>3. Upload your exported PNG</p>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;