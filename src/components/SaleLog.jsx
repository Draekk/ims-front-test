import React from "react";
import { dateFormatter } from "../helpers/dateFormatter.js";
import useSaleLogs from "../hooks/useSaleLogs";

function SaleLog() {
  const {
    sales,
    dateRange,
    searchModal,
    toggleModal,
    dateFactory,
    filterSales,
    resetSales,
    deleteSale,
  } = useSaleLogs();

  return (
    <div className="md:max-w-[1200px] md:mx-auto w-full md:mt-3 bg-slate-200 h-[80%] p-2 flex flex-col justify-between items-center rounded-md">
      {!searchModal ? (
        <div className="w-full flex justify-between">
          <button
            className="bg-blue-500 font-black text-white rounded-lg py-4 w-36 hover:bg-blue-400"
            onClick={toggleModal}
          >
            BUSCAR
          </button>
          <button
            className="bg-teal-400 font-black text-white rounded-lg py-4 w-36 hover:bg-teal-300"
            onClick={resetSales}
          >
            VER TODAS
          </button>
        </div>
      ) : (
        <div className="p-5 flex justify-between items-end w-full">
          <div className="flex justify-between items-end w-[500px]">
            <div className="flex flex-col justify-center">
              <label className="underline" htmlFor="initDate">
                Desde:
              </label>
              <input
                className="py-2 px-1 rounded-lg text-xl"
                type="date"
                name="initDate"
                id="initDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={(e) => dateFactory(e)}
              />
            </div>
            <div className="flex flex-col justify-center">
              <label className="underline" htmlFor="finalDate">
                Hasta:
              </label>
              <input
                className="py-2 px-1 rounded-lg text-xl"
                type="date"
                name="finalDate"
                id="finalDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                onChange={(e) => dateFactory(e)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-400 py-4 px-6 text-white font-black rounded-lg"
              onClick={() => {
                filterSales();
                toggleModal();
              }}
            >
              BUSCAR
            </button>
          </div>
          <button
            className="bg-red-500 hover:bg-red-400 py-4 px-6 text-white font-black rounded-lg"
            onClick={toggleModal}
          >
            VOLVER
          </button>
        </div>
      )}
      <div className="w-full h-full m-2 bg-gray-300 shadow-inner shadow-gray-400 rounded-md overflow-scroll">
        <table className="w-full text-xl">
          <thead className="sticky top-0 bg-slate-900 text-white uppercase shadow-md">
            <tr>
              <th className="w-52">N° VENTA</th>
              <th className="w-52">ITEMS</th>
              <th className="w-52">TOTAL</th>
              <th className="w-52">METODO</th>
              <th className="w-52">FECHA</th>
              <th className="w-16">ACCION</th>
            </tr>
          </thead>
          <tbody>
            {sales ? (
              <>
                {sales.length > 0 ? (
                  <>
                    {sales.map((s) => (
                      <tr key={s.id} className="hover:bg-blue-400">
                        <td className="min-w-12 pl-1">{s.id}</td>
                        <td>
                          <select
                            className="w-full bg-transparent shadow-inner shadow-gray-500"
                            name="items"
                            id="items"
                            defaultValue="default"
                          >
                            <option className="text-center" value="default">
                              {s.Products.length}
                            </option>
                            {s.Products.map((p) => (
                              <option
                                key={p.id}
                                className="capitalize"
                                value={p.name}
                                disabled
                              >
                                {p.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="text-center">{s.total}</td>
                        <td className="text-center">
                          {s.isCash ? <>Efectivo</> : <>Tarjeta</>}
                        </td>
                        <td className="text-center">
                          {dateFormatter(s.createdAt)}
                        </td>
                        <td className="px-2">
                          <button
                            className="text-center bg-red-700 hover:bg-red-600 hover:shadow-custom-red font-black text-white w-full rounded-md"
                            onClick={() => deleteSale(s.id)}
                          >
                            X
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SaleLog;
