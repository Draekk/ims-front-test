import React, { useState } from "react";
import formatCurrency from "../helpers/formatCurrency";

function Sales({
  item,
  sale,
  addToSale,
  itemFactory,
  clearSale,
  saleTotal,
  searchList,
  searchProduct,
  resetSearchList,
  setEditItem,
  editQuantity,
  itemSaleFactory,
}) {
  const [cantModal, setCantModal] = useState(false);

  return (
    <div className="md:max-w-[90%] md:mx-auto w-full md:mt-3 bg-slate-200 h-[80%] p-2 flex flex-col justify-between items-center rounded-md">
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
            value={item.barcode}
            onChange={(e) => itemFactory(e)}
            onBlur={() => (item.barcode.trim() !== "" ? addToSale() : null)}
            onKeyDown={(e) =>
              item.barcode.trim() !== "" && e.key === "Enter"
                ? addToSale()
                : null
            }
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
            onChange={(e) => searchProduct(e)}
            onBlur={(e) =>
              setTimeout(() => {
                resetSearchList();
                e.target.value = "";
              }, 300)
            }
          />
          {searchList.length > 0 ? (
            <div className="w-full bg-white absolute z-20 shadow-md shadow-gray-500">
              <table className="w-full">
                <tbody>
                  {searchList.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-blue-400 cursor-pointer"
                      onClick={() => addToSale(p)}
                    >
                      <td>{p.name}</td>
                      <td className="w-32">{formatCurrency(p.price)}</td>
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
              <th className="w-72">CÓDIGO</th>
              <th>NOMBRE</th>
              <th className="w-44">CANTIDAD</th>
              <th className="w-44">PRECIO</th>
            </tr>
          </thead>
          <tbody>
            {sale.length > 0 ? (
              <>
                {sale.map((s) => (
                  <tr key={s.id}>
                    <td className="capitalize">{s.barcode}</td>
                    <td className="capitalize">{s.name}</td>
                    <td
                      className="text-center"
                      onDoubleClick={() =>
                        !s.edit ? setEditItem(s.barcode) : null
                      }
                      // onKeyDown={(e) =>
                      //   !s.edit && e.key === "Enter"
                      //     ? setEditItem(s.barcode)
                      //     : null
                      // }
                    >
                      <input
                        className="w-full text-center bg-transparent disabled:outline-none"
                        id="quantity"
                        type="number"
                        value={s.quantity}
                        readOnly={!s.edit}
                        onChange={(e) => itemSaleFactory(e, s.barcode)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && s.edit ? editQuantity() : null
                        }
                        onBlur={() => (s.edit ? editQuantity() : null)}
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
            className="bg-teal-300 hover:bg-teal-200 rounded-md mx-auto w-[70%] font-semibold uppercase shadow-[rgba(255,255,255,0.5)] shadow-inner"
            onClick={clearSale}
          >
            LIMPIAR
          </button>
          <button>button</button>
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
            value={formatCurrency(saleTotal)}
          />
        </div>
      </div>
    </div>
  );
}

export default Sales;
