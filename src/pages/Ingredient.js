import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";

const Ingredient = () => {
  const location = useLocation();

  let ingredient = location.state;

  const [listMeal, setListMeal] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.replaceAll(
          "-",
          " "
        )}`
      )
      .then((res) => setListMeal(res.data.meals));
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section>
          <div className="pt-20 flex flex-col lg:flex-row items-center justify-center mb-20 px-[5%]">
            <h1 className="text-5xl font-bold uppercase underline underline-offset-[10px] leading-tight lg:text-right">
              {ingredient}
            </h1>
            <img
              className="image"
              src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
              alt="ingredient"
            />
          </div>
          <div className="px-[5%]">
            <h2 className="text-2xl font-extrabold uppercase">
              Recettes réalisables avec l'ingrédient {ingredient} :
            </h2>
            <h3 className="uppercase mb-10">
              Nombres de recettes réalisables avec l'ingrédient {ingredient} :{" "}
              {listMeal.length}
            </h3>
            <div className="grid grid-cols-auto-fit200 gap-10 max-w-7xl mx-auto mb-20 justify-items-center">
              {listMeal &&
                listMeal.map((el) => (
                  <>
                    <Link
                      to={`/meal/${el.strMeal.replace(/\s+/g, "-").trim()}`}
                      state={el.strMeal}
                      key={uuidv4()}
                    >
                      <div id="container-card-out">
                        <div className="max-w-[300px] overflow-hidden ">
                          <img
                            className=" duration-300 "
                            src={el.strMealThumb}
                            alt="recette"
                            key={uuidv4()}
                          />
                        </div>
                        <p className="text-xl" key={uuidv4()}>
                          {el.strMeal}
                        </p>
                      </div>
                    </Link>
                  </>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Ingredient;
