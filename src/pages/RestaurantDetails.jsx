import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { AiFillStar, AiOutlineFieldTime } from 'react-icons/ai';
import Footer from '../components/Footer';
import { apiFavRes, apiGetRestaurantById, apiUnFavRes } from '../services/apiCalls';
import '../styles/RestaurantDetails.css';
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
  }, []);

  const handleClick = async () => {
    setFavOn(!favOn);
    // eslint-disable-next-line no-unused-expressions
    favOn ? await apiUnFavRes(restaurantId) : await apiFavRes(Number(restaurantId));
  };

  const { name, subname, image, phone, address, rating } = restaurant;

  return (
    <div>
      <div className="main-div">
        <header>
          <img className="res-img" alt="banner do restaurante" src={image} />
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
                <h3>{subname}</h3>
              </div>
              <div className="icons-container">
                <button className="fav-button" type="button" onClick={() => handleClick()}>
                  {!favOn ? (
                    <MdFavoriteBorder className="fav-icons" />
                  ) : (
                    <MdFavorite className="fav-icons" />
                  )}
                </button>
              </div>
            </div>
            <div className="contact-info-container">
              <p>{phone && phone.replace(/(\d{1})(\d{2})(\d{5})(\d{3})/, '($2) $3-$4')}</p>
              <p>{address}</p>
            </div>
          </div>
        </header>
        <section className="menu-section">
          <h3>Refeições</h3>
          {Object.keys(restaurant).length > 0 && <Carousel menu={restaurant.menu} />}
        </section>
        <section className="menu-section">
          <h3>Bebidas</h3>
          {Object.keys(restaurant).length > 0 && <Carousel menu={restaurant.menu} />}
        </section>
        <section className="menu-section">
          <h3>Bebidas</h3>
          {Object.keys(restaurant).length > 0 && <Carousel menu={restaurant.menu} />}
        </section>
        <section className="menu-section">
          <h3>Bebidas</h3>
          {Object.keys(restaurant).length > 0 && <Carousel menu={restaurant.menu} />}
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default RestaurantDatails;
