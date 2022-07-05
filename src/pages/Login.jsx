import React, { useState } from 'react';
import '../styles/Login.css';
import { Link } from 'react-router-dom';
import { loginValidation } from '../utils/inputValidations';
import { apiLogin } from '../services/apiCalls';

function Login() {
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

  async function submitLogin() {
    const response = await apiLogin(login);
    console.log(response);

    if (response.error) {
      setHiddenOn(false);
    } else {
      const { token, user: { id, name, email, address } } = response;
      const userData = { id, name, email, address, token };
      localStorage.setItem('user', JSON.stringify(userData));
      // setConnectionOn(userData);
    }
  }

  return (
    <div id="login-body">
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
          <Link to="/">
            <button
              onClick={ () => submitLogin() }
              data-testid="login-button"
              type="submit"
              disabled={ handleLoginValidation() }
            >
              Entrar
            </button>
          </Link>
        </form>
      </fieldset>
    </div>
  );
}

export default Login;
