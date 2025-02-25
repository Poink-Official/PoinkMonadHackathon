import { useState, useEffect } from 'react';

export default function RouteGenerator() {
  const [timestamp, setTimestamp] = useState(null);
  const [apps] = useState([
    {
      name: 'Navi Protocol',
      url: 'https://app.naviprotocol.io/market'
    },
    {
      name: 'Uniswap',
      url: 'https://app.uniswap.org/'
    },
    {
      name: 'Cellana Finance',
      url: 'https://app.cellana.finance/swap?inputCurrency=0x1::aptos_coin::AptosCoin&outputCurrency=0x2ebb2ccac5e027a87fa0e2e5f656a3a4238d6a48d93ec9b610d570fc0aa0df12'
    }
  ]);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const generateRoute = (url) => {
    if (!timestamp) return '';
    return `https://poinky.vercel.app/dapp/nav1?url=${url}&t=${timestamp}`;
  };

  if (!timestamp) return null;

  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', minHeight: '100vh' }}>
      <h1>Generated Routes</h1>
      {apps.map((app, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #333', borderRadius: '8px' }}>
          <h3>{app.name}</h3>
          <code style={{ 
            display: 'block', 
            padding: '10px', 
            background: '#111', 
            borderRadius: '4px',
            wordBreak: 'break-all' 
          }}>
            {generateRoute(app.url)}
          </code>
        </div>
      ))}
    </div>
  );
}