import { useEffect, useMemo, useState } from "react";
import useFetchProducts from "./useFetchProducts";

function useSales() {
  const initialSale = () => {
    const localStorageSale = localStorage.getItem("sale");
    return localStorageSale ? JSON.parse(localStorageSale) : [];
  };
  const emptyItem = {
    id: 0,
    barcode: "",
    name: "",
    price: 0,
  };
  const [sale, setSale] = useState(initialSale);
  const [item, setItem] = useState(emptyItem);
  const { getProductByBarcode } = useFetchProducts();

  useEffect(() => {
    localStorage.setItem("sale", JSON.stringify(sale));
  }, [sale]);

  const itemFactory = (e) => {
    const { id, value } = e.target;
    setItem({
      ...item,
      [id]: value.toLowerCase(),
    });
  };

  async function addToSale() {
    try {
      const tempItem = { ...item };
      const data = await getProductByBarcode(tempItem.barcode);
      if (data.success) {
        const { id, barcode, name, salePrice } = data.data;
        tempItem.id = id;
        tempItem.barcode = barcode;
        tempItem.name = name;
        tempItem.price = salePrice;
      } else throw new Error("Error...");
      const saleExist = sale.findIndex((s) => s.id === tempItem.id);
      if (saleExist > -1) {
        const updatedSale = [...sale];
        updatedSale[saleExist].quantity++;
        updatedSale[saleExist].total =
          tempItem.price * updatedSale[saleExist].quantity;
        setSale(updatedSale);
      } else {
        const quantity = 1;
        const newSale = {
          id: tempItem.id,
          barcode: tempItem.barcode,
          name: tempItem.name,
          quantity,
          total: tempItem.price * quantity,
        };
        setSale([...sale, newSale]);
      }
      setItem(emptyItem);
    } catch (err) {
      console.error(err);
    }
  }

  function clearSale() {
    setSale([]);
    setItem(emptyItem);
  }

  const saleTotal = useMemo(
    () => sale.reduce((t, i) => t + i.total, 0),
    [sale]
  );

  return {
    sale,
    item,
    itemFactory,
    addToSale,
    clearSale,
    saleTotal,
  };
}

export default useSales;
