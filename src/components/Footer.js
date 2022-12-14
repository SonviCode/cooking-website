import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-[5%]">
      <div className="py-5 flex justify-between max-w-7xl mx-auto">
        <div>
          <p>Code by SonviCode</p>
          <p>
            API from{" "}
            <a
              href="https://www.themealdb.com/"
              className="underline underline-offset-4"
            >
              The meal DB
            </a>
          </p>
        </div>

        <div className="flex text-4xl gap-5">
          <a href="https://github.com/SonviCode">
            <i className="fa-brands fa-github hover:text-vert duration-300 ease"></i>
          </a>
          <a href="https://www.linkedin.com/in/tom-sonvico/">
            <i className="fa-brands fa-linkedin hover:text-vert duration-300 ease"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
