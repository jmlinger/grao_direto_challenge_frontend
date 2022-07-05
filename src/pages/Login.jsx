import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginValidation } from '../utils/inputValidations';
import { apiLogin } from '../services/apiCalls';

function Login() {
  const navigate = useNavigate();
  const [hiddenOn, setHiddenOn] = useState(true);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  function handleChange({ target: { name, value } }) {
    setLogin({ ...login, [name]: value });
  }

  function handleLoginValidation() {
    return loginValidation(login).error;
  }

  async function submitLogin(e) {
    e.preventDefault();

    const response = await apiLogin(login);

    if (response.error) {
      setHiddenOn(false);
    } else {
      const { token, user: { id, name, email, address } } = response;
      const userData = { id, name, email, address, token };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/restaurants');
    }
  }

  return (
    <div id="login-body">
      <div>
        <h2>Não tem conta?</h2>
        <Link to="/register">Cadastre-se</Link>
      </div>
      <fieldset id="login-fieldset">
        <form id="login-form">
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={ handleChange }
          />
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Senha"
            onChange={ handleChange }
          />
          <p
            hidden={ hiddenOn }
            data-testid="invalid-email-element"
          >
            Email ou senha inválido.
          </p>
          <button
            data-testid="login-button"
            type="submit"
            disabled={ handleLoginValidation() }
            onClick={ (e) => submitLogin(e) }
          >
            Entrar
          </button>
        </form>
      </fieldset>
    </div>
  );
}

export default Login;
