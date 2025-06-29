<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Students</h2>
    <!-- Add Student Form -->
    <form @submit.prevent="addStudent" class="mb-6 bg-gray-50 p-4 rounded shadow">
      <div class="mb-2">
        <label class="block font-medium">Student Name</label>
        <input v-model="form.student" class="form-input w-full" required />
      </div>

      <div class="mb-2">
        <label class="block font-medium">Institution</label>
        <input v-model="form.institution" class="form-input w-full" required />
      </div>

      <div class="mb-2">
        <label class="block font-medium">Total Minutes of Lessons</label>
        <input v-model.number="form.total_minutes" type="number" min="0" class="form-input w-full" required />
      </div>

      <div class="mb-4">
        <label class="block font-medium">Minutes Attended</label>
        <input v-model.number="form.minutes_attended" type="number" min="0" class="form-input w-full" required />
      </div>

      <button class="btn btn-primary" type="submit">Add Student</button>
    </form>

    <!-- List of Students -->
    <div v-if="students.length">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-gray-200">
            <th class="p-2">Student</th>
            <th class="p-2">Institution</th>
            <th class="p-2">Total Minutes</th>
            <th class="p-2">Minutes Attended</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.id" class="border-b">
            <td class="p-2">{{ student.student }}</td>
            <td class="p-2">{{ student.institution }}</td>
            <td class="p-2">{{ student.total_minutes }}</td>
            <td class="p-2">{{ student.minutes_attended }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-gray-500">No students found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
</style>
