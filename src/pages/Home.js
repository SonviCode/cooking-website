import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import SwiperIngredient from "../components/SwiperIngredient";
import Categorys from "../components/Categorys";
import Area from "../components/Areas";
import Areas from "../components/Areas";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [mealsData, setMealsData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [mealRandom, setMealRandom] = useState([]);
  const [researchBtn, setResearchBtn] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputSearch
      )
      .then((res) => setMealsData(res.data.meals));
  }, [inputSearch]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => setMealRandom(res.data.meals));
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 620) {
      setResearchBtn(true);
    } else {
      setResearchBtn(false);
    }
  });

  return (
    <>
      <header className="h-full">
        <Navbar />
        <div className="pt-20 w-full h-full max-w-7xl mx-auto relative overflow-x-clip xxl:overflow-visible">
          <div className="px-[5%] ">
            <h1 className="text-3xl font-bold text-center w-full uppercase">
              500g <br />
              Recettes, ingrédients & santé !
            </h1>
            <h2 className="mt-20 mb-4 underline underline-offset-4 font-bold text-3xl">
              Trouvez le meilleur pour vous !
            </h2>

            <div className="bg-white rounded-md shadow-md p-2.5 relative mb-10 flex justify-between max-w-[600px]">
              <input
                className="p-2.5 w-full outline-none"
                type="text"
                placeholder="Tapez le nom d'une recette (en anglais)"
                onChange={(e) => setInputSearch(e.target.value)}
                required
                autoComplete="off"
              />
              <Link
                to={`/recherche/${inputSearch}`}
                className=" p-2.5 rounded-md bg-vert"
              >
                {researchBtn && window.innerWidth >= 620 ? (
                  "Rechercher"
                ) : (
                  <i className="fa-solid fa-magnifying-glass"></i>
                )}
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Link
                to={"/random"}
                className="bg-vert rounded-full shadow-md p-2.5 relative w-11 shadow-md text-center"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
              <p className="sm:text-2xl">
                <i className="fa-solid fa-arrow-left mr-2.5"></i> Recette random
                juste ici
              </p>
            </div>
          </div>
          <img
            className=" opacity-50 -z-10 absolute top-52 -right-10 w-full max-w-[600px] rounded-[50px] shadow-md"
            src={mealRandom[0] && mealRandom[0].strMealThumb}
            alt={"plats de " + mealRandom.strMeal}
          />
        </div>
      </header>
      <main>
        <SwiperIngredient />
        <Categorys />
        <Areas />
      </main>
      <Footer />
    </>
  );
};

export default Home;
