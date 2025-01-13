import { useState, useEffect } from "react"
import React from 'react'
import { useWeb3React } from "@web3-react/core";
import web3 from"web3";
import {create} from "ipfs-http-client";
const client = create({
    host:"ipfs.infura.io",
    host:5000,
    protocol:"https"
});

const Chat = ({contractAddress, contractABI}) => {
      
       const [message, setMessage]= useState([]);
       const [newMessages, setNewMessages] = useState("");
       const [nftId,setNftId] = usestate("");
       const[duration,setDuration] = useState("");
       const[rentalHistory, setrentalHistory] = usestate([]);
       
       const {account,library} =  useWeb3React();

       const Web3 =new web3(library.provider);
       const contract =new Web3.eth.Contract(contractABI,contractAddress);
       const handleSendMessage = async () => {
        if(!newMessages){
            alert(" Dude! Message cannot be blank or empty")
        } return;
    try{
        const result = await client.add(newMessages);
        const ipfsHash  = result.path;

        const tx = await Web3.eth.sendTransaction({
            from: account,
            to : contractAddress,
            data: web3.utils.toHex(ipfsHash),
        });
        setMessage([...message,{user:account,message:newMessages,txHash: tx.transactionHash}]);
        setNewMessages("")}
    
     catch(error) {
        console.error("error while sending message",error);
    }
};

        // if need to handle RentNft 
        const handleRentNft = async () => {
            if(!nftId || !duration){
                alert("Dude! NFT ID and Duration cannot be blank or empty")
                return;}

                try{
            const tx = await Web3.contracts.methods.rentPost(nftId, DurationsMayInSeconds).send({
                from: account,
                value : Web3.utils.toWei('0.1','ether')

            })
            
            setrentalHistory([{
nftId, duration,renter:account,txHash: tx.transactionHash
            }

            ]);
            console.log("NFT rented",tx);
            setNftId("")
            setDuration("");
        }
        catch(error){
            console.error("Error renting NFT:" ,error)
        }
    };
  return (

    <div>
<input

type="text"
value={newMessages}
onChange={(e)=>setNewMessages(e.target.value)}
placeholder="Try Wasd"
/>
        <button onClick={handleSendMessage}>Damn Send It!</button>

        <h3>Message History</h3>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.user}:</strong> {msg.message}{" "}
              <a
                href={`https://etherscan.io/tx/${msg.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Tx
              </a>
            </li>
          ))}
        </ul>
      

        <input
        type="number"
        placeholder="NFT ID"
        value={nftId}
        onChange={(e) => setNftId(e.target.value)}
        />
        <button onClick={handleRentNft}>Rent It!..</button>

        <h3>Rental History</h3>
        <ul>
          {rentalHistory.map((rental, index) => (
            <li key={index}>
              Rented NFT #{rental.nftId} for {rental.duration} seconds by{" "}
              {rental.renter}{" "}
              <a
                href={`https://etherscan.io/tx/${rental.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Tx
                </a>
            </li>
          ))}
        </ul>
     

      
    </div>
  )

}

export default Chat



// need to work on this dynamically more and more