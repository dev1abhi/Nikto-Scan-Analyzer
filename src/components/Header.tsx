import React from 'react';
import { Shield, AlertTriangle, Terminal } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-green-700 text-green-400 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Terminal size={32} className="text-green-500" />
            <div>
              <h1 className="text-2xl font-bold font-mono text-green-400">Nikto Scan Analyzer</h1>
              <p className="text-green-600 font-mono">Powered by Google Gemini AI</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2 bg-gray-800 px-3 py-1.5 rounded-full border border-green-900">
            <AlertTriangle size={16} className="text-yellow-500" />
            <span className="text-sm font-mono">AI-enhanced security analysis</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;