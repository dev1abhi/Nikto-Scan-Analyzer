import React from 'react';
import { AlertTriangle, CheckCircle, Copy, Download, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultProps {
  result: string;
  error: string | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, error }) => {
  if (!result && !error) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const downloadResult = () => {
    const element = document.createElement('a');
    const file = new Blob([result], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `vulnerability-analysis-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (error) {
    return (
      <div className="mt-8 p-4 bg-gray-800 border border-red-900 rounded-lg">
        <div className="flex items-center gap-2 text-red-500 mb-2">
          <AlertTriangle size={20} />
          <h3 className="font-semibold font-mono">Error</h3>
        </div>
        <p className="text-red-400 font-mono">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-green-500">
          <Terminal size={20} />
          <h3 className="font-semibold font-mono">Analysis Complete</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg text-green-400 hover:bg-gray-800 transition-colors border border-green-900"
            title="Copy to clipboard"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={downloadResult}
            className="p-2 rounded-lg text-green-400 hover:bg-gray-800 transition-colors border border-green-900"
            title="Download analysis"
          >
            <Download size={18} />
          </button>
        </div>
      </div>
      <div className="p-6 bg-gray-800 border border-green-900 rounded-lg shadow-lg">
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-green-500 mt-6 mb-4 font-mono" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-xl font-bold text-green-400 mt-5 mb-3 font-mono" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-green-300 mt-4 mb-2 font-mono" {...props} />,
              h4: ({ node, ...props }) => <h4 className="text-base font-bold text-green-200 mt-3 mb-2 font-mono" {...props} />,
              p: ({ node, ...props }) => <p className="my-2 text-green-300 font-mono" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 my-3 text-green-300 font-mono" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 my-3 text-green-300 font-mono" {...props} />,
              li: ({ node, ...props }) => <li className="my-1 font-mono" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-bold text-green-400 font-mono" {...props} />,
              em: ({ node, ...props }) => <em className="italic text-green-200 font-mono" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-green-700 pl-4 py-1 my-3 text-green-400 bg-gray-900 font-mono" {...props} />
              ),
              code: ({ node, inline, ...props }) => 
                inline ? (
                  <code className="bg-gray-900 px-1 py-0.5 rounded text-green-400 font-mono" {...props} />
                ) : (
                  <code className="block bg-gray-900 p-3 rounded my-3 overflow-x-auto border border-green-900 font-mono" {...props} />
                ),
              a: ({ node, ...props }) => (
                <a className="text-green-400 hover:text-green-300 underline font-mono" target="_blank" rel="noopener noreferrer" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-4">
                  <table className="min-w-full border border-green-900 font-mono" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => <thead className="bg-gray-900 font-mono" {...props} />,
              tbody: ({ node, ...props }) => <tbody className="divide-y divide-green-900 font-mono" {...props} />,
              tr: ({ node, ...props }) => <tr className="hover:bg-gray-900 font-mono" {...props} />,
              th: ({ node, ...props }) => (
                <th className="px-4 py-2 border-b border-green-900 text-left font-semibold text-green-400 font-mono" {...props} />
              ),
              td: ({ node, ...props }) => <td className="px-4 py-2 border-b border-green-900 text-green-300 font-mono" {...props} />,
            }}
          >
            {result}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;