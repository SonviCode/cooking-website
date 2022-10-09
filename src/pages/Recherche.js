import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Recherche = () => {
  const params = useParams();

  const [research, setResearch] = useState([]);
  const [inputSearch, setInputSearch] = useState(params.slug);

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputSearch
      )
      .then((res) => setResearch(res.data.meals));
  }, [inputSearch]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="pt-20 px-[5%] ">
          <div className="flex justify-center items-center gap-x-20 mb-20 flex-wrap">
            <h1 className="text-4xl">500G </h1>
            <div className="bg-white rounded-md shadow-md p-2.5 relative  flex justify-between max-w-[600px] w-full">
              <input
                className="p-2.5 w-full outline-none truncate"
                type="text"
                placeholder="Tapez le nom d'un aliment (en anglais)"
                onChange={(e) => setInputSearch(e.target.value)}
              />
            </div>
          </div>

          <h1 className="font-bold mb-10">
            Nombre de recette pour {inputSearch} : {research && research.length}
          </h1>

          <div className="">
            {research ? (
              research.map((meal) => <Card key={meal.idMeal} meal={meal} />)
            ) : (
              <p className="relative w-fit text-center after:absolute after:content-[''] after:bg-vert after:w-full after:h-0.5 after:top-6 after:left-0">
                Aucun résultat pour : {inputSearch}, tente une nouvelle
                recherche !
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Recherche;
