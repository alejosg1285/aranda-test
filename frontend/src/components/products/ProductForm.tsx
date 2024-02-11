import { useEffect, useState } from "react";
import PreviewPhoto from "./PreviewPhoto";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useStore } from "../../app/stores/store";
import { ProductRequest } from "../../app/models/product";
import { observer } from "mobx-react-lite";

const ProductForm = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const { categoryStore: { categories, list } } = useStore();
  const { productStore: { errorMessage, loading, create }} = useStore();

  useEffect(() => {
    list();
  }, [list]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Debe ingresar un nombre'),
    description: Yup.string().required('Debe ingresar una descripción'),
    category: Yup.number().required('Debe seleccionar una categoria')
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      category: 0
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      const product: ProductRequest = {
        name: formik.values.name,
        description: formik.values.description,
        photoUrl: selectedImage,
        categoryId: formik.values.category
      }
      create(product);
    }
  });

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setImagePreview(URL.createObjectURL(selectedImage));
  }

  return (
    <div className="container">
      <h3 className="text-center">Nuevo Producto</h3>

      {errorMessage && (
        <>
          <div className="alert alert-warning" role="alert">
            {errorMessage}
          </div>
        </>
      )}

      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <label htmlFor="" className="form-label">Nombre</label>
                <input type="text" id="name" name="name" className="form-control" value={formik.values.name} onChange={formik.handleChange} />
                <div className="invalid-feedback" style={{ display: `${formik.errors.name ? 'block' : 'none'}` }}>
                  {formik.errors.name}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select name="category" id="category" className="form-select" value={formik.values.category} onChange={formik.handleChange}>
                  <option value="">Seleccionar categoria...</option>
                  {categories?.map(category => (
                    <option value={category.id} key={category.id}>{category.name}</option>
                  ))}
                </select>
                <div className="invalid-feedback" style={{ display: `${formik.errors.category ? 'block' : 'none'}` }}>
                  {formik.errors.category}
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
            <textarea className="form-control" id="description" name="description" value={formik.values.description} onChange={formik.handleChange}></textarea>
            <div className="invalid-feedback" style={{ display: `${formik.errors.description ? 'block' : 'none'}` }}>
              {formik.errors.description}
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
    </div>
  )
}

export default observer(ProductForm);
