import './App.css'
import { useAccount } from 'wagmi';
import PageNotFound from './Components/PageNotFound';
import Menu from "../src/Components/Menu/Menu"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "../src/Components/Profile/Profile"


function App() {
  const {address, isConnected} = useAccount();

  return (
    <>
    <Router>
      <Routes>
          <Route path = '/' element = {<Menu/>}/>

          <Route path ='/profile' element= {<Profile/>}  />

      </Routes>
    </Router>
      
      
    </>
  )
}

export default App
