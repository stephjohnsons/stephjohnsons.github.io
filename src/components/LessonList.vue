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
          <th class="p-2">Date</th>
          <th class="p-2">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cls in classes" :key="cls.id">
          <td>{{ studentName(cls.student_id) }}</td>
          <td>{{ formatDate(cls.date) }}</td>
          <td>{{ cls.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-gray-500">No lessons found.</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const classes = ref([]);
const students = ref([]);
const showForm = ref(false);
const form = ref({
  student_id: '',
  date: '',
  duration: 0,
});

const fetchLessons = async () => {
  const clsRes = await fetch(`${backend}/classes`);
  const stdRes = await fetch(`${backend}/students`);
  classes.value = await clsRes.json();
  students.value = await stdRes.json();
};


const addLesson = async () => {
  await fetch(`${backend}/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  });
  form.value = { student_id: '', date: '', duration: 0 };
  fetchLessons();
};

const formatDate = (date) => new Date(date).toLocaleString();
const studentName = (id) => {
  const student = students.value.find(s => s.id === id);
  return student ? student.student : 'Unknown';
};

onMounted(() => {
  fetchLessons();
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
