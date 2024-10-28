import { useEffect, useMemo, useState } from "react";
import useProducts from "./useProducts";

function useSales() {
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

  function initialSaleDetails() {
    const localStorageDetail = localStorage.getItem("detail");
    return localStorageDetail ? JSON.parse(localStorageDetail) : [];
  }

  //States

  const [formInput, setFormInput] = useState({
    barcode: "",
    name: "",
    quantity: 0,
  });
  const [saleProduct, setSaleProduct] = useState(initialSaleProduct);
  const [saleDetails, setSaleDetails] = useState(initialSaleDetails);
  const [itemSelection, setItemSelection] = useState({
    ...initialSaleProduct,
    edit: false,
  });
  const [matchingProducts, setMatchingProducts] = useState([]);

  //----------------------------------------------------------Exportable functions

  //---------------------------UI interaction

  function formInputFactory(e) {
    const { name, value } = e.target;
    const isNumberField = ["quantity"].includes(name);
    setFormInput({
      ...formInput,
      [name]: isNumberField ? +value : value,
    });
  }

  function resetDetails() {
    setSaleDetails([]);
  }

  function selectProduct(item) {
    setSaleProduct({
      product: { ...item },
      quantity: 1,
      total: item.salePrice,
    });
    setMatchingProducts([]);
  }

  function selectDetail(item) {
    setItemSelection({ ...item, edit: false });
  }

  function resetSelectDetail() {
    setItemSelection({
      ...initialSaleProduct,
      edit: false,
    });
  }

  //---------------------------Logic

  function getItemByBarcode() {
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

  function getItemsByName() {
    const name = formInput.name.trim().toLowerCase();
    if (name.length > 1) {
      const updatedMatch = products.filter((p) => p.name.includes(name));
      setMatchingProducts(updatedMatch);
    } else setMatchingProducts([]);
  }

  function addToDetail() {
    const i = saleDetails.findIndex(
      (p) => p.product.barcode === saleProduct.product.barcode
    );
    i > -1
      ? updateTotalPerItem(i, saleProduct.quantity)
      : setSaleDetails([...saleDetails, saleProduct]);
    setSaleProduct(initialSaleProduct);
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

  //--------------------------------------------------------------Non exportable functions

  function updateTotalPerItem(index, quantity) {
    const updatedDetails = [...saleDetails];
    const item = updatedDetails[index];
    item.quantity += quantity;
    item.total = item.quantity * item.product.salePrice;
    setSaleDetails(updatedDetails);
  }

  function resetFormInput() {
    setFormInput({ barcode: "", name: "", quantity: 0 });
  }

  return {
    formInput,
    formInputFactory,
    resetDetails,
    itemSelection,
    setItemSelection,
    getItemByBarcode,
    getItemsByName,
    saleProduct,
    saleDetails,
    matchingProducts,
    selectProduct,
  };
}

export default useSales;
