import './App.css'
import { useAccount } from 'wagmi';
import PageNotFound from './Components/PageNotFound';
import Menu from "../src/Components/Menu/Menu"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from "../src/Components/Profile/Profile"
import Home from './Components/Home/Home';
import Event from "../src/Components/EventPage/EventPage"

function App() {
  const {address, isConnected} = useAccount();

  return (
    <>
    <Router>
      <Routes>
          <Route path = '/' element = {<Menu/>}/>

          <Route path ='/profile' element= {<Profile/>} />
          <Route path = " /home" element = {<Home/>} />
          < Route path = "/Event" element = { <Event/>}
/>          

      </Routes>
    </Router>
      
      
    </>
  )
}

export default App
