import React,{useState} from 'react'
import {useWalletClient} from 'wagmi'
import {ethers} from 'ethers'

const Minting = () => {
const { data : walletClient } = useWalletClient();
const [tokenId , setTokenID] = useState ("");
const [description , setDescription] = useState ("");
const[ duration , setDuration] = useState("");
const [rentalPrice , setRentalPrice] = useState("");
const [ message ,setMessage] = useState("");


const Contract = new ethers.Contract()

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
    <div>
      <h2>NFT Manager</h2>
      <div>
        <label>Token ID:</label>
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenID(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Duration (seconds):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <div>
        <label>Rental Price (ETH/second):</label>
        <input
          type="text"
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
        />
      </div>
      <button onClick={mintPost}>Mint NFT</button>
      <button onClick={rentalPost}>Rent NFT</button>
      <button onClick={getUsers}>Get Users</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Minting