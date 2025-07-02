<template>
  <div class="d-flex align-items-center" id="lessons">
    <h2 class="text-xl font-bold">Lessons</h2>
    <button v-if="adminAuthenticated" class="d d-flex btn btn-sm btn-warning ms-auto me-0 mt-2 h-50"
      @click="showForm = !showForm">+ Add
      Lesson</button>
  </div>
  <p class="mb-1">For <b>2025-05</b> semester</p>
  <!-- Add Class Form -->
  <form v-if="showForm" @submit.prevent="addLesson" class="mb-6 bg-gray-50 p-4 rounded shadow mb-2">
    <div class="d-flex">
      <h4 class="2">Add Lesson</h4>
      <button class="btn btn-sm btn-danger ms-auto me-0 h-50" @click="showForm = !showForm; resetForm()">X</button>
    </div>
    <label for="student" class="mb-1">Student name</label>
    <select v-model="form.student_id" class="form-select" required>
      <option disabled value="">Select Student</option>
      <option v-for="s in students" :key="s.id" :value="s.id">
        {{ s.student }}
      </option>
    </select>
    <div class="d-flex mt-2 mb-2">
      <div class="col-5 me-1">
        <label for="class_date">Date and Time</label>
        <input type="date" v-model="form.class_date" class="form-control" required />
      </div>
      <div class="col-5 me-1">
        <label for="duration">Duration</label>
        <input type="number" v-model.number="form.duration" placeholder="Minutes" class="form-control" required />
      </div>
      <div class="col-2 ms-2 d-flex flex-column justify-content-center">
        <label for="absent" class="mb-2">Absent?</label>
        <input type="checkbox" v-model.number="form.absent" class="form-check-input my-2 ms-2" />
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
          <th class="p-1 d-none d-sm-table-cell" v-if="adminAuthenticated"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cls in classes" :key="cls.id">
          <td>{{ studentName(cls.student_id) }} {{ cls.absent ? '[Absent]' : '' }} </td>
          <td>{{ formatDate(cls.class_date) }}</td>
          <td>{{ cls.duration }}</td>
          <td class="d-none d-sm-table-cell" v-if="adminAuthenticated">
            <div v-if="editingId !== cls.id" class="d-flex gap-1">
              <button class="btn btn-sm btn-warning" @click="startEdit(cls)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteLesson(cls.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <div v-else class="d-flex gap-1">
              <button class="btn btn-sm btn-success" @click="saveEdit">
                <i class="bi bi-check"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="cancelEdit">
                <i class="bi bi-x"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-gray-500">No lessons found.</div>
  <div v-if="loading" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999;">
    <div class="spinner-border text-warning" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const adminAuthenticated = ref(localStorage.getItem('studio_admin_authenticated') === 'true');
const classes = ref([]);
const loading = ref(false);
const students = ref([]);
const showForm = ref(false);
const form = ref({
  student_id: '',
  class_date: '',
  duration: 0,
});
const editingId = ref(null);
const editForm = ref({
  id: '',
  class_date: '',
  duration: 0,
  absent: false
});


const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


const fetchLessons = async () => {
  const clsRes = await fetch(`${backend}/classes`);
  const stdRes = await fetch(`${backend}/students`);
  classes.value = await clsRes.json();
  students.value = await stdRes.json();
};

const addLesson = async () => {
  loading.value = true;
  await fetch(`${backend}/classes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  });

  resetForm();
  showForm.value = false;
  fetchLessons();
  loading.value = false;
};

const studentName = (id) => {
  const student = students.value.find(s => s.id === id);
  return student ? student.student : 'Unknown';
};

const resetForm = () => {
  form.value = {
    student_id: '',
    class_date: '',
    duration: 0,
  };
};

const startEdit = (cls) => {
  editingId.value = cls.id;
  editForm.value = {
    id: cls.id,
    class_date: cls.class_date,
    duration: cls.duration,
    absent: cls.absent || false
  };
};

const cancelEdit = () => {
  editingId.value = null;
  editForm.value = {
    id: '',
    class_date: '',
    duration: 0,
    absent: false
  };
};

const saveEdit = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${backend}/classes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
    } else {
      await fetchLessons();
      cancelEdit();
    }
  } catch (err) {
    console.error('Failed to update lesson:', err);
  }
  loading.value = false;
};

const deleteLesson = async (id) => {
  if (!confirm('Are you sure you want to delete this lesson?')) return;

  loading.value = true;
  try {
    const res = await fetch(`${backend}/classes?id=${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
    } else {
      await fetchLessons();
    }
  } catch (err) {
    console.error('Failed to delete lesson:', err);
  }
  loading.value = false;
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
