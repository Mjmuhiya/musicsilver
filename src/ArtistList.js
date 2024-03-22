import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MusicPlayer from './MusicPlayer'; // Assuming MusicPlayer.js is in the src directory

const ArtistList = () => {
  // State hooks
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [error, setError] = useState(null);
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  // Fetch data from Last.fm API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
          params: {
            method: 'artist.search',
            artist: 'cher', // Example search query (replace with your desired artist)
            api_key: 'ea487397fac875e05faddd2cf94de268',
            format: 'json',
          },
        });
        const artistList = response.data.results.artistmatches.artist;
        // Sort the list alphabetically by artist name
        artistList.sort((a, b) => a.name.localeCompare(b.name));
        setArtists(artistList);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  // Event handlers
  const handleMouseOver = (artist) => {
    setSelectedArtist(artist);
  };

  const handleMouseOut = () => {
    setSelectedArtist(null);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleArtistClick = async (artist) => {
    try {
      // Example URL for fetching artist's music data (replace with your actual endpoint)
      const musicResponse = await axios.get(`http://example.com/music/${artist.name}`);
      const musicData = musicResponse.data;
      // Assuming the music data contains a URL to the music file
      setMusicUrl(musicData.musicUrl);
      clearError(); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching music data:', error);
      setError('Error fetching music data. Please try again later.');
    }
  };

  const handleFavoriteArtist = (artist) => {
    setFavoriteArtists((prevFavorites) =>
      prevFavorites.some((favArtist) => favArtist.name === artist.name)
        ? prevFavorites.filter((favArtist) => favArtist.name !== artist.name)
        : [...prevFavorites, artist]
    );
  };

  const handleDeleteFavorite = (artistName) => {
    setFavoriteArtists((prevFavorites) =>
      prevFavorites.filter((favArtist) => favArtist.name !== artistName)
    );
  };

  // Clear error message
  const clearError = () => {
    setError(null);
  };

  // Filter artists based on search input value
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div style={{ height: '700px', overflowY: 'auto', marginTop: '250px',marginLeft:'150px' }}>
      <h1>Artist List</h1>
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search artists..."
        value={searchInput}
        onChange={handleSearchInputChange}
      />
      {/* Error message */}
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      <ul>
        {filteredArtists.map((artist) => (
          <li key={artist.mbid} onMouseOver={() => handleMouseOver(artist)} onMouseOut={handleMouseOut} onClick={() => handleArtistClick(artist)}>
            {artist.name}
            {/* Add favorite and delete buttons */}
            <button onClick={() => handleFavoriteArtist(artist)}>Favorite</button>
            <button onClick={() => handleDeleteFavorite(artist.name)}>Delete</button>
          </li>
        ))}
      </ul>
      {selectedArtist && (
        <div className="popup" style={popupStyle}>
          <img src={selectedArtist.image[0]['#text']} alt={selectedArtist.name} />
          <p>Name: {selectedArtist.name}</p>
          <p>Listeners: {selectedArtist.listeners}</p>
          {/* Add more details as needed */}
        </div>
      )}
      {/* Render MusicPlayer component with musicUrl */}
      {musicUrl && <MusicPlayer src={musicUrl} />}
      {/* Display favorite artists */}
      <h2>Favorite Artists</h2>
      <ul>
        {favoriteArtists.map((favArtist) => (
          <li key={favArtist.name}>{favArtist.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Popup style object
const popupStyle = {
  position: 'fixed',
  top: '300px',
  left: '300px',
  width: '300px', // Set the width to 300px
  height: '300px', // Set the height to 300px
  border: '1px solid blue',
  borderRadius: '6px',
  padding: '10px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
};

export default ArtistList;