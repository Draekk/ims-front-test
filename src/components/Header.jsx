import React from "react";

function Header() {
  return (
    <header className="md:h-56 h-28 flex md:items-end items-center justify-center  bg-blue-50 shadow-lg">
      <div className="flex md:items-end items-center md:mx-auto pb-1">
        <picture className="md:max-w-32 max-w-16 rounded-xl overflow-hidden">
          <img
            src="/public/img/comercial-mix-log.png"
            alt=""
            className="w-full"
          />
        </picture>
        <h1 className="uppercase font-black text-4xl px-5">Comercial Mix</h1>
      </div>
      <nav className="mx-auto grid md:grid-cols-2 md:gap-3">
        <button className="md:pt-11 md:px-4 md:text-2xl md:border-b-4 md:border-transparent md:hover:bg-gradient-to-t md:hover:from-blue-300 md:hover:transition-shadow to-transparent md:hover:border-b-blue-600 align-text-bottom">
          Productos
        </button>
        <button className="md:pt-11 md:px-4 md:text-2xl md:border-b-4 md:border-transparent md:hover:bg-gradient-to-t md:hover:from-blue-300 md:hover:transition-shadow to-transparent md:hover:border-b-blue-600 align-text-bottom">
          Ventas
        </button>
      </nav>
    </header>
  );
}

export default Header;
