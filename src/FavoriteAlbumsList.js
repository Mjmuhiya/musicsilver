import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FavoriteAlbumsList = () => {
  const [favoriteAlbums, setFavoriteAlbums] = useState([]);

  useEffect(() => {
    // Fetch user's favorite albums from the API
    const fetchFavoriteAlbums = async () => {
      try {
        // Make API call to fetch favorite albums (replace URL with actual endpoint)
        const response = await axios.get('API_ENDPOINT_HERE');
        // Update state with fetched data
        setFavoriteAlbums(response.data);
      } catch (error) {
        console.error('Error fetching favorite albums:', error);
      }
    };

    fetchFavoriteAlbums();
  }, []);

  const handleEditAlbum = (albumId) => {
    // Handle edit functionality for the selected album
    console.log('Edit album:', albumId);
  };

  const handleDeleteAlbum = (albumId) => {
    // Handle delete functionality for the selected album
    console.log('Delete album:', albumId);
  };

  return (
    <div>
      <h2>Favorite Albums</h2>
      <ul>
        {favoriteAlbums.map((album) => (
          <li key={album.id}>
            {album.title} by {album.artist}
            <button onClick={() => handleEditAlbum(album.id)}>Edit</button>
            <button onClick={() => handleDeleteAlbum(album.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteAlbumsList;