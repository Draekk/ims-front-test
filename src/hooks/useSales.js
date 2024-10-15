import { useState } from "react";
import useProducts from "./useProducts";

function useSales() {
  const [productsToSale, setProductsToSale] = useState([]);
  const { product, fetchProductByBarcode } = useProducts();

  const prepareSaleList = async () => {
    await fetchProductByBarcode();
    const productExist = productsToSale.find((p) => p.id === product.id);
    let quantity;

    if (productExist) {
      quantity += productExist.quantity;
      setProductsToSale([...productsToSale, newSale]);
    } else {
      quantity = 1;
      const newSale = {
        id: product.id,
        name: product.name,
        quantity: quantity,
        total: product.salePrice * quantity,
      };
    }
  };

  return {
    productsToSale,
    prepareSaleList,
  };
}

export default useSales;
