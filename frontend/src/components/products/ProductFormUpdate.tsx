import { Formik } from "formik";
import * as Yup from 'yup';
import { ProductRequest } from "../../app/models/product";
import { useEffect, useState } from "react";
import { useStore } from "../../app/stores/store";
import PreviewPhoto from "./PreviewPhoto";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ProductFormUpdate = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { categoryStore: { categories, list } } = useStore();
  const { productStore: { errorMessage, loading, create, loadProduct, update }} = useStore();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    category: 0
  });

  useEffect(() => {
    list();
  }, [list]);

  useEffect(() => {
    if (id) { 
      loadProduct(id).then(product => {
        setProduct({
          ...product,
          name: product?.name!,
          description: product?.description!,
          category: product?.category.id!
        });
        setImagePreview(product?.photoUrl!);
        setSelectedImage(product?.photoUrl!);
      });
    }
  }, [id, loadProduct]);

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Debe ingresar un nombre'),
    description: Yup.string().required('Debe ingresar una descripción'),
    category: Yup.number().required('Debe seleccionar una categoria')
  });

  return (
    <div className="container">
      <h3 className="text-center">{id ? 'Actualizar' : 'Nuevo'} Producto</h3>

      {errorMessage && (
        <>
          <div className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        </>
      )}

      <Formik
        validationSchema={validationSchema}
        initialValues={product}
        enableReinitialize
        onSubmit = { values => {
            const productRequest: ProductRequest = {
              name: values.name,
              description: values.description,
              photoUrl: selectedImage,
              categoryId: values.category
            }

            if (id) {
              productRequest.id = parseInt(id!);
              update(productRequest);
            } else {
              create(productRequest);
            }
          }
        }
      >
        {props => (
          <form onSubmit={props.handleSubmit} className="mt-5">
            <div className="row">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <label htmlFor="" className="form-label">Nombre</label>
                    <input type="text" id="name" name="name" className="form-control" value={props.values.name} onChange={props.handleChange} />
                    <div className="invalid-feedback" style={{ display: `${props.errors.name ? 'block' : 'none'}` }}>
                      {props.errors.name}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="category" className="form-label">Categoria</label>
                    <select name="category" id="category" className="form-select" value={props.values.category} onChange={props.handleChange}>
                      <option value="">Seleccionar categoria...</option>
                      {categories?.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <div className="invalid-feedback" style={{ display: `${props.errors.category ? 'block' : 'none'}` }}>
                      {props.errors.category}
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="col">
                <div className="row">
                  <div className="col">
                    <label htmlFor="file" className="form-label">Foto</label>
                    <input className="form-control" type="file" id="photoImage" name="photoImage" onChange={handleImageChange} />
                  </div>
                </div>
                <div className="mt-3">
                  {imagePreview && (
                    <PreviewPhoto imageUrl={imagePreview} />
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea className="form-control" id="description" name="description" value={props.values.description} onChange={props.handleChange}></textarea>
                <div className="invalid-feedback" style={{ display: `${props.errors.description ? 'block' : 'none'}` }}>
                  {props.errors.description}
                </div>
              </div>
            </div>

            <div className="col-auto mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    <span role="status">Loading...</span>
                  </>          
                ) : (
                  <span>Submit</span>
                )}
              </button>
              <a className="btn btn-danger ms-2" href="/products" role="button">Cancel</a>
            </div>

          </form>
        )}

      </Formik>
    </div>
  )
}

export default observer(ProductFormUpdate);
