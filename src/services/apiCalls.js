import axios from 'axios';
import { serverApiUrl, serverReactAppUrl } from '../utils/dynamicUrls';

const globalApiVariables = () => {
  const { id: userId, token } = JSON.parse(localStorage.getItem('user'));

  const config = {
    headers: {
      authorization: token,
    },
  };
  return { userId, config };
};

const expireTokenCaseError = ({ message }) => {
  if (message === 'Request failed with status code 401') {
    localStorage.clear();

    return window.location.replace(serverReactAppUrl);
  }
};

export const apiLogin = async (user) => {
  try {
    const url = `${serverApiUrl}/users/login`;
    const fetchApi = await axios.post(url, user);
    const response = await fetchApi.data;

    return response;
  } catch (error) {
    return { error };
  }
};

export const apiRegister = async (newUser) => {
  try {
    const url = `${serverApiUrl}/users/register`;

    const fetchApi = await axios.post(url, newUser);
    const response = await fetchApi.data;

    return response;
  } catch (error) {
    return { error };
  }
};

export const apiGetRestaurantsList = async (userId, search, favOn) => {
  try {
    const { config } = globalApiVariables();
    const url = `
    ${serverApiUrl}/restaurants/search?userId=${userId}&search=${search}&favOn=${favOn}
    `;

    const fetchApi = await axios.get(url, config);
    const response = await fetchApi.data;

    return response;
  } catch (error) {
    console.log(error);
    return expireTokenCaseError(error);
  }
};

export const apiGetRestaurantById = async (id) => {
  try {
    const { config } = globalApiVariables();
    const url = `${serverApiUrl}/restaurants/${id}`;

    const fetchAPI = await axios.get(url, config);
    const response = await fetchAPI.data;

    return response;
  } catch (error) {
    return { error };
  }
};

// const apiUpdateUser = async () => {
//   try {
//     const { config } = globalApiVariables();
//     const url = `${serverApiUrl}register`;
//     const fetchAPI = await axios.get(url, config);
//     const response = await fetchAPI.data;

//     return response;
//   } catch (error) {
//     return { error };
//   }
// };
