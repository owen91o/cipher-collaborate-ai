# Environment Variables Setup

This document explains how to set up the required environment variables for the Cipher Collaborate AI project.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Blockchain Configuration
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

# Wallet Connect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id

# Infura Configuration (Optional)
NEXT_PUBLIC_INFURA_API_KEY=your-infura-api-key
NEXT_PUBLIC_RPC_URL=https://1rpc.io/sepolia
```

## How to Get These Values

### 1. Infura Project ID
1. Go to [infura.io](https://infura.io)
2. Create an account or sign in
3. Create a new project
4. Select "Ethereum" as the network
5. Copy your Project ID from the project settings

### 2. WalletConnect Project ID
1. Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
2. Create an account or sign in
3. Create a new project
4. Copy your Project ID from the project settings

### 3. Chain ID
- **Sepolia Testnet**: `11155111`
- **Mainnet**: `1`
- **Polygon**: `137`

## Security Notes

- **Never commit** `.env.local` to version control
- All environment variables must start with `NEXT_PUBLIC_` for client-side access
- Keep your API keys secure and never share them publicly
- Use different keys for development and production environments

## Example Configuration

```env
# Example configuration (replace with your actual values)
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/abc123def456ghi789
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=xyz789uvw456rst123
NEXT_PUBLIC_INFURA_API_KEY=abc123def456ghi789
```

## Troubleshooting

### Common Issues

1. **Wallet not connecting**: Check if WalletConnect Project ID is correct
2. **RPC errors**: Verify Infura Project ID and API key
3. **Wrong network**: Ensure Chain ID matches your target network
4. **Build failures**: Make sure all required environment variables are set

### Testing Your Configuration

1. Start the development server: `npm run dev`
2. Open the application in your browser
3. Try connecting a wallet
4. Check the browser console for any errors
5. Verify network connection in your wallet

## Production Deployment

For production deployment on Vercel:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add each environment variable with your production values
4. Redeploy your application

Remember to use different API keys for production than development!
