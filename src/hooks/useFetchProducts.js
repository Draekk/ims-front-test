function useFetchProducts() {
  const API = "/api/product";

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

  const getProductByBarcode = async (barcode) => {
    try {
      console.log(barcode);
      const res = await fetch(`${API}/find/barcode/${barcode}`);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };

  const getProductsByName = async (name) => {
    try {
      const res = await fetch(`${API}/find/name/${name}`);
      const data = res.json();
      return data;
    } catch (err) {
      console.error(err.message);
    }
  };

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
