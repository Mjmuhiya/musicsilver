import React from 'react';

const RadioComponent = ({ data }) => {
    // Check if data is available
    if (!data) {
        return <p>No data available</p>;
    }

    // Extract keys and values from the data object
    const entries = Object.entries(data);

    return (
        <div>
            {/* Display radio data */}
            <h2>Radio Data</h2>
            <ul>
                {entries.map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}: </strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RadioComponent; // Export RadioComponent as default