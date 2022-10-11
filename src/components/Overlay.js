import React from "react";
import { Link, useLocation } from "react-router-dom";

const Overlay = ({
  changeOverlay,
  toggleOverlay,
  inputSearch,
  setInputSearch,
}) => {
  const location = useLocation();

  return (
    <>
      {toggleOverlay ? (
        <div
          className={`absolute h-screen w-full backdrop-blur-3xl left-0 top-0 -z-10 bg-ov`}
        >
          <div
            className={`absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 p-10 bg-white rounded-lg w-[70%] max-w-[500px]`}
          >
            <ul className="flex flex-col items-center gap-5 text-xl w-full">
              {location.pathname.includes("recherche") ? (
                <></>
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

                    {inputSearch.length > 0 ? (
                      <Link
                        to={`/recherche/${inputSearch}`}
                        onClick={changeOverlay}
                        className=" p-1 rounded-md bg-vert"
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </Link>
                    ) : (
                      <button className=" p-1 rounded-md bg-gray-100">
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    )}
                  </div>
                </li>
              )}
              <li>
                <Link to="/" onClick={changeOverlay} className="flex gap-1">
                  <img src="../assets/logo.svg" alt="logo 500g" />
                  Accueil
                </Link>
              </li>

              <li>
                <Link to="/ingredients" onClick={changeOverlay}>
                  <i className="fa-solid fa-wine-glass-empty"></i> Ingrédients
                </Link>
              </li>
              <li>
                <Link to="/random" onClick={changeOverlay}>
                  <i className="fa-solid fa-shuffle"></i> Random
                </Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/tom-sonvico/"
                  target="blank"
                >
                  <i className="fa-brands fa-linkedin"></i> Linkedin
                </a>
              </li>
              <li>
                <a href="https://github.com/SonviCode" target="blank">
                  <i className="fa-brands fa-github"></i> Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Overlay;
