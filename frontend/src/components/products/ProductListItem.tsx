import { observer } from "mobx-react-lite";
import { Product } from "../../app/models/product"
import PreviewPhoto from "./PreviewPhoto";
import { useStore } from "../../app/stores/store";

export interface Props {
  product: Product;
}

const ProductListItem = ({ product }: Props) => {
  const { commonStore: { openModal }} = useStore();
  const { productStore: { setProductId }} = useStore();

  const handleDelete = () => {
    openModal();
    setProductId(product.id);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <PreviewPhoto imageUrl={product.photoUrl} />
        </div>
        <div className="col-6">
          <p className="fw-semibold">{ product.name }</p>
          <p className="fw-light">{ product.description }</p>
          <span className="badge text-bg-primary">{ product.category.name }</span>
        </div>
        <div className="col d-flex justify-content-center align-items-center">
          <a className="btn btn-primary" href={`details/${product.id}`} role="button">Ver</a>
          <button type="button" className="btn btn-danger ms-2" onClick={() => handleDelete()}>Eliminar</button>
        </div>
      </div>
    </>
  )
}

export default observer(ProductListItem);
