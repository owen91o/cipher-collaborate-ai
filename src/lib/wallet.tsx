import React from 'react';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import '@rainbow-me/rainbowkit/styles.css';

const config = getDefaultConfig({
  appName: 'Cipher Collaborate AI',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-wallet-connect-project-id',
  chains: [sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

const customTheme = darkTheme({
  accentColor: 'hsl(195 100% 50%)', // Cyan accent
  accentColorForeground: 'hsl(220 27% 4%)', // Dark background
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'small',
});

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};