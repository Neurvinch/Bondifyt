import React from 'react'
import{ useAccount, useWalletClient} from "wagmi"
import{Contract, ethers } from 'ethers'
// add a  abi
const AcessConnection = () => {

    const {address, isConnected} = useAccount()
    const {data : walletClient,isError, isLoading} = useWalletClient();

     const interactingWithContract = async () =>{

        if( !isConnected) {
         alert(" Please connect your wallet")
         return;

        }

       const Contract = new ethers.Contract( )//address,abi,client); 
     }
     try {
        
        
     } catch (error) {
        
     }
  return (
    <div>AcessConnection</div>
  )
}

export default AcessConnection