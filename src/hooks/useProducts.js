import { useEffect, useState } from "react";
import useFetchProducts from "./useFetchProducts";

/**
 * Custom hook para gestionar los productos en una tienda.
 *
 * Este hook facilita la manipulación de productos, permitiendo obtener, agregar, actualizar, eliminar y buscar productos,
 * así como gestionar el estado de un producto específico y su información en un formulario.
 *
 * @returns {Object} El hook devuelve un objeto con los siguientes estados, funciones y configuraciones:
 *
 * @returns {Array} products - Lista de todos los productos.
 * @returns {Function} setProducts - Función para actualizar la lista de productos.
 * @returns {Object} product - Objeto que representa el producto actual, con su información (id, barcode, name, stock, costPrice, salePrice).
 * @returns {Function} setProduct - Función para actualizar el producto actual.
 * @returns {Array} nameList - Lista de nombres de productos que coinciden con la búsqueda por nombre.
 * @returns {Function} setNameList - Función para actualizar la lista de nombres.
 * @returns {boolean} activeModal - Estado que indica si el modal está activo o no.
 * @returns {Function} productFactory - Función que maneja los cambios en los campos del formulario de producto.
 * @returns {Function} saveProduct - Función para guardar un producto (agregar o actualizar).
 * @returns {Function} deleteProduct - Función para eliminar un producto por su id.
 * @returns {Function} resetProduct - Función para resetear el estado del producto a sus valores iniciales.
 * @returns {Function} fetchProductByBarcode - Función para buscar un producto por su código de barras.
 * @returns {Function} fetchProductsByName - Función para buscar productos por su nombre.
 * @returns {Function} switchModal - Función para alternar el estado de visibilidad del modal.
 *
 * @example
 * const { products, saveProduct, deleteProduct, fetchProductsByName } = useProducts();
 *
 * // Agregar un producto
 * saveProduct();
 *
 * // Eliminar un producto
 * deleteProduct(product.id);
 *
 * // Buscar productos por nombre
 * fetchProductsByName();
 */
export default function useProducts() {
  const [product, setProduct] = useState({
    id: 0,
    barcode: "",
    name: "",
    stock: 0,
    costPrice: 0,
    salePrice: 0,
  });
  const [products, setProducts] = useState([]);
  const [nameList, setNameList] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const {
    getProducts,
    getProductByBarcode,
    getProductsByName,
    addProduct,
    updateProduct,
    deleteProductById,
  } = useFetchProducts();

  /**
   * Obtiene todos los productos y los guarda en el estado `products`.
   *
   * @async
   * @throws {Error} Si ocurre un error al obtener los productos.
   */
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * Maneja los cambios en los campos del formulario del producto.
   *
   * @param {Object} e - El evento de cambio en el formulario.
   * @param {string} e.target.id - El id del campo que está siendo modificado.
   * @param {string} e.target.value - El nuevo valor del campo.
   */
  const productFactory = (e) => {
    const { id, value } = e.target;
    const isNumberField = ["stock", "costPrice", "salePrice"].includes(id);
    setProduct({
      ...product,
      [id]: isNumberField ? +value : value.toLowerCase(),
    });
  };

  /**
   * Guarda un producto, ya sea agregando uno nuevo o actualizando uno existente.
   *
   * @async
   * @returns {Object} El producto agregado o actualizado.
   * @throws {Error} Si ocurre un error al guardar el producto.
   */
  const saveProduct = async () => {
    try {
      let data;
      product.id === 0
        ? (data = await addProduct(product))
        : (data = await updateProduct(product));
      await fetchProducts();
      // resetProduct();
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Elimina un producto por su id.
   *
   * @async
   * @param {number} id - El id del producto a eliminar.
   * @throws {Error} Si ocurre un error al eliminar el producto.
   */
  const deleteProduct = async (id) => {
    try {
      const data = await deleteProductById(id);
      if (data.success) {
        await fetchProducts();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Resetea el estado del producto a los valores iniciales.
   */
  const resetProduct = () => {
    setProduct({
      id: 0,
      barcode: "",
      name: "",
      stock: 0,
      costPrice: 0,
      salePrice: 0,
    });
  };

  /**
   * Busca un producto por su código de barras.
   *
   * @async
   * @throws {Error} Si el producto no es encontrado o si ocurre un error en la búsqueda.
   */
  const fetchProductByBarcode = async () => {
    try {
      const data = await getProductByBarcode(product.barcode);
      if (data.success) setProduct(data.data);
      else {
        const { name, cause } = data.error;
        if (name !== "NotFoundError") throw new Error(cause);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Busca productos por su nombre.
   *
   * @async
   * @throws {Error} Si ocurre un error al realizar la búsqueda por nombre.
   */
  const fetchProductsByName = async () => {
    try {
      if (product.name.length > 1) {
        const data = await getProductsByName(product.name);
        console.log(data);
        data.success ? setNameList(data.data) : setNameList([]);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Alterna el estado de visibilidad del modal.
   */
  const switchModal = () => {
    activeModal ? setActiveModal(false) : setActiveModal(true);
  };

  return {
    products,
    setProducts,
    product,
    setProduct,
    nameList,
    setNameList,
    activeModal,
    productFactory,
    saveProduct,
    deleteProduct,
    resetProduct,
    fetchProductByBarcode,
    fetchProductsByName,
    switchModal,
  };
}
