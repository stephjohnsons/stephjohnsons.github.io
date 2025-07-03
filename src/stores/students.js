import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStudentStore = defineStore('students', () => {
  const students = ref([])

  const setStudents = (data) => {
    students.value = data
  }

  const getStudentName = (id) => {
    const found = students.value.find((s) => s.id === id)
    return found ? found.student : 'Unknown'
  }

  return {
    students,
    setStudents,
    getStudentName
  }
})
