import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Overlay from "./Overlay";

const Navbar = () => {
  const location = useLocation();
  const [mealsData, setMealsData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [scrollHomePage, setScrollHomePage] = useState(false);
  const [toggleOverlay, setToggleOverlay] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + inputSearch
      )
      .then((res) => setMealsData(res.data.meals));
  }, [inputSearch]);

  // OVERLAY MENU RESPONSIV
  const changeOverlay = () => {
    const bodyFixed = document.querySelector("body");

    if (bodyFixed.style.position === "fixed") {
      bodyFixed.style.position = "static";
    } else {
      bodyFixed.style.position = "fixed";
    }
    setToggleOverlay(!toggleOverlay);
  };

  // NAVBAR HIDDEN DEPENDING ON THE PAGE
  let navBarSearch;
  let searchContent = (
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
  );

  if (location.pathname.includes("recherche")) {
    navBarSearch = <></>;
  } else if (location.pathname === "/" && !scrollHomePage) {
    navBarSearch = <></>;
  } else if (location.pathname === "/" && scrollHomePage) {
    navBarSearch = searchContent;
  } else {
    navBarSearch = searchContent;
  }

  window.addEventListener("scroll", () => {
    if (location.pathname === "/" && window.scrollY >= 300) {
      setScrollHomePage(true);
    } else if (location.pathname === "/" && window.scrollY < 300) {
      setScrollHomePage(false);
    }
  });

  return (
    <nav className="flex px-[5%] py-2.5 justify-between items-center fixed max-w-[100vw] w-[100vw] backdrop-blur-md z-50 gap-20 min-h-[60px]">
      <NavLink strict to="/">
        <p className="flex">
          <img src="../assets/logo.svg" alt="logo 500g" />
          500g
        </p>
      </NavLink>

      <ul className="flex gap-10 relative items-center flex-1 justify-end hidden sm:flex">
        {navBarSearch}
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

      <button className="sm:hidden absolute right-[10%] top-3">
        <img
          className="w-8 h-8 object-cover "
          src="../assets/menu.png"
          alt="icone menu"
          onClick={changeOverlay}
        />
      </button>

      <Overlay changeOverlay={changeOverlay} toggleOverlay={toggleOverlay} />
    </nav>
  );
};

export default Navbar;
