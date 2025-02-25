import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function CarrotPage() {
  return (
    <div className="min-h-screen bg-black p-8 space-y-8">
      <DexLinkGenerator
        title="Carrot Finance Swap Link Generator"
        description="Generate a link for Carrot Finance Swap."
        baseUrl="https://carrot-fi.xyz"
        routePath="/swap"
        isStatic={true}
      />

      <DexLinkGenerator
        title="Carrot Finance Bridge Link Generator"
        description="Generate a link for Carrot Finance Bridge."
        baseUrl="https://carrot-fi.xyz"
        routePath="/bridge"
        isStatic={true}
      />
    </div>
  );
} 