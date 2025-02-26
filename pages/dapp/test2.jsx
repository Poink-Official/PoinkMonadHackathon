import Head from 'next/head';

export default function TestDapp() {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content="https://www.starknet-monitor.com/" />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="/logodark.png" />
        
        <title>Starknet Monitor</title>
      </Head>
      
      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .player-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>

      <iframe 
        src="https://www.starknet-monitor.com/" 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
} 