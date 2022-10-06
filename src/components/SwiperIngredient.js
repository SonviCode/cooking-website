import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, A11y } from "swiper";

const SwiperIngredient = () => {
  const [ingredientList, setIngredientList] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
      .then((res) => setIngredientList(res.data.meals));
  }, []);

  let numberRandom = Math.floor(Math.random() * 559);

  console.log(numberRandom);

  return (
    <section>
      <div className="px-[5%] pt-20 max-w-7xl mx-auto mb-20">
        <h2 className="text-xl uppercase">Voici quelques ingrédients :</h2>

        <div className="flex mb-20 ">
          <Swiper
            modules={[Navigation, A11y]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1044: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {ingredientList &&
              ingredientList.slice(numberRandom, numberRandom + 40).map(
                (el) =>
                  el && (
                    <SwiperSlide
                      className="max-w-[300px]  ease-in duration-300 border-2 border-gray-100 hover:bg-gray-100 bg-white rounded-[40px] cursor-pointer"
                      key={uuidv4()}
                    >
                      <div
                        id="container-card-in"
                        className="flex flex-col  h-[300px] justify-center items-center text-center p-5 relative "
                      >
                        <Link
                          to={`/ingredient/${el.strIngredient
                            .replace(/\s+/g, "-")
                            .trim()}`}
                          state={el.strIngredient}
                          key={uuidv4()}
                        >
                          <img
                            className="w-[150px] inline"
                            src={`https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png`}
                            alt={`ingredient ${el.strIngredient}`}
                            key={uuidv4()}
                          />

                          <p
                            key={uuidv4()}
                            className="font-bold text-2xl"
                          >
                            {el.strIngredient}
                          </p>
                          <p key={uuidv4()} className="truncate w-[150px] text-center">
                            {el.strDescription}
                          </p>
                        </Link>
                      </div>
                    </SwiperSlide>
                  )
              )}
          </Swiper>
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-extrabold uppercase">
            Pour voir tout les ingrédients disponibles :
          </h2>
          <Link
            to="/ingredients"
            className="p-2.5 rounded-md border-2 border-vert bg-vert hover:bg-white ease duration-200"
          >
            Clique ici !
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SwiperIngredient;
