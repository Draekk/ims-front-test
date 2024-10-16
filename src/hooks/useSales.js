import { useEffect, useState } from "react";
import useProducts from "./useProducts";
import useFetchProducts from "./useFetchProducts";

function useSales() {
  const initialSale = () => {
    const localStorageSale = localStorage.getItem("sale");
    return localStorageSale ? JSON.parse(localStorageSale) : [];
  };
  const [sale, setSale] = useState(initialSale);
  const { product, setProduct, fetchProductByBarcode } = useProducts();
  const { getProductByBarcode } = useFetchProducts();

  useEffect(() => {
    localStorage.setItem("sale", JSON.stringify(sale));
  }, [sale]);

  async function addToSale() {
    try {
      console.log(product);
      const data = await getProductByBarcode(product.barcode);
      if (data.success) {
        setProduct(data.data);
      } else throw new Error("Error...");
      const saleExist = sale.findIndex((s) => s.id === product.id);
      console.log(saleExist);
      if (saleExist > -1) {
        const updatedSale = [...sale];
        updatedSale[saleExist].quantity++;
        setSale(updatedSale);
      } else {
        const quantity = 1;
        const newSale = {
          id: product.id,
          name: product.name,
          quantity,
          total: product.salePrice * quantity,
        };
        setSale([...sale, newSale]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function clearSale() {
    setSale([]);
  }

  return {
    sale,
    addToSale,
    clearSale,
  };
}

export default useSales;
