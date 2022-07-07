import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidation } from '../utils/inputValidations';
import { apiLogin } from '../services/apiCalls';
import '../styles/Login.css';

function Login() {
  const navigate = useNavigate();
  const [hiddenOn, setHiddenOn] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });

  function handleChange({ target: { name, value } }) {
    setLogin({ ...login, [name]: value });
  }

  async function submitLogin(e) {
    e.preventDefault();

    const response = await apiLogin(login);

    if (response.error) {
      setHiddenOn(false);
    } else {
      const {
        token,
        user: { id, name, email, address }
      } = response;
      const userData = { id, name, email, address, token };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/restaurants');
    }
  }

  return (
    <div id="login-body" className="login">
      <div>
        <h1 className="login_title">Delicious Food</h1>
        <h2 className="login_subtitle">Não tem conta?</h2>
        <Link to="/register" className="login_register">
          Cadastre-se
        </Link>
      </div>
      <fieldset id="login-fieldset" className="login-container">
        <form id="login-form" className="login-form">
          <input
            className="login-input"
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="login-input"
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChange}
          />
          <p hidden={hiddenOn} data-testid="invalid-email-element">
            Email ou senha inválido.
          </p>
          <button
            className="login-button"
            data-testid="login-button"
            type="submit"
            disabled={loginValidation(login).error}
            onClick={(e) => submitLogin(e)}>
            Entrar
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default Login;
