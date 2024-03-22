import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteArtistsList = () => {
  const [favoriteArtists, setFavoriteArtists] = useState([]);

  useEffect(() => {
    const fetchFavoriteArtists = async () => {
      try {
        const response = await axios.get('API_ENDPOINT_HERE'); // Replace API endpoint
        setFavoriteArtists(response.data);
      } catch (error) {
        console.error('Error fetching favorite artists:', error);
      }
    };

    fetchFavoriteArtists();
  }, []);

  const handleEditArtist = (artistId) => {
    console.log('Edit artist:', artistId);
    // Add edit functionality here
  };

  const handleDeleteArtist = (artistId) => {
    console.log('Delete artist:', artistId);
    // Add delete functionality here
  };

  return (
    <div>
      <h2>Favorite Artists</h2>
      <ul>
        {favoriteArtists.map((artist) => (
          <li key={artist.id}>
            {artist.name}
            <button onClick={() => handleEditArtist(artist.id)}>Edit</button>
            <button onClick={() => handleDeleteArtist(artist.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteArtistsList;