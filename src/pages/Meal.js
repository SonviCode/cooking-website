import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Meal = () => {
  const location = useLocation();
  let meal = location.state;

  const [dataMeal, setDataMeal] = useState([]);

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
      .then((res) => setDataMeal(res.data.meals));
  }, []);

  // FOR THE STATE TO CATEGORY WITH THE GOOD INDEX
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setCategoryList(res.data.categories));
  }, []);

  let indexCategory;

  if (dataMeal[0]) {
    indexCategory = categoryList.findIndex(
      (e) => e.strCategory === dataMeal[0].strCategory
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
    ingredients.push(dataMeal[0] && dataMeal[0][`strIngredient${number}`]);
    measures.push(dataMeal[0] && dataMeal[0][`strMeasure${number}`]);
  }

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="px-[5%]">
          <div className="pt-20">
            <h1 className="text-4xl font-extrabold text-center gap-2.5 w-full uppercase mb-10">
              {dataMeal[0] && dataMeal[0].strMeal}
            </h1>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-10 mb-20">
              <img
                className="rounded-[50px] flex-1 max-w-[400px] w-full"
                src={dataMeal[0] && dataMeal[0].strMealThumb}
                alt={dataMeal[0] && dataMeal[0].strMeal}
              />
              <div className="flex-1 flex flex-row flex-wrap sm:flex-col gap-10">
                <p>
                  Origine :{" "}
                  <Link
                    to={`/area/${dataMeal[0] && dataMeal[0].strArea}`}
                    className="font-bold hover:underline underline-offset-4"
                  >
                    {dataMeal[0] && dataMeal[0].strArea}
                  </Link>
                </p>
                <p>
                  Catégories :{" "}
                  <Link
                    to={`/category/${dataMeal[0] && dataMeal[0].strCategory}`}
                    className="font-bold hover:underline underline-offset-4"
                    state={dataMeal[0] && categoryList[indexCategory]}
                  >
                    {dataMeal[0] && dataMeal[0].strCategory}
                  </Link>
                </p>
                <a
                  className="underline underline-offset-4 font-bold"
                  href={dataMeal[0] && dataMeal[0].strMealThumb}
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
              <p>{dataMeal[0] && dataMeal[0].strInstructions}</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold uppercase mb-10">
              Ingrédients :{" "}
            </h2>
            <div className="grid grid-cols-auto-fit100 gap-10 max-w-4xl mx-auto mb-20">
              {dataMeal[0] &&
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

          <div className="flex items-center justidy-center flex-col gap-10 mb-20">
            <h3 className="uppercase font-bold text-2xl ">Vidéo :</h3>
            <iframe
              className="min-w-[300px] h-[315px] w-full max-w-[600px]"
              src={`https://www.youtube.com/embed/${
                dataMeal[0] && dataMeal[0].strYoutube.slice(-11)
              }`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Meal;
