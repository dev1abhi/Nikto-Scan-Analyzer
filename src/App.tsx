import React, { useState } from 'react';
import Header from './components/Header';
import ScanInput from './components/ScanInput';
import AnalysisResult from './components/AnalysisResult';
import Footer from './components/Footer';
import { analyzeVulnerabilityScan } from './services/gemini';
import { AlertOctagon } from 'lucide-react';

function App() {
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiKeyMissing, setApiKeyMissing] = useState<boolean>(
    !import.meta.env.VITE_GEMINI_API_KEY || 
    import.meta.env.VITE_GEMINI_API_KEY === 'your_gemini_api_key_here'
  );

  const handleScanSubmit = async (scanText: string) => {
    if (apiKeyMissing) {
      setError("Please add your Gemini API key to the .env file");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await analyzeVulnerabilityScan(scanText);
      setAnalysisResult(result);
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
      setAnalysisResult('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-gray-800 rounded-xl shadow-lg border border-green-900 p-6 mb-8">
          <h2 className="text-xl font-mono font-semibold mb-4 text-green-400">Upload Vulnerability Scan</h2>
          <p className="text-green-300 mb-6 font-mono">
            Paste your vulnerability scan results or upload a scan file to get an AI-powered analysis and remediation recommendations.
          </p>
          
          {apiKeyMissing && (
            <div className="mb-6 p-4 bg-gray-900 border border-yellow-700 rounded-lg flex items-start gap-3">
              <AlertOctagon size={20} className="text-yellow-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-500 font-mono">API Key Required</h3>
                <p className="text-yellow-400 text-sm mt-1 font-mono">
                  Please add your Google Gemini API key to the .env file to use this application.
                  You can get an API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline text-green-400 hover:text-green-300">Google AI Studio</a>.
                </p>
              </div>
            </div>
          )}
          
          <ScanInput onScanSubmit={handleScanSubmit} isLoading={isLoading} />
        </div>
        
        <AnalysisResult result={analysisResult} error={error} />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;