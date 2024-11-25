import React, { useState, useEffect } from 'react';

function BrowseRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  // Function to fetch restaurants from localStorage
  const updateRestaurants = () => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  };

  useEffect(() => {
    // Initial fetch of restaurants from localStorage
    updateRestaurants();

    // Setting up interval to periodically update restaurant data
    const intervalId = setInterval(() => {
      updateRestaurants();
    }, 1000); // Update every 1 second (can adjust as necessary)

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="regular-user-container">
      <h1>Restaurant Information</h1>
      {restaurants.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Capacity</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr key={index}>
                <td>
                  {restaurant.image ? (
                    <img
                      src={restaurant.image}
                      alt={`${restaurant.name} Cover`}
                      style={{ width: '100px' }}
                    />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{restaurant.name}</td>
                <td>{restaurant.location}</td>
                <td>{restaurant.description}</td>
                <td>{restaurant.capacity} guests</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No restaurants available at the moment. Please check back later.</p>
      )}
    </div>
  );
}

export default BrowseRestaurants;
