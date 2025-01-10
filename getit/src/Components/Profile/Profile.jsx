import React from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
    <div className="top-bar">
        <div className="logo">EON FORGE</div>
        <div className="menu-bar">
          <button
           className="menu-button"
          >
            Home
          </button>
          <button className="menu-button">Marketplace</button>
          <button className="menu-button">Profile</button>
          <button className="menu-button">Meet the Team</button>
          
        </div>
      </div>
      <header className="header">
        <div className="user-info">
          <h1>Masego</h1>
          <p className='para'>1.7M Followers</p>
          <button className='menu-button'>Follow</button>
          <button className="menu-button secondary-button">+</button>
        </div>
      </header>

      <section className="project-section">
  <h2 className='htag'>My Project</h2>
  <div className="project-grid">
    {/* Box 1 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="src/video-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 2 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 3 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 4 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 5 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 6 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video6.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 7 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 8 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video8.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>ANIMATION MANGA</p>
      <button className='menu-button'>follow</button>
    </div>
  </div>
</section>
      <div className="marquee">
        <div className="marquee__group">
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
        <div className=" marquee__group" aria-hidden="true">
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
      <section className="project-section">
  <h2 className='htag' > COMMUNITY</h2>
  <div className="project-grid">
    {/* Box 1 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 2 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 3 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
    <button className='menu-button'>follow</button>
    </div>

    {/* Box 4 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video4.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 5 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video5.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 6 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video6.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
      <button className='menu-button'>follow</button>
    </div>

    {/* Box 7 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video7.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
    <button className='menu-button'>follow</button>
    </div>

    {/* Box 8 */}
    <div className="project-item">
      <video className="video-placeholder" controls>
        <source src="/path/to/video8.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <p>NTF COLLECTION</p>
    <button className='menu-button'>follow</button>
    </div>
  </div>
  </section>
    </div>
  );
};

export default Profile;