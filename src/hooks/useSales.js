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

  function formInputFactory(e) {
    const { name, value } = e.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  }

  function resetDetails() {
    setSaleDetails([]);
    resetSelectDetail();
  }

  function selectProduct(item) {
    setSaleProduct({
      product: { ...item },
      quantity: 1,
      total: item.salePrice,
    });
    setMatchingProducts([]);
  }

  function resetSelectDetail() {
    setItemSelection({
      ...initialSaleProduct,
    });
  }

  function deleteItem() {
    const updatedDetail = saleDetails.filter(
      (p) => p.product.id !== itemSelection.product.id
    );
    setSaleDetails(updatedDetail);
    resetSelectDetail();
  }

  function toggleIsCash() {
    setIsCash(!isCash);
  }

  //---------------------------Logic

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

    const res = await fetch("/api/sale/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });

    const data = await res.json();

    console.log(data);
    resetDetails();
    setIsCash(true);
    return data;
  }

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
