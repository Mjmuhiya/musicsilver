import React, { useState } from 'react';

const AddFavoriteAlbumForm = () => {
  const [albumTitle, setAlbumTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [releaseYear, setReleaseYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend API)
    console.log('Submit form:', { albumTitle, artistName, releaseYear });
  };

  return (
    <div>
      <h2>Add Favorite Album</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Album Title:
          <input
            type="text"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Artist Name:
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            required
          />
        </label>
        <label>
          Release Year:
          <input
            type="number"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Album</button>
      </form>
    </div>
  );
};

export default AddFavoriteAlbumForm;