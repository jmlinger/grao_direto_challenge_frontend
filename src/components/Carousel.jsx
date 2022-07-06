import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Glide from 'react-glidejs';
import '../styles/RestaurantDetails.css';

const Carousel = (props) => {
  const { menu } = props;
  console.log(menu);

  const gliderRef = useRef(null);

  return (
    <section className="banners-section">
      {'Carregando' && (
        <Glide
          ref={ gliderRef }
          type="carousel"
          customSlideAnimation={ {
            timeout: 200,
            classNames: 'fade',
          } }
          perView={ 2 }
          startAt={ 1 }
          focusAt="center"
          autoplay={ 2500 }
        >
          {menu.map(({ image }, index) => (
            <div key={ index }>
              <div className="desktop">
                <img src={ image } className="slide-img" alt="company-logo" />
              </div>
            </div>
          ))}
        </Glide>
      )}
    </section>
  );
};

export default Carousel;

Carousel.propTypes = ({
  menu: PropTypes.array,
}).isRequired;
