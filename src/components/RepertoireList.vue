<template>
  <div class="mb-2 d-flex align-items-center" id="repertoire">
    <h2 class="text-xl font-bold">Repertoire</h2>
    <button v-if="adminAuthenticated" class="d d-flex btn btn-sm btn-warning ms-auto me-0 mt-2 h-50"
      @click="showForm = !showForm">
      + Add Repertoire
    </button>
  </div>

  <!-- Add Repertoire Form -->
  <form v-if="showForm" @submit.prevent="addRepertoire" class="mb-6 bg-gray-50 p-4 rounded shadow mb-2">
    <div class="d-flex">
      <h4>Add Repertoire</h4>
      <button class="btn btn-sm btn-danger ms-auto me-0 h-50" @click.prevent="showForm = !showForm; resetForm()">
        X
      </button>
    </div>

    <label class="mb-1">Student Name</label>
    <select v-model="form.student_id" class="form-select" required>
      <option disabled value="">Select Student</option>
      <option v-for="s in students" :key="s.id" :value="s.id">
        {{ s.student }}
      </option>
    </select>

    <div class="d-flex mt-2 mb-2">
      <div class="col-6 me-1">
        <label>Semester (YYYY-MM)</label>
        <input type="month" v-model="form.semester" class="form-control" required />
      </div>
      <div class="col-6 me-1">
        <label>Repertoire</label>
        <input type="text" v-model="form.pieces" placeholder="Repertoire pieces" class="form-control" required />
      </div>
    </div>

    <button class="btn btn-sm btn-success w-100 mt-1" type="submit">
      Add Repertoire
    </button>
  </form>

  <!-- Repertoire List Table -->
  <div v-if="repertoireList.length">
    <table class="table table-hover w-full rounded-4">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-1">Student</th>
          <th class="p-1">Semester</th>
          <th class="p-1">Pieces</th>
          <th class="p-1">Updated At</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rep in repertoireList" :key="rep.id">
          <td>{{ studentName(rep.student_id) }}</td>
          <td>{{ rep.semester }}</td>
          <td>{{ rep.pieces }}</td>
          <td>{{ formatDate(rep.updated_at) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="text-gray-500">No repertoire found.</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const adminAuthenticated = ref(localStorage.getItem('studio_admin_authenticated') === 'true');
const repertoireList = ref([]);
const students = ref([]);
const showForm = ref(false);

const form = ref({
  student_id: '',
  semester: '',
  pieces: ''
});

const fetchRepertoire = async () => {
  try {
    repertoireList.value = await fetch(`${backend}/rep`).then(res => res.json());
    students.value = await fetch(`${backend}/students`).then(res => res.json());
  } catch (err) {
    console.error(err);
  }
};

const addRepertoire = async () => {
  try {
    const res = await fetch('/api/repertoire', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
      return;
    }

    resetForm();
    showForm.value = false;
    await fetchRepertoire();
  } catch (err) {
    console.error('Add error:', err);
  }
};

const resetForm = () => {
  form.value = {
    student_id: '',
    semester: '',
    pieces: ''
  };
};

const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

const studentName = (id) => {
  const student = students.value.find((s) => s.id === id);
  return student ? student.student : id;
};

onMounted(fetchRepertoire);
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
