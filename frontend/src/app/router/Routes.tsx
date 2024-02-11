import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../../App";
import ProductDashboard from "../../components/products/ProductDashboard";
import ProductForm from "../../components/products/ProductForm";
import ProductFormUpdate from "../../components/products/ProductFormUpdate";

export const routes: RouteObject[] = [{
  path: '/',
  element: <App />,
  children: [
    { path: 'products', element: <ProductDashboard /> },
    { path: 'createProduct', element: <ProductForm key='create' /> },
    { path: 'details/:id', element: <ProductFormUpdate key='detail' /> }
  ]
}];

export const router = createBrowserRouter(routes);