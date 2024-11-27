import { useState } from "react";
import formatCurrency from "../helpers/formatCurrency";
import CustomModal from "../components/CustomModal";

function PTable({
  products,
  setProducts,
  setProduct,
  switchModal,
  deleteProduct,
}) {
  const [order, setOrder] = useState(true);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [productId, setProductId] = useState(0);

  function selectProduct(e, row) {
    if (e.target.id !== "action") {
      setProduct(row);
      switchModal();
    }
  }

  function showDeleteModal(id) {
    setDeleteConfirmationModal(true);
    setProductId(id);
  }

  function sortProducts(e, order) {
    const { id } = e.target;
    if (order) {
      const sortedProducts = products.sort((a, b) => a[id] - b[id]);
      setProducts(sortedProducts);
    } else {
      const sortedProducts = products.sort((a, b) => b[id] - a[id]);
      setProducts(sortedProducts);
    }
    setOrder(!order);
  }

  return (
    <div className="bg-gray-300 md:w-[1200px] mx-auto w-fit rounded-md overflow-scroll h-[70vh] shadow-lg text-xl">
      {deleteConfirmationModal ? (
        <CustomModal
          title={"aviso"}
          description={"¿Desea eliminar este producto?"}
          noButtonText={"no"}
          yesButtonText={"si"}
          yesFunction={() => deleteProduct(productId)}
          setToggleModal={setDeleteConfirmationModal}
        ></CustomModal>
      ) : (
        <></>
      )}
      <table className="w-full">
        <thead className="sticky top-0 bg-slate-900 text-white uppercase shadow-md">
          <tr>
            <th className="w-56">Código</th>
            <th>Nombre</th>
            <th
              id="stock"
              title="Ordenar"
              onClick={(e) => sortProducts(e, order)}
              className="cursor-pointer hover:bg-gray-700 w-44"
            >
              Stock
            </th>
            <th
              id="costPrice"
              title="Ordenar"
              onClick={(e) => sortProducts(e, order)}
              className="cursor-pointer hover:bg-gray-700 w-44"
            >
              Precio Costo
            </th>

            <th
              id="salePrice"
              title="Ordenar"
              onClick={(e) => sortProducts(e, order)}
              className="cursor-pointer hover:bg-gray-700 w-44"
            >
              Precio Venta
            </th>
            <th className="w-24">acción</th>
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((p) => (
              <tr
                key={p.id}
                className="cursor-pointer hover:bg-blue-400"
                onClick={(e) => selectProduct(e, p)}
              >
                <td>{p.barcode}</td>
                <td title={p.name} className="capitalize text-nowrap">
                  {p.name}
                </td>
                <td className="text-center">{p.stock}</td>
                <td className="text-center">{formatCurrency(p.costPrice)}</td>
                <td className="text-center">{formatCurrency(p.salePrice)}</td>
                <td className="px-4">
                  <button
                    id="action"
                    title={`Eliminar ${p.name}`}
                    className="text-center bg-red-700 hover:bg-red-600 hover:shadow-custom-red font-black text-white w-full rounded-md"
                    onClick={() => showDeleteModal(p.id)}
                  >
                    x
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PTable;
