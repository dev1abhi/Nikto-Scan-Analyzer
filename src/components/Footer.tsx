import React from 'react';
import { Github, Info, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-green-900 py-6 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-green-600 text-sm font-mono">
              © {new Date().getFullYear()} Vulnerability Scan Analyzer
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-green-500 hover:text-green-400 transition-colors flex items-center space-x-1"
            >
              <Info size={16} />
              <span className="text-sm font-mono">About</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition-colors flex items-center space-x-1"
            >
              <Github size={16} />
              <span className="text-sm font-mono">GitHub</span>
            </a>
          </div>
        </div>
        <div className="mt-4 text-xs text-green-700 text-center md:text-left font-mono">
          <p>
            This tool uses Google Gemini AI to analyze vulnerability scan results. The analysis is provided for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;