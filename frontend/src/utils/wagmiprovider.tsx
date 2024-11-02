// @ts-nocheck comment
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Chain } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const aiachain: Chain = {
  id: 1320,
  name: "AIA Testnet",
  network: "AIA Testnet",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "AIA",
    symbol: "AIA",
  },
  rpcUrls: {
    default: {
      http: ["https://aia-dataseed1-testnet.aiachain.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "AIA Chain Testnet",
      url: "https://testnet.aiascan.com",
    },
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [aiachain],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function WagmiConnect(props: any) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#1E88E5",
            borderRadius: "large",
            overlayBlur: "small",
          })}
          coolMode
        >
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default WagmiConnect;
