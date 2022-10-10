import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../components/Footer";

const Random = () => {
  const [mealRandom, setMealRandom] = useState([]);
  const [inputChangeState, setInputChangeState] = useState(true);

  const changeState = () => {
    setInputChangeState(!inputChangeState);
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      setMealRandom(res.data.meals);
    })();
  }, [inputChangeState]);

  // FOR THE STATE TO CATEGORY WITH THE GOOD INDEX
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategoryList(res.data.categories);
    })();
  }, []);

  let indexCategory;

  if (mealRandom[0]) {
    indexCategory = categoryList.findIndex(
      (e) => e.strCategory === mealRandom[0].strCategory
    );
    if (indexCategory > -1) {
      /* categoryList contains the element we're looking for, at index "indexCategory" */
    }
  }

  // BOUCLE FOR STR INGREDIENT AND STR MEASURE
  let number = "";
  let measures = [];
  let ingredients = [];

  for (let i = 1; i < 20; i++) {
    number = +i;
    ingredients.push(mealRandom[0] && mealRandom[0][`strIngredient${number}`]);
    measures.push(mealRandom[0] && mealRandom[0][`strMeasure${number}`]);
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="px-[5%]">
          <div className="pt-32">
            <h1 className="text-3xl font-bold uppercase underline underline-offset-8 mb-5">
              Voici une recette totalement au hasard !
            </h1>
            <div className="flex gap-10 justify-center items-center">
              <p className="text-2xl">
                Clique ici pour en une nouvelle recette{" "}
                <i className="fa-solid fa-arrow-right ml-2.5"></i>
              </p>
              <button
                onClick={changeState}
                className="bg-vert rounded-md shadow-md p-2.5 relative w-max-min "
              >
                Autre recette
              </button>
            </div>
          </div>
          <div className="pt-20">
            <h1 className="text-4xl font-extrabold text-center gap-2.5 w-full uppercase mb-10">
              {mealRandom[0] && mealRandom[0].strMeal}
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-20">
              <img
                className="rounded-[50px] flex-1 max-w-[400px] w-full"
                src={mealRandom[0] && mealRandom[0].strMealThumb}
                alt={mealRandom[0] && mealRandom[0].strMeal}
              />
              <div className="flex-1 flex flex-row flex-wrap sm:flex-col gap-10 ">
                <p>
                  Origine :{" "}
                  <Link
                    to={`/area/${mealRandom[0] && mealRandom[0].strArea}`}
                    className="font-bold hover:underline underline-offset-4"
                  >
                    {mealRandom[0] && mealRandom[0].strArea}
                  </Link>
                </p>
                <p>
                  Catégories :{" "}
                  <Link
                    to={`/category/${
                      mealRandom[0] && mealRandom[0].strCategory
                    }`}
                    className="font-bold hover:underline underline-offset-4"
                    state={mealRandom[0] && categoryList[indexCategory]}
                  >
                    {mealRandom[0] && mealRandom[0].strCategory}
                  </Link>
                </p>
                <a
                  className="underline underline-offset-4 font-bold"
                  href={mealRandom[0] && mealRandom[0].strMealThumb}
                  target="_blank"
                  rel="noreferrer"
                >
                  Sources
                </a>
              </div>
            </div>
            <div className="mb-20">
              <h2 className="text-2xl font-extrabold uppercase mb-10">
                Préparation :{" "}
              </h2>
              <p>{mealRandom[0] && mealRandom[0].strInstructions}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold uppercase mb-10">
              Ingrédients :{" "}
            </h2>
            <div className="grid grid-cols-auto-fit100 gap-10 max-w-4xl mx-auto mb-20">
              {mealRandom[0] &&
                ingredients.map(
                  (el) =>
                    el && (
                      <div
                        className="flex flex-col justify-center items-center p-5 text-center hover:-translate-y-5 ease-in duration-300"
                        key={uuidv4()}
                      >
                        <Link
                          to={`/ingredient/${el.replace(/\s+/g, "-").trim()}`}
                          state={el}
                          key={uuidv4()}
                        >
                          <img
                            src={`https://www.themealdb.com/images/ingredients/${el}-Small.png`}
                            alt="ingredient"
                            key={uuidv4()}
                          />
                          <p key={uuidv4()} className="font-bold">
                            {el}
                          </p>
                          <p key={uuidv4()}>
                            {measures[`${ingredients.indexOf(el)}`]}
                          </p>
                        </Link>
                      </div>
                    )
                )}
            </div>
          </div>

          <div className="flex items-center justify-center flex-col gap-10 mb-20">
            <h3 className="uppercase font-bold text-2xl ">Vidéo :</h3>
            <iframe
              className="min-w-[300px] h-[315px] w-full max-w-[600px]"
              src={`https://www.youtube.com/embed/${
                mealRandom[0] && mealRandom[0].strYoutube.slice(-11)
              }`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Random;
