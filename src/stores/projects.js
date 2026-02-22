import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref([])
  const loaded = ref(false)
  const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL

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
