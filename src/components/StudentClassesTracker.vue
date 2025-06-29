<template>
  <div class="p-4">
    <div class="mb-2 d-flex align-items-center">
      <h2 class="text-xl font-bold">Students</h2>
      <button class="d d-flex btn btn-sm btn-warning ms-auto me-0 mt-2 h-50" @click="showForm = !showForm">+ Add
        Student</button>
    </div>
    <!-- Add Student Form -->
    <form v-if="showForm" @submit.prevent="addStudent" class="mb-6 bg-gray-50 p-4 rounded shadow">
      <div class="d-flex">
        <h4 class="2">Add Student</h4>
        <button class="btn btn-sm btn-danger ms-auto me-0 h-50" @click="closeForm">X</button>
      </div>
      <div class="mt-2 mb-2 d-flex justify-content-around">
        <label class="block font-medium col-1">Student</label>
        <input v-model="form.student" class="form-input-sm w-full col-3" required />
        <label class="block font-medium col-2">Total Lesson</label>
        <input v-model.number="form.total_minutes" type="number" min="0" class="form-input-sm w-full col-3" required />
      </div>

      <div class="d-flex mb-4 justify-content-around">
        <label class="block font-medium col-1">Institution</label>
        <input v-model="form.institution" class="form-input-sm w-full col-3" required />
        <label class="block font-medium col-2">Minutes Attended</label>
        <input v-model.number="form.minutes_attended" type="number" min="0" class="form-input-sm w-full col-3"
          required />
      </div>

      <button class="btn btn-sm btn-secondary w-100" type="submit">Add Student</button>
    </form>

    <!-- List of Students -->
    <div v-if="students.length">
      <table class="table table-hover w-full rounded-4">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2">Student</th>
            <th class="p-2">Institution</th>
            <th class="p-2">Total Minutes</th>
            <th class="p-2">Minutes Attended</th>
            <th class="p-2">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id" class="border-b">
            <td class="p-2">{{ student.student }}</td>
            <td class="p-2">{{ student.institution }}</td>
            <td class="p-2">{{ student.total_minutes }}</td>
            <td class="p-2">{{ student.minutes_attended }}</td>
            <td class="p-2">{{ student.active }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-gray-500">No students found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showForm = ref(false);
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

const students = ref([]);
const form = ref({
  student: '',
  institution: '',
  total_minutes: 0,
  minutes_attended: 0,
});

// Fetch existing students
const fetchStudents = async () => {
  const res = await fetch(`${backend}/students`);
  const data = await res.json();
  students.value = data;
};

// Add a student
const addStudent = async () => {
  const res = await fetch(`${backend}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  });
  if (res.ok) {
    form.value = { student: '', institution: '', total_minutes: 0, minutes_attended: 0 };
    fetchStudents();
  } else {
    const error = await res.json();
    Error(error.message);
  }
};

onMounted(() => {
  fetchStudents();
});
</script>

<style scoped>
.form-input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
}

.btn-primary {
  background-color: #4f46e5;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

label {
  margin-right: 1rem;
}
</style>
