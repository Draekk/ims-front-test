/**
 * Custom Hook para manejar las operaciones CRUD de productos a través de la API.
 *
 * Este hook proporciona funciones para obtener, agregar, actualizar y eliminar productos
 * en la base de datos, usando una serie de solicitudes HTTP al servidor. Cada función
 * devuelve los datos procesados o `null` en caso de error, y maneja las excepciones
 * registrando los errores en la consola.
 *
 * @returns {Object} Un objeto con las funciones para interactuar con los productos:
 *   - `getProducts`: Obtiene todos los productos.
 *   - `getProductByBarcode`: Obtiene un producto por su código de barras.
 *   - `getProductsByName`: Obtiene productos por nombre.
 *   - `addProduct`: Agrega un nuevo producto.
 *   - `updateProduct`: Actualiza un producto existente.
 *   - `deleteProductById`: Elimina un producto por su ID.
 *
 * @example
 * const { getProducts, addProduct, updateProduct, deleteProductById } = useFetchProducts();
 *
 * // Obtener todos los productos
 * const products = await getProducts();
 * if (products) {
 *   console.log(products);
 * } else {
 *   console.error("No se pudieron obtener los productos.");
 * }
 *
 * // Agregar un producto
 * const newProduct = { name: "Galletas", barcode: "123456", costPrice: 500, salePrice: 800, stock: 100 };
 * const addedProduct = await addProduct(newProduct);
 * if (addedProduct) {
 *   console.log("Producto agregado:", addedProduct);
 * } else {
 *   console.error("Error al agregar el producto.");
 * }
 */
