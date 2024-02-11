import { action, makeAutoObservable, observable, reaction, runInAction } from "mobx";
import { Product, ProductFilter, ProductRequest } from "../models/product";
import agent from "../api/apiFunctions";
import { router } from "../router/Routes";
import { store } from "./store";

export class ProductStore {
  products: Product[] | [] = [];
  selectedProduct: Product | undefined;
  loading: boolean = false;
  errorMessage: string = '';
  sortDirection: number = -1;
  sortByField: number = -1;
  filterBy: number = -1;
  filterValue: string = '';
  idProduct: number = 0;

  constructor() {
    makeAutoObservable(this, {
      products: observable,
      selectedProduct: observable,
      loading: observable,
      errorMessage: observable,
      sortDirection: observable,
      sortByField: observable,
      filterBy: observable,
      filterValue: observable,
      idProduct: observable,
      create: action,
      update: action,
      list: action,
      loadProduct: action,
      deleteProduct: action
    });

    reaction(
      () => this.sortByField,
      () => {
        this.list();
      }
    );
    reaction(
      () => this.sortDirection,
      () => {
        this.list();
      }
    );
    reaction(
      () => this.filterBy,
      () => {
        if (this.filterValue !== "")
          this.list();
      }
    );
    reaction(
      () => this.filterValue,
      () => {
        if (this.filterBy !== -1)
          this.list();
      }
    );
  }

  get filterParams(): ProductFilter {
    const filters: ProductFilter = {
      filterBy: this.filterBy,
      filterValue: this.filterValue,
      orderBy: this.sortByField,
      directionOrder: this.sortDirection
    };
    return filters;
  }

  get getProducts() {
    return this.products;
  }

  create = async (data: ProductRequest) => {
    try {
      this.loading = true;
      const uploaded = await agent.Products.uploadPhoto(data.photoUrl);
      const photo = uploaded.data;
      data.photoUrl = photo.url;
      await agent.Products.create(data);
      runInAction(() => this.loading = false);
      router.navigate('/products');
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Ocurrio un error en el registro';
      runInAction(() => this.loading = false);
    }
  };

  update = async (data: ProductRequest) => {
    
    try {
      this.loading = true;
      if (this.selectedProduct?.photoUrl !== data.photoUrl) {
        const uploaded = await agent.Products.uploadPhoto(data.photoUrl);
        const photo = uploaded.data;
        data.photoUrl = photo.url;
      }
      
      await agent.Products.update(data);
      runInAction(() => this.loading = false);
      router.navigate('/products');
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Ocurrio un error en la actualización';
      runInAction(() => this.loading = false);
    }
  }

  list = async () => {
    try {
      const result = await agent.Products.list(this.filterParams);
      this.products = result;
    } catch (error) {
      console.error(error);
    }
  }

  loadProduct = async (id: string) => {
    const pk = parseInt(id);
    try {
      let product = this.getProduct(pk);
      if (product) {
        this.selectedProduct = product;
        return product;
      } else {
        product = await agent.Products.details(pk);
        this.selectedProduct = product;
        return product; 
      }
    } catch (error) {
      console.error(error);
    }
  }

  deleteProduct = async (id: number) => {
    try {
      this.loading = true;
      await agent.Products.delete(id);
      runInAction(() => this.loading = false);
      store.commonStore.closeModal();
      this.products = this.products?.filter(product => product.id !== id);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Ha ocurrido un error al eliminar el producto';
      runInAction(() => this.loading = false);
    }
  }

  setOrderBy = (orderBy: number) => {
    this.sortByField = orderBy;
  }

  setDirectOrder = (orderDirec: number) => {
    this.sortDirection = orderDirec;
  }

  setFilterBy = (filterBy: number) => {
    this.filterBy = filterBy;
  }

  setFilterValue = (filterValue: string) => {
    this.filterValue = filterValue;
  }

  setProductId = (id: number) => {
    this.idProduct = id;
  }

  private getProduct = (id: number) => {
    return this.products?.filter(product => product.id === id)[0];
  }
}