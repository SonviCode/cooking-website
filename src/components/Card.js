import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Card = ({ meal }) => {
  return (
    <Link
      to={`/meal/${meal.strMeal.replace(/\s+/g, "-").trim()}`}
      state={meal.strMeal}
      key={uuidv4()}
    >
      <div
        id="container-card-in"
        className="flex xs:flex-row flex-col items-center md:pl-40 mb-10 max-w-2xl "
      >
        <div className="w-[400px] overflow-hidden ">
          <img
            className="w-full h-full rounded-lg duration-300"
            src={meal.strMealThumb}
            alt={meal.strMeal}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">{meal.strMeal}</h2>
          <p>{meal.strInstructions.slice(0, 100)}...</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
