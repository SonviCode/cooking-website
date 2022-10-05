import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Ingredient = () => {

  const location = useLocation();

  let ingredient = location.state;

  const [listMeal, setListMeal] = useState([]);

  console.log(listMeal);

  console.log(ingredient);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then((res) => setListMeal(res.data.meals));
  }, []);


  return (
    <div>
      <h1>{ingredient}</h1>
      {/* {
        listMeal.map((el) => (
          <>
            <p key={uuidv4()}>{el.strMeal}</p>
          </>
        ))} */}
      <img
        className="image"
        src={`https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`}
        alt="ingredient"
      />
      <h2>Recettes réalisables avec l'ingrédient {ingredient} :</h2>
      <div className="container-map">
        {listMeal &&
          listMeal.map((el) => (
            <>
              <Link
                to={`/meal/${el.strMeal.replace(/\s+/g, "-").trim()}`}
                state={el.strMeal}
                key={uuidv4()}
              >
                <img className="image" src={el.strMealThumb} alt="recette" />
              </Link>
              {/* <p key={uuidv4()}>{el.strMeal}</p> */}
            </>
          ))}
      </div>
    </div>
  );
};

export default Ingredient;
