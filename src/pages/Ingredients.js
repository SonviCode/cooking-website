import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";

const Ingredients = () => {
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => setIngredientList(res.data.meals));
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section>
          <div className="pt-20 px-[5%]">
            <div>
              <h1 className="underline underline-offset-4 font-bold text-3xl">
                Voici la liste de tout nos ingrédients !
              </h1>
              <h2>
                N'hésite pas à cliquer dessus pour découvrir de nouvelles recettes{" "}
                <i className="fa-regular fa-face-laugh-beam"></i>
              </h2>
            </div>

            <div className="grid grid-cols-auto-fit200 gap-10 max-w-7xl mx-auto mb-20 justify-items-center">
              {ingredientList &&
                ingredientList.map(
                  (el) =>
                    el && (
                      <div className="flex flex-col  max-w-[300px] justify-center text-center px-10 relative ">
                        <Link
                          to={`/ingredient/${el.strIngredient
                            .replace(/\s+/g, "-")
                            .trim()}`}
                          state={el.strIngredient}
                          key={uuidv4()}
                        >
                          <img
                            className="w-[150px] absolute left-[50%] -translate-x-[50%] top-0"
                            src={`https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png`}
                            alt={`ingredient ${el.strIngredient}`}
                            key={uuidv4()}
                          />
                          <p
                            key={uuidv4()}
                            className="font-bold text-2xl pt-36"
                          >
                            {el.strIngredient}
                          </p>
                          <p key={uuidv4()} className="truncate">
                            {el.strDescription}
                          </p>
                        </Link>
                      </div>
                    )
                )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Ingredients;
