import React from "react";

function Header({ switches, toggleSwitches }) {
  return (
    <header className="md:h-36 h-28 flex md:items-end items-center justify-center  bg-slate-900 shadow-lg text-white">
      <div className="flex md:items-end items-center md:mx-auto pb-1">
        <picture className="md:max-w-32 max-w-16 rounded-xl overflow-hidden">
          <img src="/img/comercial-mix-log.png" alt="" className="w-full" />
        </picture>
        <h1 className="uppercase font-black text-4xl px-5">Comercial Mix</h1>
      </div>
      <nav className="mx-auto grid md:grid-cols-3 md:gap-3">
        <button
          disabled={switches.s1}
          onClick={() => toggleSwitches("s1")}
          className="md:pt-11 md:px-4 md:max-w-[150px] md:text-2xl md:border-b-4 md:border-transparent md:hover:bg-gradient-to-t md:hover:from-blue-300 md:hover:transition-shadow to-transparent md:hover:border-b-blue-600 align-text-bottom disabled:border-b-blue-600"
        >
          Productos
        </button>
        <button
          disabled={switches.s2}
          onClick={() => toggleSwitches("s2")}
          className="md:pt-11 md:px-4 md:max-w-[150px] md:text-2xl md:border-b-4 md:border-transparent md:hover:bg-gradient-to-t md:hover:from-blue-300 md:hover:transition-shadow to-transparent md:hover:border-b-blue-600 align-text-bottom disabled:border-b-blue-600"
        >
          Ventas
        </button>
        <button
          disabled={switches.s3}
          onClick={() => toggleSwitches("s3")}
          className="md:pt-11 md:px-4 md:max-w-[150px] md:text-2xl md:border-b-4 md:border-transparent md:hover:bg-gradient-to-t md:hover:from-blue-300 md:hover:transition-shadow to-transparent md:hover:border-b-blue-600 align-text-bottom disabled:border-b-blue-600"
        >
          Registro de ventas
        </button>
      </nav>
    </header>
  );
}

export default Header;
