import { observer } from "mobx-react-lite"
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import ProductListItem from "./ProductListItem";
import ProductSorting from "./ProductSorting";
import ProductSearch from "./ProductSearch";
import ModalConfirmation from "../modals/ModalConfirmation";

const ProductDashboard = () => {
  const { productStore: { errorMessage, getProducts, idProduct, deleteProduct, list }} = useStore();
  const { commonStore: { showModal }} = useStore();

  useEffect(() => {
    list();
  }, [list]);

  const handleConfirm = () => {
    deleteProduct(idProduct);
  }

  return (
    <div className="container">
      <h1 className="text-center">Productos</h1>

      <div className="container mt-5">
        <div className="row">
          <div className="col d-flex justify-content-end">
            <a href="/createProduct" className="btn btn-primary">Nuevo Producto</a>
          </div>
        </div>

        {showModal && <ModalConfirmation handleConfirm={handleConfirm} />}

        {errorMessage && (
          <>
            <div className="alert alert-warning" role="alert">
              {errorMessage}
            </div>
          </>
        )}

        <div className="row mt-5">
          <div className="col-12">
            <div className="row">
              <div className="col">
                <ProductSearch />
              </div>
              <div className="col">
                <ProductSorting />
              </div>
            </div>
          </div>
          <div className="col-12 mt-2">
            {getProducts!.length > 0 ? (
              getProducts?.map(product => (
                <ProductListItem key={ product.id } product={ product } />
              ))
            ) : (
              <div className="alert alert-warning" role="alert">
                No se encontraron productos!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(ProductDashboard);
