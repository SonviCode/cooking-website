import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Areas = () => {
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
      .then((res) => setAreaList(res.data.meals));
  }, []);

    return (
        <section id="area">
      <div className=" px-[5%]">
        <h2 className="underline underline-offset-4 font-bold text-3xl">
          Choisi selon l'origine :
        </h2>

        <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto mb-20 my-10">
          {areaList[0] &&
            areaList.map(
              (el) =>
                el && (
                  <Link
                    to={`/area/${el.strArea}`}
                    state={el}
                    key={uuidv4()}
                  >
                    <div
                      id="container-card-out"
                      className=" p-5 text-center hover:bg-gray-100 ease-in duration-300 shadow-md hover:shadow-lg"
                      key={uuidv4()}
                    >
                      {/* <div>
                        <img
                          className="duration-300"
                          src={el.strareaThumb}
                          alt={el.strarea}
                        />
                      </div> */}
                      <p key={uuidv4()} className="font-bold w-full">
                        {el.strArea}
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

export default Areas;