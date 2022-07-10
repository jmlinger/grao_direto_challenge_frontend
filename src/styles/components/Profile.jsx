// import styled from 'styled-components';
import Modal from 'styled-react-modal';

export const StyledModal = Modal.styled`
  max-width: 600px;
  max-height: 700px;
  width: max(50vw, 220px);
  height: max(80vh, 450px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #b1a7a6;
  justify-content: space-around;
  box-shadow: 0 0 7px white;

  h2 {
    font-size: max(5vw, 30px);
  }

  .login-input {
    width: max(45vw, 185px);
  }

  .login-button {
    background-color: black;
    width: max(20vw, 150px);
    height: auto;
    font-size: max(2vw, 10px);
    margin: 0;
  }

  .init-profile {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    display: flex;
    gap: max(3vh, 20px);
  }

  .profile-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      margin: 2px;
    }
  }
`;
