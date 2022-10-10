import React from "react";
import { Link } from "react-router-dom";

const Overlay = ({ changeOverlay, toggleOverlay }) => {
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
