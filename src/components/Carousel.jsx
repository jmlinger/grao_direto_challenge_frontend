import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import '../styles/RestaurantDetails.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = (props) => {
  const { menu } = props;
  console.log(menu);

  const settings = {
    className: 'Carousel',
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    pauseOnFocus: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="carousel-section">
      <Slider {...settings}>
        {menu.map(({ name, description, image, price }, index) => (
          <div key={index} className="card">
            <div className="card-top">
              <img src={image} alt="menu-items-img" />
              <h1>{name}</h1>
            </div>
            <div className="card-bottom">
              <p>{description}</p>
              <p className="price">{price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Carousel;

Carousel.propTypes = {
  menu: PropTypes.array
}.isRequired;
