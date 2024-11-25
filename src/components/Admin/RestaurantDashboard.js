import React, { useState, useEffect } from 'react';

function RestaurantDashboard() {
  const [restaurants, setRestaurants] = useState([
    { name: 'Wild Flour', location: 'BGC, Taguig', capacity: 20, description: 'Modern Filipino dining.', image: '' },
    { name: 'Kenny Rogers', location: 'Makati, Metro Manila', capacity: 40, description: 'Famous for rotisserie chicken.', image: '' },
    { name: 'Kuya J', location: 'Quezon City, Metro Manila', capacity: 30, description: 'Serving Filipino comfort food.', image: '' },
    { name: 'Pizza Hut', location: 'Pasig, Metro Manila', capacity: 50, description: 'Global pizza chain.', image: '' },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantName, setRestaurantName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  // Save updated restaurant list to localStorage
  const saveToLocalStorage = (updatedRestaurants) => {
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  // Load restaurants from localStorage on initial load
  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    setRestaurants(storedRestaurants);
  }, []);

  const handleUpdateRestaurant = (updatedRestaurant) => {
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.name === updatedRestaurant.name ? updatedRestaurant : restaurant
    );
    setRestaurants(updatedRestaurants);
    saveToLocalStorage(updatedRestaurants); // Save updated data to localStorage
    setEditMode(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUpdatedImage(null); // Remove image by setting updatedImage to null
    if (selectedRestaurant) {
      // Directly remove the image from the restaurant data too
      const updatedRestaurant = {
        ...selectedRestaurant,
        image: '', // Remove the image from the selected restaurant
      };
      handleUpdateRestaurant(updatedRestaurant); // Apply changes immediately
    }
  };

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setRestaurantName(restaurant.name);
    setUpdatedDescription(restaurant.description);
    setUpdatedImage(restaurant.image);  // Set the current image for editing
    setEditMode(true);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    if (selectedRestaurant) {
      const updatedRestaurant = {
        ...selectedRestaurant,
        description: updatedDescription || selectedRestaurant.description,
        image: updatedImage !== null ? updatedImage : selectedRestaurant.image, // Use null to remove the image
      };

      handleUpdateRestaurant(updatedRestaurant);

      // Alert after saving the changes
      alert(`Changes to ${selectedRestaurant.name} have been saved.`);
    }
  };

  return (
    <div className="admin-container">
      <h1>Restaurant Admin</h1>

      {!editMode && (
        <>
          <h2>Available Restaurants</h2>
          {restaurants.length === 0 ? (
            <p>No restaurants available</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {restaurants.map((restaurant, index) => (
                  <tr key={index}>
                    <td>{restaurant.name}</td>
                    <td>{restaurant.location}</td>
                    <td>{restaurant.capacity}</td>
                    <td>{restaurant.description}</td>
                    <td>
                      {restaurant.image && <img src={restaurant.image} alt={`${restaurant.name} cover`} style={{ width: '100px' }} />}
                    </td>
                    <td>
                      <button onClick={() => handleEditClick(restaurant)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {editMode && selectedRestaurant && (
        <div>
          <h2>Edit Restaurant</h2>
          <form onSubmit={handleSubmitEdit}>
            <div className="form-group">
              <label>
                Select Restaurant:
                <select value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} disabled>
                  <option value="">{selectedRestaurant.name}</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Updated Description:
                <textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                ></textarea>
              </label>
            </div>

            <div className="form-group">
              <label>
                Updated Cover Image:
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>

            {updatedImage && (
              <div className="form-group">
                <button type="button" onClick={handleRemoveImage}>
                  Remove Image
                </button>
              </div>
            )}

            <button type="submit">Update Restaurant</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RestaurantDashboard;
