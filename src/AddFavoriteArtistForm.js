import React, { useState } from 'react';

const AddFavoriteArtistForm = () => {
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend API)
    console.log('Submit form:', { artistName, genre });
  };

  return (
    <div>
      <h2>Add Favorite Artist</h2>
      <form onSubmit={handleSubmit}>
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
          Genre:
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </label>
        <button type="submit">Add Artist</button>
      </form>
    </div>
  );
};

export default AddFavoriteArtistForm;