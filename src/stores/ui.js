import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isDark: JSON.parse(localStorage.getItem('isDark') ?? 'false')
  }),
  actions: {
    toggleDark() {
      this.isDark = !this.isDark
      localStorage.setItem('isDark', JSON.stringify(this.isDark))
    }
  }
})
