import DexLinkGenerator from '../../components/DexLinkGenerator';

export default function SolanaPage() {
  return (
    <div className="min-h-screen bg-black p-8">
      <DexLinkGenerator
        title="Raydium Poink Generator"
        description="Generate a poink for Raydium on Solana. Enter the token mint address you want to swap to."
        baseUrl="https://raydium.io/swap"
        inputParam="inputMint"
        outputParam="outputMint"
        nativeToken="sol"
        isSymbolBased={false}
        isSolana={true}
      />
    </div>
  );
}