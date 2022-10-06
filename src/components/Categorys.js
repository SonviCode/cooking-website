import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Categorys = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => setCategoryList(res.data.categories));
  }, []);

  return (
    <section id="category">
      <div className=" px-[5%]">
        <h2 className="underline underline-offset-4 font-bold text-3xl">
          Choisi selon la catégorie :
        </h2>

        <div className="grid grid-cols-auto-fit150 gap-10 max-w-7xl mx-auto mb-20 my-10">
          {categoryList[0] &&
            categoryList.map(
              (el) =>
                el && (
                  <Link
                    to={`/category/${el.strCategory}`}
                    state={el}
                    key={uuidv4()}
                  >
                    <div
                      id="container-card-out"
                      className=" p-5 text-center hover:bg-gray-100 ease-in duration-300 shadow-md hover:shadow-lg"
                      key={uuidv4()}
                    >
                      <div>
                        <img
                          className="duration-300"
                          src={el.strCategoryThumb}
                          alt={el.strCategory}
                        />
                      </div>
                      <p key={uuidv4()} className="font-bold w-full">
                        {el.strCategory}
                      </p>
                    </div>
                  </Link>
                )
            )}
        </div>
      </div>
    </section>
  );
};

export default Categorys;
