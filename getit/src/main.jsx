import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";


import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {  sepolia } from "viem/chains";
import { http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ProjectId = "59b576c34d862c7fdf81c794d8d97580";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: ProjectId,
  chains:  [ sepolia],
  transports: {
    
    [sepolia.id] : http("https://eth-sepolia.g.alchemy.com/v2/nnffSo4AIuDE8YzCNfIDXPqk083tBO_8")
  },
});

const queryClient = new QueryClient();

const theme = darkTheme({
  accentColor: "#ff4500", // Primary color for the button
  accentColorForeground: "white", // Text color on the button
  
  fontStack: "system", // Font style: system, rounded, or mono
  overlayBlur: "small", // Blur effect for modals
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={ [sepolia]}  theme={theme}>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);