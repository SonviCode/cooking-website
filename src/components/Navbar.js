import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex px-[5%] py-5 justify-between fixed w-full backdrop-blur-md">
      <Link to={"/"}>
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
      </Link>

      <ul className="flex gap-20">
        <li>
          <a href="#plats">Plats</a>
        </li>
        <li>
          <a href="#recette">Recette</a>
        </li>
        <li>
          <a href="#categories">Catégories</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;