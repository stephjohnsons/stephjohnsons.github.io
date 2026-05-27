import { defineStore } from 'pinia'
import { ref } from 'vue'
import backend from '@/composables/backend'

export const useProjectTypesStore = defineStore('projectTypes', () => {
  const types = ref([])
  const loaded = ref(false)

  const fetchTypes = async () => {
    const res = await fetch(`${backend}/project-types`)
    if (res.ok) {
      types.value = await res.json()
      loaded.value = true
    } else {
      console.error('Failed to fetch project types')
    }
  }

  return { types, loaded, fetchTypes }
})
