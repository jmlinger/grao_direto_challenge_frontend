import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { apiGetRestaurantsList } from '../services/apiCalls';

function Restaurants() {
  const [selectedOption, setSelectedOption] = useState('all');
  const [search, setSearch] = useState('');
  const [searchBarOff, setSearchBarOff] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [favOn, setFavOn] = useState(false);
  const { name: userName } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const get = async () => {
      const response = await apiGetRestaurantsList(search, favOn);
      if (!response.error) {
        setRestaurants(response.restaurants);
      }
    };
    get();
  }, [search, favOn]);

  useEffect(() => {
    if (selectedOption === 'fav') {
      setFavOn(true);
    } else {
      setFavOn(false);
    }
  }, [selectedOption]);

  const setSearchBarVisibility = () => {
    setSearchBarOff(!searchBarOff);
  };

  const handleChange = ({ target: { value } }) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <header>Olá, {userName}, temos uma lista de restaurantes próximos da sua localização.</header>
      <label htmlFor="all">
        <input
          id="all"
          type="checkbox"
          value="all"
          checked={selectedOption === 'all'}
          onChange={handleChange}
        />
        Exibir todos
      </label>
      <label htmlFor="fav">
        <input
          id="fav"
          type="checkbox"
          value="fav"
          checked={selectedOption === 'fav'}
          onChange={handleChange}
        />
        Exibir apenas favoritos
      </label>
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={index} restaurant={restaurant} />
      ))}
      <input
        type="text"
        name="search"
        value={search}
        hidden={searchBarOff}
        onChange={({ target: { value } }) => setSearch(value)}
      />
      <Footer setSearchBarVisibility={setSearchBarVisibility} />
    </div>
  );
}

export default Restaurants;
