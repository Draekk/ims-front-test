import Header from "./components/Header";
import PTable from "./components/PTable";
import ProductManager from "./components/ProductManager";
import Sales from "./components/Sales";
import useHeaderButtons from "./hooks/useHeaderButtons";
import useProducts from "./hooks/useProducts";
import SaleLog from "./components/SaleLog";

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

  const { switches, toggleSwitches } = useHeaderButtons();

  return (
    <div className="h-[100vh]">
      <Header switches={switches} toggleSwitches={toggleSwitches}></Header>

      {switches.s1 ? (
        <>
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
          <div className="mt-3 flex flex-col">
            <PTable
              products={products}
              setProduct={setProduct}
              switchModal={switchModal}
              setProducts={setProducts}
              deleteProduct={deleteProduct}
            ></PTable>
            <button
              onClick={switchModal}
              className="mx-auto bg-blue-500 hover:bg-blue-400 p-4 rounded-md m-4 font-black text-white uppercase"
            >
              Gestionar Producto
            </button>
          </div>
        </>
      ) : (
        <></>
      )}

      {switches.s2 ? <Sales></Sales> : <></>}

      {switches.s3 ? <SaleLog></SaleLog> : <></>}
    </div>
  );
}

export default App;
