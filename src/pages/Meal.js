import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";

const Meal = () => {
  const params = useParams();

  const [dataMeal, setDataMeal] = useState([]);

  let handleParams;
  switch (params.slug) {
    case "Jam-Roly-Poly":
      handleParams = params.slug.replace("-", " ");
      break;
    case "Home-made-Mandazi":
    case "Chick-Fil-A-Sandwich":
    case "Three-cheese-souffles":
      handleParams =
        params.slug.substring(0, params.slug.lastIndexOf("-")) +
        " " +
        params.slug.substring(params.slug.lastIndexOf("-") + 1);
      break;
    case "Piri-piri-chicken-and-slaw":
    case "Soy-Glazed-Meatloaves-with-Wasabi-Mashed-Potatoes-&-Roasted-Carrots":
      handleParams = params.slug.replaceAll("-", " ").replace(" ", "-");
      break;
    case "Vietnamese-Grilled-Pork-(bun-thit-nuong)":
    case "Portuguese-prego-with-green-piri-piri":
      handleParams = params.slug.replaceAll("-", " ").split(" ", 3).join(" ");

      break;

    default:
      handleParams = params.slug.replaceAll("-", " ");
  }

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${handleParams}`
      )
      .then((res) => setDataMeal(res.data.meals));
  }, []);

  let ingredient = [];
  let measure = [];

  if (dataMeal[0]) {
    ingredient = [
      dataMeal[0].strIngredient1,
      dataMeal[0].strIngredient2,
      dataMeal[0].strIngredient3,
      dataMeal[0].strIngredient4,
      dataMeal[0].strIngredient5,
      dataMeal[0].strIngredient6,
      dataMeal[0].strIngredient7,
      dataMeal[0].strIngredient8,
      dataMeal[0].strIngredient9,
      dataMeal[0].strIngredient10,
      dataMeal[0].strIngredient11,
      dataMeal[0].strIngredient12,
      dataMeal[0].strIngredient13,
      dataMeal[0].strIngredient14,
      dataMeal[0].strIngredient15,
      dataMeal[0].strIngredient16,
      dataMeal[0].strIngredient17,
      dataMeal[0].strIngredient18,
      dataMeal[0].strIngredient19,
      dataMeal[0].strIngredient20,
    ];
  }

  if (dataMeal[0]) {
    measure = [
      dataMeal[0].strMeasure1,
      dataMeal[0].strMeasure2,
      dataMeal[0].strMeasure3,
      dataMeal[0].strMeasure4,
      dataMeal[0].strMeasure5,
      dataMeal[0].strMeasure6,
      dataMeal[0].strMeasure7,
      dataMeal[0].strMeasure8,
      dataMeal[0].strMeasure9,
      dataMeal[0].strMeasure10,
      dataMeal[0].strMeasure11,
      dataMeal[0].strMeasure12,
      dataMeal[0].strMeasure13,
      dataMeal[0].strMeasure14,
      dataMeal[0].strMeasure15,
      dataMeal[0].strMeasure16,
      dataMeal[0].strMeasure17,
      dataMeal[0].strMeasure18,
      dataMeal[0].strMeasure19,
      dataMeal[0].strMeasure20,
    ];
  }
  let number = "";
  let Measures;
  let Ingredients;

  for (let i = 1; i < 20; i++) {
    number =+ i;
    Ingredients = dataMeal[0] && dataMeal[0][`strIngredient${number}`]
    Measures = dataMeal[0] && dataMeal[0][`strMeasure${number}`]
    console.log(Ingredients);
    console.log(Measures);
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
              <div className="flex-1 flex flex-row sm:flex-col gap-10">
                <p>
                  Origine :{" "}
                  <span className="font-bold">
                    {dataMeal[0] && dataMeal[0].strArea}
                  </span>
                </p>
                <p>
                  Catégories :{" "}
                  <span className="font-bold">
                    {dataMeal[0] && dataMeal[0].strCategory}
                  </span>
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
            <p>{Measures}</p>
            <div className="grid grid-cols-auto-fit100 gap-10 max-w-4xl mx-auto mb-20">
              {dataMeal[0] &&
                ingredient.map(
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
                            {measure[`${ingredient.indexOf(el)}`]}
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
    </>
  );
};

export default Meal;
