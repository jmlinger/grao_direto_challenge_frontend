import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { FooterStyle } from '../styles/Footer';

function Footer(props) {
  const { setSearchBarVisibility } = props;
  const { pathname } = useLocation();

  return (
    <FooterStyle>
      <Link to="/restaurants">
        <img alt="página-principal" src="" />
      </Link>
      <button
        type="button"
        hidden={pathname !== '/restaurants'}
        onClick={() => setSearchBarVisibility()}>
        <img alt="barra de busca" src="" />
      </button>
      <Link to="/profile">
        <img alt="perfil" src="" />
      </Link>
    </FooterStyle>
  );
}

export default Footer;

Footer.propTypes = {
  setSearchBarVisibility: PropTypes.func
}.isRequired;
