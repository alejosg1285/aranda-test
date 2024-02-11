import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
  category: Category;
}

export interface ProductFilter {
  filterBy: number;
  filterValue: string;
  orderBy: number;
  directionOrder: number;
}

export class ProductRequest {
  id?: number = undefined;
  name: string = '';
  description: string = '';
  photoUrl: string = '';
  categoryId: number = 0;

  constructor(product?: ProductRequest) {
    if (product) {
      this.id = product.id;
      this.categoryId = product.categoryId;
      this.description = product.description;
      this.name = product.name;
      this.photoUrl = product.photoUrl;
    }
  }
}