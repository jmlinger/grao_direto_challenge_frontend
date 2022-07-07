import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RestaurantCard(props) {
  const {
    restaurant: { id, name, subname, image, rating, favUsers }
  } = props;

  return (
    <Link to={`/restaurants/${id}`}>
      <div>
        <img alt="banner do restaurante" src={image} />
        <div>
          <h1>{name}</h1>
          <h2>{subname}</h2>
          <p>
            <img alt="estrela-avaliação" src="" />
            {rating}
          </p>
          <p htmlFor="imagem-relogio">
            <img alt="relogio-tempo-deslocamento" src="" />
            30-40 min
          </p>
          <img alt="favoritado" src="" hidden={!favUsers} />
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;

RestaurantCard.propTypes = {
  key: PropTypes.number,
  restaurant: PropTypes.object,
  name: PropTypes.string,
  image: PropTypes.string,
  rating: PropTypes.number
}.isRequired;
