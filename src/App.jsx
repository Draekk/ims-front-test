import Header from "./components/Header";
import PTable from "./components/PTable";
import ProductManager from "./components/ProductManager";
import useProducts from "./hooks/useProducts";

function App() {
  const {
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
  } = useProducts();

  return (
    <>
      <Header></Header>

      {activeModal ? (
        <div className="absolute top-0 w-full h-full flex items-center justify-center bg-[rgba(255,255,255,0.8)] z-10">
          <ProductManager
            resetProduct={resetProduct}
            product={product}
            setProduct={setProduct}
            productFactory={productFactory}
            saveProduct={saveProduct}
            fetchProductByBarcode={fetchProductByBarcode}
            fetchProductsByName={fetchProductsByName}
            nameList={nameList}
            setNameList={setNameList}
            switchModal={switchModal}
          ></ProductManager>
        </div>
      ) : (
        <></>
      )}
      <div className="py-5 flex flex-col">
        <PTable
          products={products}
          setProduct={setProduct}
          switchModal={switchModal}
          setProducts={setProducts}
          deleteProduct={deleteProduct}
        ></PTable>
        <button
          onClick={switchModal}
          className="mx-auto bg-blue-500 hover:bg-blue-400 p-4 rounded-full m-4 font-black text-white uppercase"
        >
          Gestionar Producto
        </button>
      </div>
    </>
  );
}

export default App;
