import { useEffect, useMemo, useState } from "react";
import useProducts from "./useProducts";

function useSales() {
  const { products, product } = useProducts();
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

  //States
  const [formInput, setFormInput] = useState({ barcode: "", name: "" });
  const [saleProduct, setSaleProduct] = useState(initialSaleProduct);
  const [saleDetails, setSaleDetails] = useState([]);
  const [matchingProducts, setMatchingProducts] = useState([]);

  function getItemByBarcode(e) {
    let { value } = e.target;
    const item = products.find((p) => p.barcode === value.trim().toLowerCase());
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

  function getItemsByName(e) {
    const { value } = e.target;
    if (value.length > 1) {
      const updatedMatch = products.filter((p) =>
        p.name.includes(value.trim().toLowerCase())
      );
      setMatchingProducts(updatedMatch);
    } else setMatchingProducts([]);
  }

  useEffect(() => {
    if (saleProduct.product.id !== 0) {
      addToDetail();
    }
  }, [saleProduct]);

  function addToDetail() {
    const i = saleDetails.findIndex(
      (p) => p.product.barcode === saleProduct.product.barcode
    );
    i > -1
      ? updateTotalPerItem(i, saleProduct.quantity)
      : setSaleDetails([...saleDetails, saleProduct]);
    setSaleProduct(initialSaleProduct);
  }

  function selectProduct(item) {
    setSaleProduct({
      product: { ...item },
      quantity: 1,
      total: item.salePrice,
    });
    setMatchingProducts([]);
  }

  function updateTotalPerItem(index, quantity) {
    const updatedDetails = [...saleDetails];
    const item = updatedDetails[index];
    item.quantity += quantity;
    item.total = item.quantity * item.product.salePrice;
    setSaleDetails(updatedDetails);
  }

  return {
    formInput,
    getItemByBarcode,
    getItemsByName,
    saleProduct,
    saleDetails,
    matchingProducts,
    selectProduct,
  };
}

export default useSales;
