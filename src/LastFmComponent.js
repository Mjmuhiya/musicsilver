import React from 'react';

const LastFmComponent = ({ username }) => {
    // Your LastFmComponent logic here
    return (
        <div>
            {/* Display Last.fm data */}
            <h2>Last.fm Component</h2>
            <p>Username: {username}</p>
        </div>
    );
};

export default LastFmComponent; // Export LastFmComponent as default