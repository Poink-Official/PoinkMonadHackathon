export async function fetchTokenMetadata(chainId, tokenAddress) {
  try {
    const response = await fetch(`https://api.1inch.io/v5.0/${chainId}/tokens`);
    const data = await response.json();
    
    // Handle native token cases
    if (tokenAddress.toLowerCase() === 'eth' || tokenAddress.toLowerCase() === 'avax') {
      return {
        symbol: tokenAddress.toUpperCase(),
        name: tokenAddress === 'eth' ? 'Ethereum' : 'Avalanche',
        decimals: 18
      };
    }

    const token = data.tokens[tokenAddress];
    return token || null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
} 