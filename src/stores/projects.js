import { defineStore } from 'pinia'
import { ref } from 'vue'
import backend from '@/composables/backend'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([])
  const loaded = ref(false)

  const fetchProjects = async () => {
    const res = await fetch(`${backend}/projects`)
    if (res.ok) {
      projects.value = await res.json()
      loaded.value = true
    } else {
      console.error('Failed to fetch projects')
    }
  }

  return { projects, loaded, fetchProjects }
})
