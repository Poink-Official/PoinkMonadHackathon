import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

export default function NeoHome() {
  const router = useRouter();

  const features = [
    {
      id: 'carrot',
      name: 'Carrot Finance',
      description: 'Generate links for Carrot Finance swaps and bridges',
      gradient: 'from-orange-500 to-red-500',
      icon: '🥕'
    },
    {
      id: 'asteroneo',
      name: 'AsteroNeo',
      description: 'Create poinks for AsteroNeo swaps and bridges',
      gradient: 'from-purple-600 to-pink-600',
      icon: '🌠'
    },
    {
      id: 'neo',
      name: 'Neo Ecosystem',
      description: 'Your gateway to Neo DeFi',
      gradient: 'from-green-400 to-cyan-500',
      icon: '🟢'
    },
    {
      id: 'neox',
      name: 'NeoX Network',
      description: 'Experience the future of Neo',
      gradient: 'from-blue-500 to-indigo-600',
      icon: '⚡'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1115] bg-gradient-to-b from-[#0F1115] to-[#1A1B1F]">
      <Head>
        <title>Poinky | Your NeoX Poink Generator</title>
        <meta name="description" content="Your favorite Neo ecosystem link generator. Generate links for Carrot Finance, AsteroNeo, and more." />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="mb-8 flex justify-center">
            <div className="relative h-32 w-32">
              <Image
                src="/logodark.png"
                alt="Poinky Logo"
                layout="fill"
                objectFit="contain"
                className="animate-bounce"
              />
            </div>
          </div>
          
          <h1 className="text-7xl font-bold mb-6 animate-pulse">
            <span className="bg-gradient-to-r from-[#00E599] to-[#00AF92] bg-clip-text text-transparent">
              Neo Poinks
            </span>
          </h1>
          
          <p className="text-[#00E599] text-2xl font-bold mb-4">
           Your NeoX Poink Generator
          </p>
          
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            ready to explore the Neo ecosystem? generate your poinks here! 🟢
          </p>

          {/* CTA Button */}
          <button 
            onClick={() => window.open('https://x.com/poinky42', '_blank')}
            className="mt-8 px-8 py-4 bg-gradient-to-r from-[#00E599] to-[#00AF92] rounded-full text-white font-bold text-xl hover:opacity-90 transform hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Follow on Twitter 🐦
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`
                relative overflow-hidden rounded-2xl p-8
                transform transition-all duration-300 hover:scale-105
                bg-[#1E1F25] border border-[#2D2E36] hover:border-[#00E599]
              `}
            >
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.name}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
              
              {/* Glow Effect */}
              <div className={`absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-full blur-2xl`} />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 gap-8 text-center">
          <div className="bg-[#1E1F25] rounded-xl p-6 border border-[#2D2E36]">
            <div className="text-3xl font-bold text-[#00E599]">24/7</div>
            <div className="text-gray-400">Link Generation</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p>powered by Neo N3 🟢</p>
        </div>
      </div>
    </div>
  );
} 