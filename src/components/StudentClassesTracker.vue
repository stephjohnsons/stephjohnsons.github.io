<template>
  <div class="mb-2 d-flex" id="students">
    <h2 class="text-xl font-bold">Students</h2>
    <button v-if="activeStudents" class="d d-flex btn btn-sm btn-success ms-auto me-0 mt-2 h-50"
      @click="activeStudents = !activeStudents">Active
      only</button>
    <button v-else class="d d-flex btn btn-sm btn-outline-success ms-auto me-0 mt-2 h-50"
      @click="activeStudents = !activeStudents">All students</button>
    <button class="d d-flex btn btn-sm btn-warning ms-2 me-0 mt-2 h-50" @click="showForm = !showForm">+ Add
      Student</button>
  </div>
  <p>Updated at 11 Jul 2025</p>
  <!-- Add Student Form -->
  <form v-if="showForm" @submit.prevent="addStudent" class="mb-6 bg-gray-50 p-4 rounded shadow mb-2">
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
      <input v-model.number="form.minutes_attended" type="number" min="0" class="form-input-sm w-full col-3" required />
    </div>

    <button class="btn btn-sm btn-secondary w-100" type="submit" :disabled="!adminAuthenticated">Add Student</button>
  </form>

  <!-- List of Students -->
  <div v-if="students">
    <table class="table table-hover w-full rounded-4">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-2">Student</th>
          <th class="p-2 d-none d-md-table-cell">Institution</th>
          <th class="p-2">Total</th>
          <th class="p-2">Attended</th>
          <th class="p-2">Left</th>
          <th class="p-2 d-none d-md-table-cell">Act.</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show="!activeStudents || student.active" v-for="student in students" :key="student.id" class="border-b">
          <td class="p-2">{{ student.student }}</td>
          <td class="p-2 d-none d-md-table-cell">{{ student.institution }}</td>
          <td class="p-2">{{ student.total_minutes }}</td>
          <td class="p-2">
            <template v-if="editingId === student.id">
              <input v-model.number="editMinutes" type="number" min="0"
                class="form-control form-control-sm w-50 d-inline" />
              <button class="btn btn-sm btn-success ms-1" :disabled="editMinutes === student.minutes_attended"
                @click="saveMinutes(student.id)">
                <i class="bi bi-check"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger ms-1" @click="cancelEdit">
                <i class="bi bi-x"></i>
              </button>
            </template>
            <template v-else>
              <button class="btn btn-sm btn-outline-secondary" @click="startEdit(student)">
                {{ student.minutes_attended }}
                <i class="bi bi-pencil ms-1"></i>
              </button>
            </template>
          </td>

          <td class="p-2">{{ student.minutes_left }}</td>
          <td class="p-2 d-none d-md-table-cell">
            <span v-if="student.active">✅</span>
            <span v-else>❌</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-gray-500">No students found.</div>
  <div v-if="loading" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999;">
    <div class="spinner-border text-warning" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useStudentStore } from '@/stores/students';

const showForm = ref(false);
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const loading = ref(false);
const editingId = ref(null);
const editMinutes = ref(0);

const activeStudents = ref(true);

const form = ref({
  student: '',
  institution: '',
  total_minutes: 0,
  minutes_attended: 0,
});

const endpoint = demoAuthenticated.value ? `${backend}/students?visitor=true` : `${backend}/students`;
const studentStore = useStudentStore();
const students = ref([]);

// Fetch existing students
const fetchStudents = async () => {
  const res = await fetch(`${backend}/students`);
  const data = await res.json();
  students.value = data;
};

// Add a student
const addStudent = async () => {
  loading.value = true;
  const res = await fetch(`${backend}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  });
  try {
    if (res.ok) {
      form.value = { student: '', institution: '', total_minutes: 0, minutes_attended: 0 };
      await fetchStudents();
    } else {
      const error = await res.json();
      alert('Error adding student: ' + error.message);
    }
  } finally {
    loading.value = false;
  }
};

const startEdit = (student) => {
  editingId.value = student.id;
  editMinutes.value = student.minutes_attended;
};

const cancelEdit = () => {
  editingId.value = null;
  editMinutes.value = 0;
};

const saveMinutes = async (id) => {
  loading.value = true;
  const res = await fetch(`${backend}/students`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id,
      minutes_attended: editMinutes.value,
    }),
  });

  try {
    if (res.ok) {
      cancelEdit();
      loading.value = true;
    } else {
      const error = await res.json();
      alert('Error updating minutes: ' + error.message);
    }
  } finally {
    loading.value = false;
    fetchStudents();
  }
};

onMounted(
  studentStore.students = await fetch(endpoint).then(res => res.json()),
  students.value = studentStore.students
); 
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
