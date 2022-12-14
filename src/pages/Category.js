import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Category = () => {
  const location = useLocation();
  const params = useParams();

  let category = location.state;

  const [listCategory, setListCategory] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.slug}`
      )
      .then((res) => setListCategory(res.data.meals));
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="pt-20 px-[5%] max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-center w-full uppercase mb-10 tracking-[3px]">
            {params.slug}
          </h1>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <img
              className="duration-300 max-w-[450px] w-full"
              src={category.strCategoryThumb}
              alt={category.strCategory}
            />
            <div className="h-[190px] overflow-hidden text-center">
              <p className="">{category.strCategoryDescription}</p>
              {/* <button className="underline underline-offset-4 p-2">
                En savoir +
              </button> */}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase my-10">
              Les recettes disponibles dans la catégorie :{" "}
              <span className="underline underline-offset-4">{params.slug}</span>
            </h2>
            <div className="grid grid-cols-auto-fit100 gap-10 max-w-7xl mx-auto mb-20 justify-items-center">
              {listCategory &&
                listCategory.map((el) => (
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
                          {el.strMeal.length > 20
                            ? el.strMeal.slice(0, 20) + "..."
                            : el.strMeal}
                        </p>
                      </div>
                    </Link>
                  </>
                ))}{" "}
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Category;
