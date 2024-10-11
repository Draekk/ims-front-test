import { useEffect, useState } from "react";
import useFetchProducts from "./useFetchProducts";

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

  const productFactory = (e) => {
    const { id, value } = e.target;
    const isNumberField = ["stock", "costPrice", "salePrice"].includes(id);
    setProduct({
      ...product,
      [id]: isNumberField ? +value : value.toLowerCase(),
    });
  };

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
