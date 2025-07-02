import { ref } from 'vue'

const students = ref([])

export const studentName = (id) => {
  const student = students.value.find((s) => s.id === id)
  return student ? student.student : 'Unknown'
}
