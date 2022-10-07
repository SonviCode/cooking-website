import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Recherche = () => {
  const params = useParams();

  const [research, setResearch] = useState([]);
  const [inputSearch, setInputSearch] = useState();
  const [researchBtn, setResearchBtn] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + params.slug ||
          inputSearch
      )
      .then((res) => setResearch(res.data.meals));
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
      <header>
        <Navbar />
      </header>
      <main>
        <div className="pt-20 px-[5%]">
          <div className="flex justify-center items-center gap-x-20 mb-20 flex-wrap">
            <h1 className="text-4xl">500G </h1>
            <form
              action={`/recherche/${inputSearch}`}
              className="bg-white rounded-md shadow-md p-2.5 relative  flex justify-between max-w-[600px] w-full"
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
          </div>

          <h1 className="font-bold mb-10">
            Nombre de recette pour {params.slug} : {research && research.length}
          </h1>

          <div className="text-center">
            {research
              ? research.map((meal) => <Card key={meal.idMeal} meal={meal} />)
              : `Aucun résultat pour : ${params.slug},
              tente une nouvelle recherche ! `}
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Recherche;
