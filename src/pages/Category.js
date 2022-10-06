import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Navbar from "../components/Navbar";

const Category = () => {
  const location = useLocation();
  const params = useParams();

  let category = location.state;
  console.log(category);

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
      <section>
        <div className="pt-20 px-[5%]">
          <h1 className="text-3xl font-bold text-center w-full uppercase mb-10">
            recettes disponibles dans la catégorie : {params.slug}
          </h1>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <img
              className="duration-300 max-w-[450px] w-full"
              src={category.strCategoryThumb}
              alt={category.strCategory}
            />
            <div className="h-[190px] overflow-hidden">
              <p className="text-center ">
                {category.strCategoryDescription}
              </p>
              <button>En savoir +</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
