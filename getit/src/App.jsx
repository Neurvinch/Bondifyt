import './App.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import PageNotFound from './Components/PageNotFound';

function App() {
  const {address, isConnected} = useAccount();

  return (
    <>
    <PageNotFound/>
      <ConnectButton/>
    </>
  )
}

export default App
