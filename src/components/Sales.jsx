import React from "react";
import formatCurrency from "../helpers/formatCurrency";

function Sales({ product, productsToSale, prepareSaleList, productFactory }) {
  return (
    <div className="md:max-w-[90%] md:mx-auto w-full md:mt-3 bg-slate-200 h-[80%] p-2 flex flex-col justify-between items-center rounded-md">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="md:flex md:flex-row flex-col md:justify-between w-full"
      >
        <div className="relative md:w-[35%] md:mb-0 mb-2">
          <label
            className="absolute text-black underline left-1"
            htmlFor="barcode"
          >
            Código:
          </label>
          <input
            className="pl-1 pt-6 rounded-lg w-full focus:outline-none focus:outline-cyan-800"
            type="text"
            id="barcode"
            name="barcode"
            autoComplete="off"
            value={product.barcode}
            onChange={(e) => productFactory(e)}
            onBlur={prepareSaleList}
          />
        </div>
        <div className="relative w-full md:w-[63%]">
          <label
            className="absolute text-black underline left-1"
            htmlFor="name"
          >
            Nombre:
          </label>
          <input
            className="pl-1 pt-6 rounded-lg w-full focus:outline-none focus:outline-cyan-800"
            type="text"
            id="name"
            name="name"
            autoComplete="off"
          />
        </div>
      </form>
      <div className="w-full h-full m-2 bg-slate-500 rounded-md overflow-scroll">
        <table className="w-full">
          <thead className="sticky top-0 bg-black text-white uppercase shadow-md">
            <tr>
              <th>NOMBRE</th>
              <th>CANTIDAD</th>
              <th>PRECIO</th>
            </tr>
          </thead>
          <tbody>
            {productsToSale ? (
              <>
                {productsToSale.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.quantity}</td>
                    <td>{s.total}</td>
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
          <button>button</button>
          <button>button</button>
          <button>button</button>
          <button>button</button>
          <button>button</button>
          <button>button</button>
        </div>
        <div className="relative">
          <label
            className="absolute text-black underline right-1"
            htmlFor="salePrice"
          >
            Total Venta:
          </label>
          <input
            className="pl-1 pt-6 rounded-lg w-full focus:outline-none bg-transparent text-6xl text-right font-semibold"
            type="text"
            id="salePrice"
            name="salePrice"
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
