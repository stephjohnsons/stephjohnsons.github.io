<template>
  <div class="mb-2 d-flex align-items-center" id="lessons">
    <h2 class="text-xl font-bold">Lessons</h2>
    <button class="d d-flex btn btn-sm btn-warning ms-auto me-0 mt-2 h-50" @click="showForm = !showForm">+ Add
      Lesson</button>
  </div>
  <!-- Add Student Form -->
  <form v-if="showForm" @submit.prevent="addLesson" class="mb-6 bg-gray-50 p-4 rounded shadow mb-2">
    <div class="d-flex">
      <h4 class="2">Add Lesson</h4>
      <button class="btn btn-sm btn-danger ms-auto me-0 h-50" @click="closeForm">X</button>
    </div>
    <label for="student" class="mb-1">Student name</label>
    <select v-model="form.student_id" class="form-select" required>
      <option disabled value="">Select Student</option>
      <option v-for="s in students" :key="s.id" :value="s.id">
        {{ s.student }}
      </option>
    </select>
    <div class="d-flex mt-2 mb-2">
      <div class="col-6 me-1">
        <label for="date">Date and Time</label>
        <input type="datetime-local" v-model="form.date" class="form-control" required />
      </div>
      <div class="col-6 me-1">
        <label for="duration">Duration</label>
        <input type="number" v-model.number="form.duration" placeholder="Minutes" class="form-control" required />
      </div>
    </div>
    <button class="btn btn-sm btn-success w-100 mt-1" type="submit">Add Lesson</button>
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
const addLesson = async () => {
  // const res = await fetch(`${backend}/students`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(form.value),
  // });
  // if (res.ok) {
  //   form.value = { student: '', institution: '', total_minutes: 0, minutes_attended: 0 };
  //   fetchStudents();
  // } else {
  //   const error = await res.json();
  //   Error(error.message);
  // }
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
