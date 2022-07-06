/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillStar, AiOutlineFieldTime } from 'react-icons/ai';
import Footer from '../components/Footer';
import { apiFavRes, apiGetRestaurantById, apiUnFavRes } from '../services/apiCalls';
import Carousel from '../components/Carousel';

function RestaurantDatails() {
  const { id: restaurantId } = useParams();

  const [restaurant, setRestaurant] = useState({});
  const [favOn, setFavOn] = useState(false);

  useEffect(() => {
    const get = async () => {
      const response = await apiGetRestaurantById(restaurantId);
      if (!response.error) {
        setRestaurant(response.restaurant);
      }
    };
    get();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async () => {
    setFavOn(!favOn);
    if (favOn) {
      const response = await apiUnFavRes(restaurantId);
      if (response.error) {
        console.error(response.error);
      }
    }
    if (!favOn) {
      const response = await apiFavRes(Number(restaurantId));
      if (response.error) {
        console.error(response.error);
      }
    }
  };

  const { name, subname, image, phone, address, rating } = restaurant;

  return (
    <div className="main-div">
      <header>
        <img className="res-img" alt="banner do restaurante" src={ image } />
        <div className="res-info-container">
          <div className="main-info-container">
            <div className="icons-container">
              <p>
                <AiFillStar />
                {rating}
              </p>
              <p htmlFor="imagem-relogio">
                <AiOutlineFieldTime />
                30-40 min
              </p>
            </div>
            <div className="names-container">
              <h1>{name}</h1>
              <h2>{subname}</h2>
            </div>
            <div className="icons-container">
              <button
                className="fav-button"
                type="button"
                onClick={ () => handleClick() }
              >
                {
                  !favOn
                    ? <MdFavoriteBorder className="fav-icons" />
                    : <MdFavorite className="fav-icons" />
                }
              </button>
            </div>
          </div>
          <p>{phone}</p>
          <p>{address}</p>
        </div>
      </header>
      <section>
        <h1>Refeições</h1>
        { Object.keys(restaurant).length > 0 && <Carousel menu={ restaurant.menu } /> }
      </section>
      <section>
        <h1>Bebidas</h1>
      </section>
      <Footer />
    </div>
  );
}

export default RestaurantDatails;