function useFetchProducts() {
  const API = "http://localhost:3000/api/product";

  /**
   * Obtiene la lista de productos desde la API.
   *
   * Esta función realiza una solicitud HTTP GET al endpoint `/find/all` para
   * obtener todos los productos. Si la solicitud tiene éxito, se devuelve la
   * respuesta procesada como un objeto JSON. En caso de error, se captura la
   * excepción, se registra en la consola y se devuelve `null`.
   *
   * @async
   * @function getProducts
   * @returns {Promise<Object|null>} Un objeto con los datos de los productos obtenidos,
   * o `null` si ocurre un error en la solicitud.
   *
   * @throws {Error} Si ocurre un error inesperado en el fetch.
   *
   * @example
   * const products = await getProducts();
   * if (products) {
   *   console.log(products);
   * } else {
   *   console.error("No se pudieron obtener los productos.");
   * }
   */
  const getProducts = async () => {
    try {
      const res = await fetch(`${API}/find/all`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  /**
   * Obtiene un producto específico desde la API mediante su código de barras.
   *
   * Esta función realiza una solicitud HTTP GET al endpoint `/find/barcode/{barcode}`
   * para obtener la información de un producto en particular. Si la solicitud tiene
   * éxito, se devuelve la respuesta procesada como un objeto JSON. En caso de error,
   * se captura la excepción, se registra en la consola y se devuelve `null`.
   *
   * @async
   * @function getProductByBarcode
   * @param {string} barcode - El código de barras del producto que se desea buscar.
   * @returns {Promise<Object|null>} Un objeto con los datos del producto si se encuentra,
   * o `null` si ocurre un error en la solicitud.
   *
   * @throws {Error} Si ocurre un error inesperado en el fetch.
   *
   * @example
   * const product = await getProductByBarcode("123456789");
   * if (product) {
   *   console.log(product);
   * } else {
   *   console.error("No se pudo encontrar el producto.");
   * }
   */
  const getProductByBarcode = async (barcode) => {
    try {
      const res = await fetch(`${API}/find/barcode/${barcode}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  /**
   * Obtiene productos desde la API mediante su nombre o una coincidencia parcial.
   *
   * Esta función realiza una solicitud HTTP GET al endpoint `/find/name/{name}`
   * para buscar productos que coincidan con el nombre proporcionado. Si la solicitud
   * tiene éxito, devuelve un objeto JSON con los datos. Si ocurre un error,
   * este se registra en la consola.
   *
   * @async
   * @function getProductsByName
   * @param {string} name - El nombre o parte del nombre del producto a buscar.
   * @returns {Promise<Object|null>} Una lista de productos que coincidan con el nombre,
   * o `null` si ocurre un error en la solicitud.
   *
   * @throws {Error} Si ocurre un error inesperado durante la solicitud.
   *
   * @example
   * const products = await getProductsByName("helado");
   * if (products) {
   *   console.log(products);
   * } else {
   *   console.error("No se pudieron encontrar productos con ese nombre.");
   * }
   */
  const getProductsByName = async (name) => {
    try {
      const res = await fetch(`${API}/find/name/${name}`);
      const data = res.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

  /**
   * Agrega un nuevo producto a la base de datos mediante la API.
   *
   * Esta función realiza una solicitud HTTP POST al endpoint `/create`,
   * enviando los datos del producto en formato JSON. Si la solicitud tiene
   * éxito, devuelve la respuesta del servidor como un objeto JSON. Si ocurre
   * un error, este se registra en la consola y la función retorna `null`.
   *
   * @async
   * @function addProduct
   * @param {Object} product - El objeto que representa el producto a agregar.
   * @param {string} product.name - El nombre del producto.
   * @param {string} product.barcode - El código de barras del producto.
   * @param {number} product.costPrice - El precio de costo del producto.
   * @param {number} product.salePrice - El precio de venta del producto.
   * @param {number} product.stock - La cantidad de stock disponible del producto.
   * @returns {Promise<Object|null>} Un objeto con los datos de la respuesta del servidor,
   * o `null` si ocurre un error.
   *
   * @throws {Error} Si ocurre un error inesperado durante la solicitud.
   *
   * @example
   * const newProduct = {
   *   name: "Galletas de Chocolate",
   *   barcode: "123456789",
   *   costPrice: 500,
   *   salePrice: 800,
   *   stock: 100,
   * };
   *
   * const response = await addProduct(newProduct);
   * if (response) {
   *   console.log("Producto agregado:", response);
   * } else {
   *   console.error("Error al agregar el producto.");
   * }
   */
  const addProduct = async (product) => {
    try {
      const res = await fetch(`${API}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  /**
   * Actualiza un producto existente en la base de datos mediante la API.
   *
   * Esta función realiza una solicitud HTTP PUT al endpoint `/update`,
   * enviando los datos del producto en formato JSON. Si la solicitud tiene
   * éxito, devuelve la respuesta del servidor como un objeto JSON con los datos
   * actualizados del producto. Si ocurre un error, este se registra en la consola
   * y la función retorna `null`.
   *
   * @async
   * @function updateProduct
   * @param {Object} product - El objeto que representa el producto a actualizar.
   * @param {string} product.id - El identificador único del producto a actualizar.
   * @param {string} product.name - El nombre del producto.
   * @param {string} product.barcode - El código de barras del producto.
   * @param {number} product.costPrice - El precio de costo del producto.
   * @param {number} product.salePrice - El precio de venta del producto.
   * @param {number} product.stock - La cantidad de stock disponible del producto.
   * @returns {Promise<Object|null>} Un objeto con los datos actualizados del producto,
   * o `null` si ocurre un error.
   *
   * @throws {Error} Si ocurre un error inesperado durante la solicitud.
   *
   * @example
   * const updatedProduct = {
   *   id: "123",
   *   name: "Galletas de Vainilla",
   *   barcode: "987654321",
   *   costPrice: 450,
   *   salePrice: 700,
   *   stock: 120,
   * };
   *
   * const response = await updateProduct(updatedProduct);
   * if (response) {
   *   console.log("Producto actualizado:", response);
   * } else {
   *   console.error("Error al actualizar el producto.");
   * }
   */
  const updateProduct = async (product) => {
    try {
      const res = await fetch(`${API}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  /**
   * Elimina un producto de la base de datos utilizando su identificador único.
   *
   * Esta función realiza una solicitud HTTP DELETE al endpoint `/delete/id/{id}`,
   * pasando el identificador del producto en la URL. Si la solicitud tiene éxito,
   * devuelve la respuesta del servidor indicando si la eliminación fue exitosa.
   * Si ocurre un error, este se registra en la consola y la función retorna `null`.
   *
   * @async
   * @function deleteProductById
   * @param {string} id - El identificador único del producto a eliminar.
   * @returns {Promise<Object|null>} Un objeto con el resultado de la eliminación
   * o `null` si ocurre un error.
   *
   * @throws {Error} Si ocurre un error inesperado durante la solicitud.
   *
   * @example
   * const productId = "123";
   * const result = await deleteProductById(productId);
   * if (result) {
   *   console.log("Producto eliminado:", result);
   * } else {
   *   console.error("Error al eliminar el producto.");
   * }
   */
  const deleteProductById = async (id) => {
    try {
      const res = await fetch(`${API}/delete/id/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  return {
    getProducts,
    getProductByBarcode,
    getProductsByName,
    addProduct,
    updateProduct,
    deleteProductById,
  };
}

export default useFetchProducts;
