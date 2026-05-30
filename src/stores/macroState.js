import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMacroStateStore = defineStore('macroState', () => {
  const domain = ref('cn')

  const setDomain = (value) => {
    domain.value = value
  }

  return {
    domain,
    setDomain
  }
})
