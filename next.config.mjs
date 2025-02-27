/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Original chain routes
        {
          source: '/:chain(monad|ethereum|solana)',
          destination: '/[chain]',
        },
        // ETHGlobal chain routes
        {
          source: '/ethglobal/:chain(arbitrum|base|flow)',
          destination: '/ethglobal',
        },
        // Handle params for both
        {
          source: '/:chain(monad|ethereum|solana)/:params*',
          destination: '/[chain]',
        },
        {
          source: '/ethglobal/:chain(arbitrum|base|flow)/:params*',
          destination: '/ethglobal',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; frame-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: http:;"
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          }
        ]
      }
    ];
  }
};

export default nextConfig;