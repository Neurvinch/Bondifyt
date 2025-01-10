import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';


const Home = () => {
    const navigate = useNavigate(); 
  return (

    <div className="menu-container">
    <div className="top-bar">
      <div className="logo">EON FORGE</div>
      <div className="menu-bar">
      <button
            className="menu-button"
            onClick={() => navigate('/')}  
          >
            Home
          </button>
          <button className="menu-button"  onClick={() => navigate('/home')}  >Marketplace</button>
          <button className="menu-button" onClick={() => navigate('/profile')}>Profile</button>
          <button className="menu-button" onClick={() => navigate('/Event')}>Meet the Team</button>
          <ConnectButton/>
      </div>
      </div>
      
    
    <div className="home-container">
      {/* Banner Section */}
      <div className="banner">
        <h1 className='hzero'>
          Collaborate <span>and</span> Connect with Visionaries.
        </h1>
        <button className="explore-btn">Explore</button>
      </div>

      {/* Trending Creators and Popular Chats */}
      <div className="trending-chats">
        <div className="section trending-creators">
          <h2 className='htwo'>Trending Creator</h2>
          <div className="creator-card">
            <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Aline Bazz" />
            <div className="info">
              <h3 className='hthree'>Aline Bazz</h3>
              <p>2M Followers</p>
            </div>
            <button className="follow-btn">+</button>
          </div>
          <div className="creator-card">
            <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Miquela" />
            <div className="info">
              <h3 className='hthree'>Miquela</h3>
              <p>1.8M Followers</p>
            </div>
            <button className="follow-btn">+</button>
          </div>
          <div className="creator-card">
            <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Masego" />
            <div className="info">
              <h3 className='hthree'>Masego</h3>
              <p>1.7M Followers</p>
            </div>
            <button className="follow-btn">+</button>
          </div>
        </div>

        <div className="section popular-chats">
          <h2 className='htwo'>Popular Chats</h2>
          <div className="chat-card">
            <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Aline Bazz" />
            <div className="info">
              <h3 className='hthree'>Aline Bazz</h3>
              <p>Live</p>
            </div>
            <button className="follow-btn">+</button>
          </div>
          <div className="chat-card">
            <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Miquela" />
            <div className="info">
              <h3 className='hthree'>Miquela</h3>
              <p>An hour ago</p>
            </div>
            <button className="follow-btn">+</button>
          </div>
          <div className="chat-card">
            <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Masego" />
            <div className="info">
              <h3 className='hthree'>Masego</h3>
              <p>Live</p>
            </div>
            <button className="follow-btn">+</button>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="trending-row">
  {Array.from({ length: 9 }).map((_, index) => (
    <div className="trending-card" key={index}>
      <img src="https://i.imgur.com/Yab42NY.jpeg" alt="Trending" />
      <div className="info">
        <h3 className='hthree'>Masego</h3>
        <p>1.7M Followers</p>
        <p>Live</p>
        <button className="vote-btn">Vote</button>
      </div>
      <div className="upcoming">
        <p>VOTE FOR UPCOMING</p>
        <div className="upcoming-row">
          <div className="upcoming-option">
            <button className="upcoming-btn">ANIME MANGA</button>
          </div>
          <div className="upcoming-option">
            <button className="upcoming-btn">FISHZ FISHA</button>
          </div>
          <div className="upcoming-option">
            <button className="upcoming-btn">MONA</button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
    
  );
};

export default Home;