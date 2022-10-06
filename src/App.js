import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import Category from './pages/Category';
import Home from './pages/Home';
import Ingredient from './pages/Ingredient';
import Ingredients from './pages/Ingredients';
import Meal from './pages/Meal';
import Random from './pages/Random';
import Recherche from './pages/Recherche';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<Home/>}/>
        <Route path="/ingredients" element={<Ingredients/>}/>
        <Route path="/ingredient/:slug" element={<Ingredient/>}/>
        <Route path="/meal/:slug" element={<Meal/>}/>
        <Route path="/recherche/:slug" element={<Recherche/>}/>
        <Route path="/category/:slug" element={<Category/>}/>
        <Route path="/random" element={<Random/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;