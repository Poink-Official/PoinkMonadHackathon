import Head from 'next/head';

export default function TestDapp({ url }) {
  return (
    <div className="player-container">
      <Head>
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="https://x.com/ethereum" />
        <meta name="twitter:title" content="Memelinks Registry" />
        <meta name="twitter:description" content="MemeLinks - twitter Meme Links" />
        <meta name="twitter:player" content={url} />
        <meta name="twitter:player:width" content="360" />
        <meta name="twitter:player:height" content="560" />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/1846897640677822470/8g6-quYE_400x400.jpg" />
        
        <title>DApp Viewer</title>
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
        src={url} 
        allowFullScreen 
        allow="web3"
      />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const url = query.url || 'https://app.naviprotocol.io/market';
  
  return {
    props: {
      url,
    }
  };
}