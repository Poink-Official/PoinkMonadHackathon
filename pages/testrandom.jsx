export default function TestScroll() {
    return (
      <>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <title>Scroll Test Page</title>

          {/* Twitter Card Metadata */}
          <meta name="twitter:card" content="player" />
          <meta name="twitter:site" content="https://x.com/ethereum" />
          <meta name="twitter:title" content="Scroll Test" />
          <meta name="twitter:description" content="Testing iframe scroll behavior" />
          <meta name="twitter:player" content="https://poinky.vercel.app/" />
          <meta name="twitter:player:width" content="360" />
          <meta name="twitter:player:height" content="560" />
          <meta name="twitter:image" content="/logodark.png" />

          <script src="https://cdn.tailwindcss.com" />
        </head>

        <div className="min-h-screen w-full p-2 sm:p-4">
          <div className="w-full h-[calc(100vh-16px)] sm:h-screen rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://carrot-fi.xyz"
              className="w-full h-full"
              title="Test Scroll"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              loading="lazy"
            />
          </div>
        </div>

        <style jsx global>{`
          @tailwind base;
          @tailwind components;
          @tailwind utilities;

          @layer base {
            :root {
              --background: 0 0% 100%;
              --foreground: 222.2 84% 4.9%;
            }
            .dark {
              --background: 222.2 84% 4.9%;
              --foreground: 210 40% 98%;
            }
          }

          @layer base {
            * {
              @apply border-border;
            }
            body {
              @apply bg-background text-foreground;
              margin: 0;
              padding: 0;
            }
          }
        `}</style>
      </>
    );
  } 