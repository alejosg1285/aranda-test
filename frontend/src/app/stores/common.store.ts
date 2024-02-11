import { action, makeAutoObservable, observable } from "mobx";

export class CommonStore {
  showModal: boolean = false;

  constructor() {
    makeAutoObservable(this, {
      showModal: observable,
      openModal: action,
      closeModal: action
    });
  }

  openModal = () => {
    console.log(this.showModal);
    this.showModal = true;
  }

  closeModal = () => {
    console.log(this.showModal);
    this.showModal = false;
  }
}