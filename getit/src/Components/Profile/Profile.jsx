import React from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <header className="header">
        <div className="user-info">
          <h1>Masego</h1>
          <p>1.7M Followers</p>
          <button>Follow</button>
        </div>
      </header>

      <section className="project-section">
        <h2>My Project</h2>
        <div className="project-grid">
          {Array(8).fill(0).map((_, idx) => (
            <div className="project-item" key={idx}>
              <div className="image-placeholder"></div>
              <p>Masego</p>
              <button>Vote</button>
            </div>
          ))}
        </div>
      </section>

      <section className="activity-section">
        <h2>Activity & Sale</h2>
        <div className="activity-chart">
          <p>Weekly: $2,197</p>
          <p>Monthly: $8,903</p>
          <p>Yearly: $98,134</p>
          <div className="chart-placeholder"></div>
        </div>
      </section>

      <section className="community-section">
        <h2>Following Community</h2>
        <div className="community-grid">
          {Array(8).fill(0).map((_, idx) => (
            <div className="community-item" key={idx}>
              <div className="image-placeholder"></div>
              <p>Masego</p>
              <button>View</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;