import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function JupiterPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Jupiter Swap poink Generator"
        description="Generate a swap link for Jupiter on Solana. Enter the token mint address you want to swap to."
        baseUrl="https://jup.ag/swap"
        inputParam="SOL"
        outputParam=""
        nativeToken="sol"
        isSymbolBased={false}
        isSolana={true}
        separator="-"
      />
    </div>
  );
} 