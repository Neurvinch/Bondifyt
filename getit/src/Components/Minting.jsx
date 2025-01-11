import React,{useState} from 'react'
import {useWalletClient} from 'wagmi'
import {ethers} from 'ethers'
import contractABI from "../abi/MintingAbi.json"
import '../Minting.css'
import {useNavigate} from 'react-router-dom'
const Minting = () => {
const { data : walletClient } = useWalletClient();
const [tokenId , setTokenID] = useState ("");
const [description , setDescription] = useState ("");
const[ duration , setDuration] = useState("");
const [rentalPrice , setRentalPrice] = useState("");
const [ message ,setMessage] = useState("");
const navigate = useNavigate();


const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"


const Contract = new ethers.Contract( contractAddress , contractABI , walletClient);

const mintingPost = async () =>{
    try {
         

        const tx = await Contract.MintPost( await walletClient.getAddresses(),tokenId,description 

        )
        await tx.wait();
        setMessage("Post minted successfully");
    } catch (error) {
         console.log(error);
         setMessage("Error minting post");
    }
}

    const rentalPost = async() =>{

        try {
            const rentalFee = ethers.utils.parseEther(rentalPrice);

            const tx = await Contracts.rentPost( tokenId, duration,{
                value: rentalFee,
            });
            await tx.wait();
            setMessage("Post rented successfully");
        } catch (error) {
             console.log(error);
             setMessage("Error renting post");
        }
    }



const getUsers = async () =>{

    try {
        const users = await Contract.getUsers(tokenId);
        setMessage(` Users: ${users.join(",")}`);
    } catch (error) {
         console.log(error);
         setMessage("Error getting users");
    }
};

  return (
    <div >

<div className="profile-container">
      <div className="top-bar">
        <div className="logo">EON FORGE</div>
        <div className="menu-bar">
          {/* ✅ Updated Home Button to Navigate */}
          <button
            className="menu-button"
            onClick={() => navigate('/')}  
          >
            Home
          </button>
          <button className="menu-button"  onClick={() => navigate('/home')}  >Marketplace</button>
          <button className="menu-button" onClick={() => navigate('/profile')}>Profile</button>
          <button className="menu-button" onClick={() => navigate('/Event')}>Meet the Team</button>
          
        </div>
      </div>




      
      <h2>NFT Manager</h2>
      <div  >
        <label>Token ID:</label>
        <input
        className='app'
          type="text"
          value={tokenId}
          onChange={(e) => setTokenID(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
        className='app'
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (seconds):</label>
        <input
        className='app'
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div>
        <label>Rental Price (ETH/second):</label>
        <input
        className='app'
          type="text"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
        />
      </div>
      <button 
      className='app' onClick={mintingPost}>Mint NFT</button>
      <button   className='app' onClick={rentalPost}>Rent NFT</button>
      <button   className='app' onClick={getUsers}>Get Users</button>
      {message && <p>{message}</p>}
    </div>
    </div>
  )
}

export default Minting