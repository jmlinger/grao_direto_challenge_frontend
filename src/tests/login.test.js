import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import { renderWithRouter } from './testConfig';

describe('Testes unitários da página de login.', () => {
  const emailId = 'email-input';
  const passwordId = 'password-input';
  const loginButtonId = 'login-button';
  const genericEmail = 'edu@test.com';
  const genericPassword = 'edu6789';
  const restaurantPath = '/restaurants';

  test('Verifica se a página contêm os elementos esperados após ser renderizada.', () => {
    render(<App />, { wrapper: MemoryRouter });
    /* A opção wrapper foi utilizada para ignorar a memoria de router, pois, nesse teste, não necessitamos
    ter acesso ao historico das rotas. */

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginButton = screen.getByTestId(loginButtonId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('Verifica se ao entrar na página o botão de login está desabilitado', () => {
    render(<App />, { wrapper: MemoryRouter });

    const loginButton = screen.getByTestId(loginButtonId);
    expect(loginButton).toBeDisabled();
  });

  test('Verifica se ao preencher o os campos email e senha corretamente o botão é habilitado', () => {
    render(<App />, { wrapper: MemoryRouter });

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginButton = screen.getByTestId(loginButtonId);

    userEvent.type(emailInput, genericEmail);
    userEvent.type(passwordInput, genericPassword);
    expect(loginButton).toBeEnabled();
  });

  test('Verifica se ao clicar no botão de login a página é redirecionada.', () => {
    const { history } = renderWithRouter(<App />, '/');

    const emailInput = screen.getByTestId(emailId);
    const passwordInput = screen.getByTestId(passwordId);
    const loginButton = screen.getByTestId(loginButtonId);

    userEvent.type(emailInput, genericEmail);
    userEvent.type(passwordInput, genericPassword);
    userEvent.click(loginButton);

    const { pathname } = history.location;
    expect(pathname).toBe(restaurantPath);
  });
});
