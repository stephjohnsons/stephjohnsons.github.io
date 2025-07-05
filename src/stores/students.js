import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentStore = defineStore('students', () => {
  const students = ref([])
  const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL

  const setStudents = (data) => {
    students.value = data
  }

  const fetchStudents = async () => {
    const res = await fetch(`${backend}/students`)
    if (res.ok) {
      students.value = await res.json()
    } else {
      console.error('Failed to fetch students')
    }
  }

  const getStudentName = (id) => {
    const found = students.value.find((s) => s.id === id)
    return found ? found.student : 'Unknown'
  }

  return {
    students,
    setStudents,
    fetchStudents,
    getStudentName
  }
})
