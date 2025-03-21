import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isMobileMenu: false,
  }),
  actions: {
    toggleMobileMenu() {
      this.isMobileMenu = !this.isMobileMenu;
    },
  },
});
