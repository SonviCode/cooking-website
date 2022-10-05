import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Home = () => {
  const [mealsData, setMealsData] = useState([]);
  const [mealRandom, setMealRandom] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
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
      <header className="w-full relative ">
        <Navbar />
        <div className="pt-20">
          <div className="px-[5%] max-w-[600px]">
            <h1 className="text-3xl font-bold text-center gap-2.5 w-full uppercase">
              500g <br />
              Recettes, plats & ingrédients !
            </h1>
            <h2 className="mt-20 mb-4 underline underline-offset-4 font-bold">
              Trouvez le meilleur pour vous !
            </h2>

            <form
              action={`/recherche/${inputSearch}`}
              className="bg-white rounded-md shadow-md p-2.5 relative mb-5 flex justify-between"
            >
              <input
                className="p-2.5 w-full outline-none"
                type="text"
                placeholder="Tapez le nom d'un aliment (en anglais)"
                onChange={(e) => setInputSearch(e.target.value)}
                required
                autoComplete="off"
              />
              <button className=" p-2.5 rounded-md bg-vert">
                {researchBtn ? (
                  "Rechercher"
                ) : (
                  <i className="fa-solid fa-magnifying-glass"></i>
                )}
              </button>
            </form>
            <form action="/random">
              <button className="bg-vert rounded-md shadow-md p-2.5 relative w-max-min ">
                Recette random
              </button>
            </form>
          </div>
          <img
            className=" opacity-50 -z-10 absolute top-52 -right-10 w-full max-w-[600px] rounded-[50px]"
            src={mealRandom[0] && mealRandom[0].strMealThumb}
            alt={"plats de " + mealRandom.strMeal}
          />
        </div>
      </header>
      <main></main>
      <footer></footer>
    </>
  );
};

export default Home;
