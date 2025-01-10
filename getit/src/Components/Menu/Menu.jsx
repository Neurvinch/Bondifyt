import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SplitType from "split-type";
import gsap from "gsap";
import "./Menu.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Menu = () => {
 
  useEffect(() => {
    
    new SplitType(".my-text");

    // GSAP animation for the text
    gsap.to(".char", {
      y: 0,
      stagger: 0.02,
      delay: 0.1,
      duration: 0.1,
    });
  }, []);

  return (
    <div className="menu-container">
    <div className="top-bar">
      <div className="logo">EON FORGE</div>
      <div className="menu-bar">
      <Link to="/" className="menu-button">Home</Link>
       <Link to="/profile" className="menu-button" >Profile</Link>
       <Link to="/home" className="menu-button">Marketplace</Link>
        <button className="menu-button">Meet the Team</button>
         <ConnectButton/>
        </div>
      </div>

      {/* Main content */}
      <div className="my-text content">
        <div className="header">
          <span className="emoji">☺</span>
          <span className="title">EXPLORE THE </span>
          <span className="highlight">FUTURE</span>
        </div>

        <div className="subheader">
          <span className="outlined">DIGITAL MEDIA</span>
          <span>WITH</span>
          <span className="icon">&#10046;</span>
          <span className="underline">NFT VIDEO</span>
        </div>

        <div className="description">
          <span>
            COMBINING{" "}
            <span className="sparkles">BUY, SELL &#9729; AND COLLECT EXCLUSIVE</span>{" "}
            WITH
          </span>
          <span className="highlight">BLOCKCHAIN-SECURED CONTENT.</span>
          <span>TO HELP</span>
          <span className="outlined">CREATORS</span>
        </div>

        <div className="footer">
          <span>JOIN THE NFT REVOLUTION TODAY!</span>
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee">
        <div className="my-text marquee__group">
          <span>
            TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
          </span>
          <span>
            TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
          </span>
          <span>
            TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
          </span>
        </div>
        <div className="my-text marquee__group" aria-hidden="true">
          <span>
            TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
          </span>
          <span>
            TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
          </span>
          <span>
            TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menu;