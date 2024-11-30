import React, { useState, useEffect } from 'react';

function BrowseRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const updateRestaurants = () => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  };

  useEffect(() => {
    updateRestaurants();
    const intervalId = setInterval(() => {
      updateRestaurants();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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
