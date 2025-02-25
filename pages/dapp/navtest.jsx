import Head from 'next/head';

export default function TestDapp({ url }) {
  const handleScroll = (direction) => {
    const wrapper = document.getElementById('iframe-wrapper');
    if (wrapper) {
      const currentScroll = wrapper.scrollTop;
      const scrollAmount = direction === 'up' ? -200 : 200;
      wrapper.scrollTo({
        top: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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

      {/* Responsive scroll buttons */}
      <div className="fixed md:right-4 md:top-1/2 md:-translate-y-1/2 right-2 top-2 z-[9999] flex md:flex-col flex-row gap-2">
        {/* <button 
          onClick={() => handleScroll('up')}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 backdrop-blur-sm border border-white/10"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            className="md:w-4 md:h-4"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button> */}
        <button 
          onClick={() => handleScroll('down')}
          className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black/70 flex items-center justify-center hover:bg-black/90 backdrop-blur-sm border border-white/10"
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2.5" 
            className="md:w-4 md:h-4"
          >
            <path d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>

      <div 
        id="iframe-wrapper"
        className="w-full h-full overflow-auto"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <iframe 
          src={url} 
          allowFullScreen 
          allow="web3"
          className="w-full min-h-[150vh] border-0"
        />
      </div>

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
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ query }) {
  const url = query.url || 'https://app.naviprotocol.io/market';
  return {
    props: { url }
  };
}