import { useEffect, useMemo, useState } from "react";
import useProducts from "./useProducts";

function useSales() {
  const { products, product } = useProducts();
  const initialSaleProdut = {
    product: {
      id: 0,
      barcode: "",
      name: "",
      stock: 0,
      costPrice: 0,
      salePrice: 0,
    },
    quantity: 1,
    total: 0,
  };

  //States
  const [saleProduct, setSaleProduct] = useState(initialSaleProdut);
  const [saleNameList, setSaleNameList] = useState([]);

  function getItemByBarcode(e) {
    const { value } = e.target;
    const item = products.find((p) => p.barcode === value.trim().toLowerCase());
    if (item) {
      console.log(item);
      setSaleProduct({
        product: { ...item },
        ...saleProduct,
        total: item.salePrice * saleProduct.quantity,
      });
    } else {
      console.error("Error");
    }
  }

  return { getItemByBarcode, saleProduct };
}

export default useSales;
