import { useEffect, useMemo, useState } from "react";
import useProducts from "./useProducts";

/**
 * Custom hook para gestionar las ventas de productos.
 *
 * Este hook maneja los detalles de la venta, incluyendo la selección de productos, la actualización del carrito de compras,
 * y la creación de la venta final. Permite manejar productos a través de código de barras o nombre, y mantiene el estado de los productos y cantidades.
 *
 * @returns {Object} El hook devuelve un objeto con los siguientes estados, funciones y configuraciones:
 *
 * @returns {Object} formInput - Objeto que contiene los campos de entrada del formulario (`barcode` y `name`).
 * @returns {Function} formInputFactory - Función que actualiza el estado de `formInput` cuando el usuario ingresa datos en los campos.
 * @returns {Function} resetDetails - Función para resetear los detalles de la venta.
 * @returns {Object} itemSelection - Objeto que contiene los detalles del producto actualmente seleccionado.
 * @returns {Function} setItemSelection - Función para actualizar el producto seleccionado.
 * @returns {Function} resetSelectDetail - Función para resetear la selección del producto.
 * @returns {Function} getItemByBarcode - Función para buscar un producto por su código de barras y actualizar el producto de la venta.
 * @returns {Function} getItemsByName - Función para buscar productos por nombre y mostrar coincidencias.
 * @returns {Object} saleProduct - Objeto que contiene los detalles del producto en venta (producto, cantidad y total).
 * @returns {Function} setNewDetailQuantity - Función para actualizar la cantidad de un producto en el carrito.
 * @returns {Array} saleDetails - Lista de productos agregados a la venta, con detalles de cantidad y precio total.
 * @returns {Array} matchingProducts - Lista de productos que coinciden con el nombre ingresado por el usuario.
 * @returns {Function} selectProduct - Función para seleccionar un producto del listado de coincidencias.
 * @returns {number} saleTotal - El total de la venta calculado sumando el total de cada producto en `saleDetails`.
 * @returns {Function} deleteItem - Función para eliminar un producto de los detalles de la venta.
 * @returns {Function} createSale - Función que crea una venta enviando los datos al backend.
 * @returns {boolean} isCash - Estado que indica si la venta es en efectivo o no.
 * @returns {Function} toggleIsCash - Función para alternar el estado de pago en efectivo.
 *
 * @example
 * const { saleDetails, createSale, toggleIsCash } = useSales();
 *
 * // Crear una venta
 * createSale();
 *
 * // Alternar si la venta es en efectivo
 * toggleIsCash();
 */
