import React, { useState, useEffect } from 'react';
import { Upload, X, Terminal } from 'lucide-react';

interface ScanInputProps {
  onScanSubmit: (scanText: string) => void;
  isLoading: boolean;
}

const ScanInput: React.FC<ScanInputProps> = ({ onScanSubmit, isLoading }) => {
  const [scanText, setScanText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scanText.trim()) {
      onScanSubmit(scanText);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setScanText(content);
    };
    reader.readAsText(file);
  };

  const clearText = () => {
    setScanText('');
  };

  // Simulate typing effect for placeholder
  useEffect(() => {
    if (isLoading || scanText) return;
    
    const placeholderText = "# Scanning target system...\n> Identifying vulnerabilities...\n> Analyzing attack vectors...\n";
    let currentPos = 0;
    
    const interval = setInterval(() => {
      if (currentPos < placeholderText.length) {
        setCursorPosition(currentPos);
        currentPos++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [isLoading, scanText]);

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            className="w-full h-64 p-4 bg-gray-900 text-green-400 border border-green-800 rounded-lg focus:ring-2 focus:ring-green-700 focus:border-transparent resize-none font-mono"
            placeholder=""
            value={scanText}
            onChange={(e) => setScanText(e.target.value)}
            disabled={isLoading}
          />
          {!scanText && !isLoading && (
            <div className="absolute top-4 left-4 text-green-600 font-mono pointer-events-none">
              {`# Get the Nikto output...\n> Identify key vulnerabilities...\n> Analyse and produce results...`.substring(0, cursorPosition)}
              <span className="cursor-blink"></span>
            </div>
          )}
          {scanText && (
            <button
              type="button"
              onClick={clearText}
              className="absolute top-2 right-2 p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors text-green-400"
              title="Clear text"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-green-900 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors text-green-400">
            <Upload size={18} />
            <span className="font-mono">Upload Scan File</span>
            <input
              type="file"
              accept=".txt,.log,.xml,.json,.csv"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isLoading}
            />
          </label>

          <button
            type="submit"
            className={`px-6 py-2 rounded-lg text-black font-medium transition-colors font-mono flex items-center gap-2 ${
              isLoading
                ? 'bg-green-700 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-400'
            }`}
            disabled={isLoading || !scanText.trim()}
          >
            <Terminal size={18} />
            {isLoading ? 'Analyzing...' : 'Analyze Scan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScanInput;