import './App.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

function App() {
  const {address, isConnected} = useAccount();

  return (
    <>
      <ConnectButton/>
    </>
  )
}

export default App
