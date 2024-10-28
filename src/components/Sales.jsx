import formatCurrency from "../helpers/formatCurrency";
import useSales from "../hooks/useSales";

function Sales() {
  const {
    formInput,
    formInputFactory,
    resetDetails,
    itemSelection,
    setItemSelection,
    getItemByBarcode,
    getItemsByName,
    saleDetails,
    matchingProducts,
    selectProduct,
  } = useSales();

  return (
    <div className="md:max-w-[1200px] md:mx-auto w-full md:mt-3 bg-slate-200 h-[80%] p-2 flex flex-col justify-between items-center rounded-md">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:flex md:flex-row flex-col md:justify-between w-full text-2xl"
      >
        <div className="relative md:w-[35%] md:mb-0 mb-2">
          <label
            className="absolute text-black underline left-1 text-lg"
            htmlFor="barcode"
          >
            Código:
          </label>
          <input
            className="pl-1 pt-6 rounded-md w-full focus:outline-none focus:outline-cyan-800"
            type="text"
            id="barcode"
            name="barcode"
            autoComplete="off"
            value={formInput.barcode}
            onChange={(e) => formInputFactory(e)}
            onBlur={getItemByBarcode}
            onKeyDown={(e) => (e.key === "Enter" ? getItemByBarcode() : null)}
          />
        </div>
        <div className="relative w-full md:w-[63%]">
          <label
            className="absolute text-black underline left-1 text-lg"
            htmlFor="name"
          >
            Nombre:
          </label>
          <input
            className="pl-1 pt-6 rounded-md w-full focus:outline-none focus:outline-cyan-800"
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            value={formInput.name}
            onChange={(e) => {
              formInputFactory(e);
              getItemsByName();
            }}
          />
          {matchingProducts.length > 0 ? (
            <div className="w-full bg-white absolute z-20 shadow-md shadow-gray-500">
              <table className="w-full">
                <tbody>
                  {matchingProducts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-blue-400 cursor-pointer"
                      onClick={() => selectProduct(p)}
                    >
                      <td>{p.name}</td>
                      <td className="w-32">{formatCurrency(p.salePrice)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
      <div className="w-full h-full m-2 bg-gray-300 rounded-md overflow-scroll">
        <table className="w-full text-xl">
          <thead className="sticky top-0 bg-black text-white uppercase shadow-md">
            <tr>
              <th className="w-56">CÓDIGO</th>
              <th>NOMBRE</th>
              <th className="w-44">CANTIDAD</th>
              <th className="w-44">PRECIO</th>
            </tr>
          </thead>
          <tbody>
            {saleDetails.length > 0 ? (
              <>
                {saleDetails.map((s, i) => (
                  <tr
                    key={s.product.id}
                    className={`hover:bg-blue-400 cursor-pointer ${
                      itemSelection.product.id === s.product.id
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                  >
                    <td>{s.product.barcode}</td>
                    <td className="capitalize">{s.product.name}</td>
                    <td className="text-center">
                      <input
                        className="w-full text-center bg-transparent disabled:outline-none placeholder:text-black"
                        name="quantity"
                        type="number"
                        disabled={itemSelection.product.id !== s.product.id}
                        placeholder={s.quantity}
                        onChange={(e) => formInputFactory(e)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && s.edit
                            ? console.log("Presionando Enter...")
                            : null
                        }
                        onDoubleClick={() => setItemSelection(s)}
                      />
                    </td>
                    <td className="text-center">{formatCurrency(s.total)}</td>
                  </tr>
                ))}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-3 w-full">
        <div className="col-span-2 grid grid-rows-2 grid-cols-3">
          <button
            className="bg-blue-300 hover:bg-blue-200 rounded-md mx-auto w-[70%] font-semibold uppercase shadow-[rgba(255,255,255,0.5)] shadow-inner"
            onClick={resetDetails}
          >
            LIMPIAR
          </button>
          <button
            className="bg-red-300 hover:bg-red-200 rounded-md mx-auto w-[70%] font-semibold uppercase shadow-[rgba(255,255,255,0.5)] shadow-inner"
            onClick={() => console.log("Eliminando item...")}
          >
            ELIMINAR ITEM
          </button>
          <button className="row-span-2 bg-green-300 hover:bg-green-200 rounded-md mx-auto w-[70%] font-semibold uppercase shadow-[rgba(255,255,255,0.5)] shadow-inner">
            button
          </button>
          <button>button</button>
          <button>button</button>
        </div>
        <div className="relative">
          <label
            className="absolute text-black underline right-1"
            htmlFor="price"
          >
            Total Venta:
          </label>
          <input
            className="pl-1 pt-6 rounded-lg w-full focus:outline-none bg-transparent text-6xl text-right font-semibold"
            type="text"
            id="price"
            name="price"
            autoComplete="off"
            readOnly
            value={formatCurrency(9000)}
          />
        </div>
      </div>
    </div>
  );
}

export default Sales;
