import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mealsData, setMealsData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const location = useLocation();
  console.log(location.pathname.includes("recherche"));

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputSearch
      )
      .then((res) => setMealsData(res.data.meals));
  }, [inputSearch]);

  return (
    <nav className="flex px-[5%] py-2.5 justify-between items-center fixed max-w-[100vw] w-[100vw] backdrop-blur-md z-50 gap-20">
      <NavLink
        strict
        to="/"
      >
        <p className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-chef-hat"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 7.723l0 7.126h-12v-7.126a4.002 4.002 0 1 1 2.092 -7.723a3.999 3.999 0 0 1 3.908 -3.151z"></path>
            <path d="M6.161 17.009l11.839 -.009"></path>
          </svg>
          500G
        </p>
      </NavLink>

      <ul className="flex gap-10 relative items-center flex-1 justify-end">
        {location.pathname.includes("recherche") ? (
          ""
        ) : (
          <li className="w-full">
            <div className="bg-white rounded-md p-1 shadow-md  relative  flex justify-between ">
              <input
                className=" w-full outline-none truncate"
                type="text"
                placeholder="Tapez le nom d'une recette (en anglais)"
                onChange={(e) => setInputSearch(e.target.value)}
                required
                autoComplete="off"
              />
              <NavLink
                to={`/recherche/${inputSearch}`}
                className=" p-1 rounded-md bg-vert"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </NavLink>
            </div>
          </li>
        )}
        <li>
          <NavLink
            style={({ isActive }) => {
              return isActive
                ? { color: "rgb(132 204 22)" }
                : { color: "black" };
            }}
            to={"/ingredients"}
          >
            Ingrédients
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => {
              return isActive
                ? { color: "rgb(132 204 22)" }
                : { color: "black" };
            }}
            to={"/random"}
          >
            Random
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
