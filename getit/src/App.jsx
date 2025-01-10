import './App.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import PageNotFound from './Components/PageNotFound';
import Menu from "../src/Components/Menu/Menu"
function App() {
  const {address, isConnected} = useAccount();

  return (
    <>
       <Menu />
      
    </>
  )
}

export default App
