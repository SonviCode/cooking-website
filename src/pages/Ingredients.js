import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Ingredients = () => {
  const [ingredientList, setIngredientList] = useState([]);
  const [numberIndexArray, setNumberIndexArray] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
      );

      setIngredientList(res.data.meals);
    })();
  }, []);

  let numberSlice = 48;
  let ingredientListArray = [];

  for (let i = 0; i < ingredientList.length; i += numberSlice) {
    const number = ingredientList.slice(i, i + numberSlice);
    ingredientListArray.push(number);
  }

  const addIndexArray = () => {
    setNumberIndexArray(numberIndexArray + 1);
    window.scrollTo(0, 0);
  };

  const removeIndexArray = () => {
    setNumberIndexArray(numberIndexArray - 1);
    window.scrollTo(0, 0);
  };
  const indexArray = () => {
    setNumberIndexArray(numberIndexArray);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section id="ingredients">
          <div className="pt-20 px-[5%] max-w-7xl mx-auto">
            <div>
              <h1 className="underline underline-offset-4 font-bold text-3xl">
                Voici la liste de tout nos ingrédients !
              </h1>
              <h2>
                N'hésite pas à cliquer dessus pour découvrir de nouvelles
                recettes <i className="fa-regular fa-face-laugh-beam"></i>
              </h2>
            </div>

            <div className="grid grid-cols-auto-fit200 gap-10 mb-10 justify-items-center">
              {ingredientListArray.length > 1 &&
                ingredientListArray[numberIndexArray].map((el) => (
                  <div
                    key={uuidv4()}
                    className="flex flex-col  max-w-[300px] justify-center text-center px-10 relative "
                  >
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
                      <p key={uuidv4()} className="font-bold text-2xl pt-36">
                        {el.strIngredient}
                      </p>
                      <p key={uuidv4()} className="truncate">
                        {el.strDescription}
                      </p>
                    </Link>
                  </div>
                ))}
            </div>
            <div className="grid grid-area sm:grid-cols-14 justify-items-center mb-10">
              <button
                onClick={numberIndexArray === 0 ? indexArray : removeIndexArray}
                className={
                  numberIndexArray === 0
                    ? `bg-gray-100 rounded-full shadow-md p-2.5  w-11 shadow-md text-center relative sm:-left-2.5 prev`
                    : `bg-vert rounded-full shadow-md p-2.5 w-11 shadow-md text-center relative sm:-left-2.5 prev`
                }
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              { ingredientListArray.map((el) => (
                <button 
                onClick={() => setNumberIndexArray(ingredientListArray.indexOf(el)) + window.scrollTo(0, 0)}
                className={numberIndexArray === ingredientListArray.indexOf(el) ? `bg-vert rounded-full shadow-md h-11 w-11  shadow-md text-center p-2.5` : `p-2.5`}
                key={uuidv4()}>
                  {ingredientListArray.indexOf(el) + 1}{" "}
                </button>
              ))}
              <button
                onClick={
                  numberIndexArray === ingredientListArray.length - 1
                    ? indexArray
                    : addIndexArray
                }
                className={
                  numberIndexArray === ingredientListArray.length - 1
                    ? `bg-gray-100 rounded-full shadow-md p-2.5  w-11 shadow-md text-center relative sm:-right-2.5 next`
                    : `bg-vert rounded-full shadow-md p-2.5 w-11  shadow-md text-center relative sm:-right-2.5 next`
                }
              >
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Ingredients;
