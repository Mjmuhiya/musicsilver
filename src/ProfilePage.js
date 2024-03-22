import React, { Profiler, useEffect, useState } from 'react';
import './App.css'; // Import your CSS file for styling
import ArtistList from './ArtistList';

const ProfilePage = ({ profile, logOut }) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false); // State to track search bar visibility
  const [showArtistList, setShowArtistList] = useState(false); // State to track artist list visibility

  const updateTime = () => {
    setCurrentTime(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000); // Update time every second
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const onRenderCallback = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log(`${id} - ${phase} phase:`);
    console.log(`Actual duration: ${actualDuration}`);
    console.log(`Base duration: ${baseDuration}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
    console.log(`Interactions:`, interactions);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Toggle artist list visibility
  const toggleArtistList = () => {
    setShowArtistList(!showArtistList);
  };

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <Profiler id="ProfilePage" onRender={onRenderCallback}>
        <div className={`search-bar ${showSearch ? 'show' : ''}`}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={toggleSearch}>Toggle Search</button>
        </div>
        <div className="user-info">
          <img src={profile.picture} alt="User" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <p>Current Time: {currentTime}</p>
          {/* Marquee with specified length */}
          <marquee behavior="scroll" direction="left" style={{ width: '350px', margin: '0 10px' }}>Explore the amazing features!</marquee>
          {/* Button to toggle ArtistList visibility */}
          <button style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={logOut}>Log out</button>
          {/* Button to toggle ArtistList visibility */}
          <button style={{ backgroundColor: 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={toggleArtistList}>Toggle Artist List</button>
          {/* Conditional rendering of ArtistList component */}
          <div className="artist-list-container" style={{ position: 'absolute', left: '450px', top: '110px' }}>
            {showArtistList && <ArtistList />}
          </div>

          {/* Image with CSS */}
          <div className="image-container" style={{ position: 'absolute', left: '1050px', top: '400px' }}>
            <img
              src="https://www.womenadvancenc.org/wp-content/uploads/2022/09/on-the-intersection-of-music-and-mental-health.png"
              alt="Sample"
              style={{ width: '600px', height: 'auto' }}
            />
          </div>
        </div>
      </Profiler>
    </div>
  );
};

export default ProfilePage;