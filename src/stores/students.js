import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import backend from '@/composables/backend'

export const useStudentStore = defineStore('students', () => {
  const students = ref([])
  const loaded = ref(false)

  const setStudents = (data) => {
    students.value = data
    loaded.value = true
  }

  const fetchStudents = async () => {
    const res = await fetch(`${backend}/students`)
    if (res.ok) {
      students.value = await res.json()
      loaded.value = true
    } else {
      console.error('Failed to fetch students')
    }
  }

  const latestUpdatedAt = computed(() => {
    if (!students.value.length) return null

    return students.value.reduce((latest, student) =>
      new Date(student.updated_at) > new Date(latest.updated_at) ? student : latest
    ).updated_at
  })

  const latestUpdatedAtFormatted = computed(() => {
    if (!latestUpdatedAt.value) return ''

    return new Date(latestUpdatedAt.value).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  })

  const getStudentName = (id) => {
    const found = students.value.find((s) => s.id === id)
    return found ? found.student : 'Unknown'
  }

  return {
    students,
    loaded,
    latestUpdatedAt,
    latestUpdatedAtFormatted,
    setStudents,
    fetchStudents,
    getStudentName
  }
})
