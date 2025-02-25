import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function AsteroNeoPage() {
  return (
    <div className="min-h-screen bg-black p-8 space-y-8">
      <DexLinkGenerator
        title="AsteroNeo Swap Link Generator"
        description="Generate a link for AsteroNeo Swap."
        baseUrl="https://app.asteroneo.com"
        routePath="/#/swap"
        isStatic={true}
      />

      <DexLinkGenerator
        title="AsteroNeo Bridge Link Generator"
        description="Generate a link for AsteroNeo Bridge."
        baseUrl="https://app.asteroneo.com"
        routePath="/#/bridge"
        isStatic={true}
      />
    </div>
  );
} 