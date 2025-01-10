import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "@rainbow-me/rainbowkit/styles.css"
import { RainbowKitProvider} from "@rainbow-me/rainbowkit"
import {  WagmiProvider} from "wagmi"
import {getDefaultConfig} from '@rainbow-me/rainbowkit'
import { mainnet } from 'viem/chains';
import { http} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const ProjectId = "59b576c34d862c7fdf81c794d8d97580"
   

    const config = getDefaultConfig({
      appName: 'My RainbowKit App',
      
      projectId : '59b576c34d862c7fdf81c794d8d97580',
      chains : [mainnet],
      transports : {
        [mainnet.id] : http('https://eth-mainnet.g.alchemy.com/v2/nnffSo4AIuDE8YzCNfIDXPqk083tBO_8')
      }
    })

    const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client = {queryClient}> 

      <RainbowKitProvider chains = {[mainnet]}>
        <App />
        
        </RainbowKitProvider>
    </QueryClientProvider>
      
    </WagmiProvider>
  </StrictMode>,
)