function useSales() {
  const API = "http://localhost:3000/api/sale";
  const { products } = useProducts();
  const initialSaleProduct = {
    product: {
      id: 0,
      barcode: "",
      name: "",
      stock: 0,
      costPrice: 0,
      salePrice: 0,
    },
    quantity: 0,
    total: 0,
  };

  /**
   * Recupera los detalles de la venta desde `localStorage`, si están disponibles.
   * Si no hay detalles almacenados, devuelve un array vacío.
   *
   * @returns {Array} Los detalles de la venta, recuperados de `localStorage`.
   */
  function initialSaleDetails() {
    const localStorageDetail = localStorage.getItem("detail");
    return localStorageDetail ? JSON.parse(localStorageDetail) : [];
  }

  //States

  const [formInput, setFormInput] = useState({
    barcode: "",
    name: "",
  });
  const [saleProduct, setSaleProduct] = useState(initialSaleProduct);
  const [saleDetails, setSaleDetails] = useState(initialSaleDetails);
  const [itemSelection, setItemSelection] = useState({
    ...initialSaleProduct,
  });
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [isCash, setIsCash] = useState(true);

  //----------------------------------------------------------Exportable functions

  //---------------------------UI interaction

  /**
   * Actualiza el estado de `formInput` cuando el usuario ingresa datos en los campos de formulario (`barcode` o `name`).
   *
   * @param {Object} e - El evento del formulario.
   * @param {string} e.target.name - El nombre del campo (`barcode` o `name`).
   * @param {string} e.target.value - El valor ingresado por el usuario.
   */
  function formInputFactory(e) {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  /**
   * Resetea los detalles de la venta, eliminando todos los productos del carrito.
   */
  function resetDetails() {
    setSaleDetails([]);
    resetSelectDetail();
  }

  /**
   * Selecciona un producto y lo agrega a los detalles de la venta con una cantidad de 1 y un total igual al precio de venta.
   *
   * @param {Object} item - El producto seleccionado.
   */
  function selectProduct(item) {
    setSaleProduct({
      product: { ...item },
      quantity: 1,
      total: item.salePrice,
    });
    setMatchingProducts([]);
  }

  /**
   * Resetea el producto seleccionado actualmente en el detalle de la venta.
   */
  function resetSelectDetail() {
    setItemSelection({
      ...initialSaleProduct,
    });
  }

  /**
   * Elimina un producto del carrito de compras.
   */
  function deleteItem() {
    const updatedDetail = saleDetails.filter(
      (p) => p.product.id !== itemSelection.product.id
    );
    setSaleDetails(updatedDetail);
    resetSelectDetail();
  }

  /**
   * Alterna el estado de pago en efectivo.
   */
  function toggleIsCash() {
    setIsCash(!isCash);
  }

  //---------------------------Logic

  /**
   * Busca un producto por su código de barras y lo agrega a los detalles de la venta si se encuentra.
   */
  function getItemByBarcode() {
    if (formInput.barcode !== "") {
      const item = products.find(
        (p) => p.barcode === formInput.barcode.trim().toLowerCase()
      );
      if (item) {
        setSaleProduct({
          ...saleProduct,
          product: { ...item },
          quantity: 1,
          total: item.salePrice,
        });
      } else {
        console.error("Error");
      }
    }
  }

  /**
   * Busca productos por nombre y actualiza el listado de productos coincidentes.
   */
  function getItemsByName() {
    const name = formInput.name.trim().toLowerCase();
    if (name.length > 1) {
      const updatedMatch = products.filter((p) => p.name.includes(name));
      setMatchingProducts(updatedMatch);
    } else setMatchingProducts([]);
  }

  /**
   * Agrega el producto actual al carrito de ventas o actualiza la cantidad de un producto si ya está en el carrito.
   */
  function addToDetail() {
    const i = saleDetails.findIndex(
      (p) => p.product.barcode === saleProduct.product.barcode
    );
    i > -1
      ? updateTotalPerItem(i, saleProduct.quantity)
      : setSaleDetails([...saleDetails, saleProduct]);
    setSaleProduct(initialSaleProduct);
  }

  /**
   * Actualiza la cantidad de un producto en el carrito de compras.
   *
   * @param {Object} e - El evento del formulario para actualizar la cantidad.
   * @param {number} e.target.value - El nuevo valor de la cantidad.
   */
  function setNewDetailQuantity(e) {
    let { value } = e.target;
    if (value !== "" && +value > 0) {
      setSaleProduct({
        product: itemSelection.product,
        quantity: +value - itemSelection.quantity,
        total: itemSelection.product.salePrice,
      });
    } else {
      e.target.value = "";
    }
    resetSelectDetail();
  }

  useEffect(() => {
    if (saleProduct.product.id !== 0) {
      addToDetail();
      resetFormInput();
    }
  }, [saleProduct]);

  useEffect(() => {
    localStorage.setItem("detail", JSON.stringify(saleDetails));
  }, [addToDetail]);

  const saleTotal = useMemo(
    () => saleDetails.reduce((t, i) => (t += i.total), 0),
    [saleDetails]
  );

  /**
   * Crea una venta enviando los detalles de la venta al backend.
   *
   * @returns {Object} Los datos de la respuesta de la API, incluyendo si la venta fue exitosa.
   */
  async function createSale() {
    const sale = {
      products: saleDetails.map((p) => {
        return {
          id: p.product.id,
          quantity: p.quantity,
        };
      }),
      isCash,
    };

    const res = await fetch(`${API}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });

    const data = await res.json();

    console.log(data);

    if (data.success) {
      resetDetails();
      setIsCash(true);
    }
    return data;
  }

  //--------------------------------------------------------------Non exportable functions

  /**
   * Actualiza el total de un producto en el carrito según la nueva cantidad.
   *
   * @param {number} index - El índice del producto en el carrito.
   * @param {number} quantity - La cantidad actualizada del producto.
   */
  function updateTotalPerItem(index, quantity) {
    const updatedDetails = [...saleDetails];
    const item = updatedDetails[index];
    item.quantity += quantity;
    item.total = item.quantity * item.product.salePrice;
    setSaleDetails(updatedDetails);
  }

  /**
   * Resetea los campos de entrada del formulario.
   */
  function resetFormInput() {
    setFormInput({ barcode: "", name: "", quantity: 0 });
  }

  return {
    formInput,
    formInputFactory,
    resetDetails,
    itemSelection,
    setItemSelection,
    resetSelectDetail,
    getItemByBarcode,
    getItemsByName,
    saleProduct,
    setNewDetailQuantity,
    saleDetails,
    matchingProducts,
    selectProduct,
    saleTotal,
    deleteItem,
    createSale,
    isCash,
    toggleIsCash,
  };
}

export default useSales;
