import React, { useState, useEffect, useRef } from 'react';

function RestaurantDashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const fileInputRefs = useRef([]);

  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants'));

    if (storedRestaurants && storedRestaurants.length > 0) {
      setRestaurants(storedRestaurants);
    } else {
      const initialRestaurants = [
        { name: 'Wild Flour', location: 'BGC, Taguig', capacity: 20, description: 'Modern Filipino dining.', image: '' },
        { name: 'Kenny Rogers', location: 'Makati, Metro Manila', capacity: 40, description: 'Famous for rotisserie chicken.', image: '' },
        { name: 'Kuya J', location: 'Quezon City, Metro Manila', capacity: 30, description: 'Serving Filipino comfort food.', image: '' },
        { name: 'Pizza Hut', location: 'Pasig, Metro Manila', capacity: 50, description: 'Global pizza chain.', image: '' },
      ];
      setRestaurants(initialRestaurants);
      localStorage.setItem('restaurants', JSON.stringify(initialRestaurants));
    }
  }, []);

  const handleChange = (index, field, value) => {
    if (field === 'capacity' && value < 0) {
      value = 0;
    }
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[index][field] = value;
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const handleImageChange = (index, e) => {
    const updatedRestaurants = [...restaurants];
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedRestaurants[index].image = reader.result;
        setRestaurants(updatedRestaurants);
        localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = (index) => {
    const updatedRestaurants = [...restaurants];
    updatedRestaurants[index].image = '';
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const handleFileButtonClick = (index) => {
    fileInputRefs.current[index].click();
  };

  const handleAddRestaurant = () => {
    const newRestaurant = {
      name: '',
      location: '',
      capacity: 0,
      description: '',
      image: '',
    };

    const updatedRestaurants = [...restaurants, newRestaurant];
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  const handleRemoveRestaurant = (index) => {
    const updatedRestaurants = restaurants.filter((_, i) => i !== index);
    setRestaurants(updatedRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
  };

  return (
    <div>
      <h1>Restaurant Dashboard</h1>
      <button onClick={handleAddRestaurant} style={{ marginBottom: '20px' }}>
        Add Restaurant
      </button>
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
              <td>
                <input
                  type="text"
                  value={restaurant.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={restaurant.location}
                  onChange={(e) => handleChange(index, 'location', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={restaurant.capacity}
                  onChange={(e) => handleChange(index, 'capacity', e.target.value)}
                />
              </td>
              <td>
                <textarea
                  value={restaurant.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                />
              </td>
              <td>
                {restaurant.image ? (
                  <img src={restaurant.image} alt={restaurant.name} style={{ width: '100px' }} />
                ) : (
                  <p>No Image</p>
                )}
              </td>
              <td>
                {!restaurant.image && (
                  <button onClick={() => handleFileButtonClick(index)} style={{ marginRight: '10px' }}>
                    Choose File
                  </button>
                )}
                {restaurant.image && (
                  <button onClick={() => handleImageRemove(index)} style={{ marginRight: '10px' }}>
                    Remove Image
                  </button>
                )}
                <input
                  type="file"
                  ref={(el) => (fileInputRefs.current[index] = el)}
                  onChange={(e) => handleImageChange(index, e)}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button onClick={() => handleRemoveRestaurant(index)} style={{ marginLeft: '10px' }}>
                  Remove Restaurant
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantDashboard;
