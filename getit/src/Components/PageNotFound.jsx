import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../index.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

gsap.registerPlugin(ScrollTrigger);

const PageNotFound = () => {
  useEffect(() => {
    const cards = [
      { id: "#card-1", endTranslateX: -2000, rotate: 45 },
      { id: "#card-3", endTranslateX: -2000, rotate: 45 },
      { id: "#card-4", endTranslateX: -1500, rotate: -30 },
    ];

    ScrollTrigger.create({
      trigger: ".wrapper-404",
      start: "top top",
      end: "+=900vh",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        gsap.to(".wrapper-404", {
          x: `-${350 * self.progress}vw`,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });

    cards.forEach((card) => {
      ScrollTrigger.create({
        trigger: card.id,
        start: "top top",
        end: "+=1200vh",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(card.id, {
            x: `${card.endTranslateX * self.progress}px`,
            rotate: `${card.rotate * self.progress * 2}`,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    });

    ScrollTrigger.create({
      trigger: ".gallery-container",
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
      onEnter: () => {
        gsap.to(".gallery-container", { opacity: 1, duration: 0 });
      },
      onLeave: () => {
        gsap.to(".gallery-container", { opacity: 1, duration: 0 });
      },
    });
  }, []);

  return (
    <div className="container">
      <section className="wrapper-404">
        <h1>Page Not Found</h1>

        <div className="card" id="card-1">
          <img src="/img-1.jpg" alt="img-1" />
        </div>
        <div className="card" id="card-3">
          <img src="/img-3.jpg" alt="img-3" />
        </div>
        <div className="card" id="card-4">
          <img src="/img-4.jpg" alt="img-4" />
        </div>
      </section>

      <section className="outro">
        <h1>
          This page doesn't exist anymore... but that's okay!<br />
          We'll get you back on track!
        </h1>
      </section>

      <section className="gallery-container">
        <div className="gallery">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className={`gallery-image gallery-image${index + 1}`}
            ></div>
          ))}
        </div>
      </section>

      <section className="home-page"></section>
      
      <nav>
        <a href="/">hhhh</a>
        <ConnectButton/>
      </nav>

      
    </div>
  );
};

export default PageNotFound;