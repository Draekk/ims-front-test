import { useEffect } from "react";
import Alert from "../components/Alert";
import useAlertUI from "../hooks/useAlertUI";

function ProductManager({
  switchModal,
  resetProduct,
  product,
  setProduct,
  productFactory,
  saveProduct,
  fetchProductByBarcode,
  fetchProductsByName,
  nameList,
  setNameList,
}) {
  const { activeAlert, setActiveAlert, alertData, setAlertData } = useAlertUI();

  useEffect(() => {
    if (product.name.length > 1) fetchProductsByName();
    else setNameList([]);
  }, [product.name]);

  function closeModal() {
    resetProduct();
    switchModal();
  }

  async function saveWithMsg() {
    const data = await saveProduct();
    data.success
      ? setAlertData({ error: false, message: data.message })
      : setAlertData({ error: true, message: data.error.cause });
    setActiveAlert(true);
  }

  return (
    <div className="z-20 flex flex-col justify-center items-center bg-[rgba(0,0,0,0.85)] rounded-lg px-[20px] py-[50px] md:max-w-[70%] w-full">
      <h1 className="text-center text-white font-black text-4xl mb-10 uppercase">
        Gestionar Producto
      </h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        action="post"
        className="grid md:grid-cols-3 gap-x-5 gap-y-7 mb-2 text-lg"
      >
        <div className="relative col-span-2">
          <label
            className="absolute text-black underline left-1"
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
            value={product.barcode}
            onChange={(e) => productFactory(e)}
            onBlur={fetchProductByBarcode}
            onKeyDown={(e) =>
              e.key === "Enter" ? fetchProductByBarcode() : null
            }
          />
        </div>
        <div className="relative col-span-3">
          <label
            className="absolute text-black underline left-1"
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
            value={product.name}
            onChange={(e) => productFactory(e)}
            onBlur={() =>
              setTimeout(() => {
                setNameList([]);
              }, 250)
            }
          />
        </div>
        {nameList.length > 0 ? (
          <div className="col-span-full max-h-[20vh] overflow-scroll">
            <table className="bg-slate-400 border-2 border-slate-600 w-full">
              <thead className="sticky top-0 bg-slate-500">
                <tr>
                  <th>NOMBRE</th>
                  <th>STOCK</th>
                  <th>PRECIO</th>
                </tr>
              </thead>
              <tbody>
                {nameList.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:cursor-pointer hover:bg-blue-500"
                    onClick={() => setProduct(p)}
                  >
                    <td>{p.name}</td>
                    <td className="text-center">{p.stock}</td>
                    <td className="text-center">{p.salePrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
        <div className="relative">
          <label
            className="absolute text-black underline left-1"
            htmlFor="stock"
          >
            Stock:
          </label>
          <input
            className="pl-1 pt-6 rounded-md w-full focus:outline-none focus:outline-cyan-800"
            type="number"
            id="stock"
            name="stock"
            autoComplete="off"
            value={product.stock}
            onChange={(e) => productFactory(e)}
          />
        </div>
        <div className="relative">
          <label
            className="absolute text-black underline left-1"
            htmlFor="costPrice"
          >
            Precio Costo:
          </label>
          <input
            className="pl-1 pt-6 rounded-md w-full focus:outline-none focus:outline-cyan-800"
            type="number"
            id="costPrice"
            name="costPrice"
            autoComplete="off"
            value={product.costPrice}
            onChange={(e) => productFactory(e)}
          />
        </div>
        <div className="relative">
          <label
            className="absolute text-black underline left-1"
            htmlFor="salePrice"
          >
            Precio Venta:
          </label>
          <input
            className="pl-1 pt-6 rounded-md w-full focus:outline-none focus:outline-cyan-800"
            type="number"
            id="salePrice"
            name="salePrice"
            autoComplete="off"
            value={product.salePrice}
            onChange={(e) => productFactory(e)}
          />
        </div>
        <button
          className="col-end-4 row-end-6 cursor-pointer bg-blue-500 disabled:bg-slate-500 disabled:cursor-not-allowed hover:bg-blue-400 py-2 mx-5 rounded-md font-black text-white"
          onClick={saveWithMsg}
          disabled={activeAlert}
          type="button"
        >
          GUARDAR
        </button>
        <button
          onClick={resetProduct}
          type="button"
          className="col-end-3 row-end-6 bg-slate-500 hover:bg-slate-400 py-2 mx-5 rounded-md font-black text-white"
        >
          LIMPIAR
        </button>
        <button
          onClick={closeModal}
          type="button"
          className="col-end-2 row-end-6 bg-slate-500 hover:bg-slate-400 py-2 mx-5 rounded-md font-black text-white"
        >
          CANCELAR
        </button>
      </form>
      {activeAlert ? (
        <Alert
          textMessage={alertData.message}
          activeAlert={activeAlert}
          error={alertData.error}
        ></Alert>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductManager;
