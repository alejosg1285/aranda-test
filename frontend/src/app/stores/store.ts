import { createContext, useContext } from "react";
import CategoryStore from "./category.store";
import { ProductStore } from "./product.store";
import { CommonStore } from "./common.store";

interface Store {
  categoryStore: CategoryStore,
  commonStore: CommonStore,
  productStore: ProductStore
};

export const store: Store = {
  categoryStore: new CategoryStore(),
  commonStore: new CommonStore(),
  productStore: new ProductStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}