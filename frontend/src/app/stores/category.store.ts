import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { Category } from "../models/category";
import agent from "../api/apiFunctions";

export default class CategoryStore {
  categories: Category[] | null = null;

  constructor() {
    makeAutoObservable(this, {
      categories: observable,
      list: action
    });
  }

  list = async() => {
    try {
      const result = await agent.Categories.list();
      runInAction(() => this.categories = result);
    } catch (error) {
      console.error(error);
    }
  }
}