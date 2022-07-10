import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUpdateRegister } from '../services/apiCalls';
import { ProfileIcon } from '../styles/components/Icons';
import { StyledModal } from '../styles/components/Profile';
import { registerValidation } from '../utils/inputValidations';

function Profile() {
  const {
    id: userId,
    name: currentName,
    email: currentEmail,
    address: currentAddress,
    token
  } = JSON.parse(localStorage.getItem('user'));

  const [modalIsOpen, setIsOpen] = useState(false);
  const [hideChangeData, setHideChangeData] = useState(true);
  const [register, setRegister] = useState({
    id: userId,
    name: currentName,
    email: currentEmail,
    address: currentAddress,
    password: ''
  });
  const { name, email, address, password } = register;

  useEffect(() => {
    setHideChangeData(true);
  }, [modalIsOpen]);

  async function submitUpdateRegister(e) {
    e.preventDefault();

    const response = await apiUpdateRegister(register);

    if (!response.error) {
      setHideChangeData(true);
      // atualiza o local storage
      const userData = { id: userId, name, email, address, token };
      localStorage.setItem('user', JSON.stringify(userData));
    }
  }

  function handleChange({ target: { name, value } }) {
    setRegister({ ...register, [name]: value });
  }

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
  return (
    <div>
      <button onClick={toggleModal}>
        <ProfileIcon modalIsOpen={modalIsOpen} />
      </button>
      <StyledModal
        isOpen={modalIsOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}>
        {/* <button onClick={toggleModal}>Fechar</button> */}
        <h2>Perfil</h2>
        <div hidden={!hideChangeData}>
          <div className="init-profile">
            <button className="login-button" onClick={() => setHideChangeData(false)}>
              Alterar dados
            </button>
            <Link to="/">
              <button className="login-button">Logout</button>
            </Link>
          </div>
        </div>
        <form hidden={hideChangeData}>
          <div className="profile-form">
            <input
              className="login-input"
              data-testid="name-input"
              type="text"
              name="name"
              placeholder="Insira seu nome"
              value={name}
              onChange={handleChange}
            />
            <input
              className="login-input"
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="Insira um email válido"
              value={email}
              onChange={handleChange}
            />
            <input
              className="login-input"
              data-testid="address-input"
              type="text"
              name="address"
              placeholder="Insira seu endereço completo"
              value={address}
              onChange={handleChange}
            />
            <input
              className="login-input"
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="Insira uma senha válida"
              value={password}
              onChange={handleChange}
            />
            <button
              className="login-button"
              data-testid="register-button"
              type="submit"
              disabled={registerValidation({ name, email, address, password }).error}
              onClick={(e) => submitUpdateRegister(e)}>
              Enviar Alteração
            </button>
            <button className="login-button" type="button" onClick={() => setHideChangeData(true)}>
              Sair
            </button>
          </div>
        </form>
      </StyledModal>
    </div>
  );
}

export default Profile;
