function CustomModal({
  title,
  description,
  noButtonText,
  yesButtonText,
  yesFunction,
  setToggleModal,
}) {
  function closeModal() {
    yesFunction();
    setToggleModal(false);
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.8)] z-10">
      <div className="text-white flex flex-col justify-center items-center bg-slate-300 rounded-lg overflow-hidden border-2 border-[rgba(0,0,0,0.5)] max-w-[400px]">
        <div className="flex text-3xl items-center bg-black w-full py-1 px-2">
          <i className="fa-solid fa-triangle-exclamation text-yellow-500"></i>
          <h1 className="uppercase font-bold ml-3">{title}</h1>
        </div>
        <p className="text-black px-3 py-5 min-w-96 text-center">
          {description}
        </p>
        <div className="flex justify-end w-full pb-4 px-3 text-xl">
          <button
            className="bg-slate-500 hover:bg-slate-400 text-white uppercase font-black py-2 px-4 min-w-32 rounded-xl shadow-sm ml-5"
            onClick={() => setToggleModal(false)}
          >
            {noButtonText}
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-400 text-white uppercase font-black py-2 px-4 min-w-32 rounded-xl shadow-sm ml-5"
            onClick={closeModal}
          >
            {yesButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
