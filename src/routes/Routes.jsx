import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
// import Register from '../pages/Register';
// import Restaurants from '../pages/Restaurants';
// import RestaurantsDetail from '../pages/RestaurantsDetail';
// import Profile from '../pages/Profile';
// import Error from '../pages/Error';

function allRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      {/* <Route path="/register" element={ <Register /> } />
      <Route path="/restaurants" element={ <Restaurants /> } />
      <Route path="/restaurants/:id" element={ <RestaurantsDetail /> } />
      <Route path="/profile" element={ <Profile /> } /> */}
      {/* <Route path="*" element={ <Error /> } /> */}
    </Routes>
  );
}

export default allRoutes;
