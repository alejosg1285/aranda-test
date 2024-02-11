import axios, { AxiosResponse } from "axios";
import { Category } from "../models/category";
import { Photo } from "../models/photo";
import { Product, ProductFilter, ProductRequest } from "../models/product";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Categories = {
  list: () => requests.get<Category[]>('api/category')
};

const Products = {
  uploadPhoto: (file: string) => {
    let formData = new FormData();
    formData.append('File', file);
    return axios.post<Photo>('api/photo', formData, {
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },
  create: (product: ProductRequest) => requests.post<void>('api/product', product),
  list: (params: ProductFilter) => requests.post<Product[]>('api/product/getproducts', params),
  details: (id: number) => requests.get<Product>(`api/product/${id}`),
  update: (product: ProductRequest) => requests.put<void>(`api/product/${product.id}`, product),
  delete: (id: number) => requests.del<void>(`api/product/${id}`)
}

const agent = {
  Categories,
  Products
};

export default agent;