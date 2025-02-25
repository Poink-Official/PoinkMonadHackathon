import { useState } from 'react';

export default function SwapLinkGenerator({ 
  chainId,
  nativeToken,
  title, 
  description 
}) {
  const [outputToken, setOutputToken] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    setIsGenerating(true);
    const timestamp = Date.now();
    
    // Native token address for ETH
    const nativeTokenAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    
    // Create the ParaSwap URL
    const dexUrl = `https://app.paraswap.xyz/#/swap/${nativeTokenAddress}-${outputToken}/1/SELL?version=6.2&network=base`;
    const displayUrl = `https://poinky.vercel.app/dapp/nav1?url=${dexUrl}&t=${timestamp}`;
    const actualUrl = `https://poinky.vercel.app/dapp/nav1?url=${encodeURIComponent(dexUrl)}&t=${timestamp}`;
    
    setTimeout(() => {
      setGeneratedLink({
        display: displayUrl,
        actual: actualUrl
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <p className="text-gray-400 mb-6">{description}</p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-400 mb-1">Input Token (Fixed)</p>
          <div className="text-white font-mono">
            {nativeToken}
          </div>
        </div>
        
        <div className="space-y-1">
          <label className="text-sm text-gray-400">Output Token Address</label>
          <input
            type="text"
            placeholder="Enter token address (e.g., 0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b)"
            value={outputToken}
            onChange={(e) => setOutputToken(e.target.value)}
            className="w-full p-4 bg-gray-800 rounded-lg text-white font-mono
                     border border-gray-700 focus:border-blue-500 focus:outline-none
                     transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the token contract address you want to swap to
          </p>
        </div>
        
        <button
          onClick={generateLink}
          disabled={isGenerating || !outputToken}
          className="w-full p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all
                   font-medium"
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Blink'
          )}
        </button>
        
        {generatedLink && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-400">Your Blink:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedLink.actual);
                  }}
                  className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 
                           rounded-md text-white transition-colors"
                >
                  Copy Link
                </button>
                <a 
                  href={generatedLink.actual}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 
                           rounded-md text-white transition-colors"
                >
                  Open Link
                </a>
              </div>
            </div>
            
            <div className="p-3 bg-gray-900 rounded-md">
              <code className="text-green-400 break-all text-sm">
                {generatedLink.display}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 