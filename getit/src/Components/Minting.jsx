import React, { useState } from 'react';
import { useWalletClient } from 'wagmi';
import { ethers } from 'ethers';
import contractABI from '../abi/MintingAbi.json';
import '../Minting.css';
import { useNavigate } from 'react-router-dom';

const Minting = () => {
  const { data: walletClient } = useWalletClient();
  const [tokenId, setTokenID] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138';

  const mintingPost = async () => {
    if (!walletClient || !tokenId || !description) {
      setMessage('Please provide valid Token ID and Description.');
      return;
    }
    setLoading(true);
    try {
      const signer = new ethers.Wallet(walletClient.privateKey, walletClient.provider);
      const Contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await Contract.MintPost(
        await signer.getAddress(),
        tokenId,
        description
      );
      await tx.wait();
      setMessage('Post minted successfully');
    } catch (error) {
      console.error(error);
      setMessage('Error minting post');
    } finally {
      setLoading(false);
    }
  };

  const rentalPost = async () => {
    if (!walletClient || !tokenId || !duration || !rentalPrice) {
      setMessage('Please provide valid Token ID, Duration, and Rental Price.');
      return;
    }
    setLoading(true);
    try {
      const signer = new ethers.Wallet(walletClient.privateKey, walletClient.provider);
      const Contract = new ethers.Contract(contractAddress, contractABI, signer);

      const rentalFee = ethers.utils.parseEther(rentalPrice);

      const tx = await Contract.rentPost(tokenId, duration, {
        value: rentalFee,
      });
      await tx.wait();
      setMessage('Post rented successfully');
    } catch (error) {
      console.error(error);
      setMessage('Error renting post');
    } finally {
      setLoading(false);
    }
  };

 /* const getUsers = async () => {
    if (!walletClient || !tokenId) {
      setMessage('Please provide a valid Token ID.');
      return;
    }
    setLoading(true);
    try {
      const signer = new ethers.Wallet(walletClient.privateKey, walletClient.provider);
      const Contract = new ethers.Contract(contractAddress, contractABI, signer);

      const users = await Contract.getUsers(tokenId);
      setMessage(`Users: ${users.join(', ')}`);
    } catch (error) {
      console.error(error);
      setMessage('Error getting users');
    } finally {
      setLoading(false);
    }
  }; */

  return (
    <div>
      <div className="profile-container">
        <div className="top-bar">
          <div className="logo">EON FORGE</div>
          <div className="menu-bar">
            <button className="menu-button" onClick={() => navigate('/')}>
              Home
            </button>
            <button className="menu-button" onClick={() => navigate('/home')}>
              Marketplace
            </button>
            <button className="menu-button" onClick={() => navigate('/profile')}>
              Profile
            </button>
            <button className="menu-button" onClick={() => navigate('/Event')}>
              Meet the Team
            </button>
          </div>
        </div>
        <h2>NFT Manager</h2>
        <div>
          <label>Token ID:</label>
          <input
            className="app"
            type="text"
            placeholder="Enter Token ID"
            value={tokenId}
            onChange={(e) => setTokenID(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            className="app"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Duration (seconds):</label>
          <input
            className="app"
            type="number"
            placeholder="Enter Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div>
          <label>Rental Price (ETH/second):</label>
          <input
            className="app"
            type="text"
            placeholder="Enter Rental Price"
            value={rentalPrice}
            onChange={(e) => setRentalPrice(e.target.value)}
          />
        </div>
        <button className="app" onClick={mintingPost} disabled={loading}>
          {loading ? 'Minting...' : 'Mint NFT'}
        </button>
        <button className="app" onClick={rentalPost} disabled={loading}>
          {loading ? 'Processing...' : 'Rent NFT'}
        </button>
        
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Minting;
