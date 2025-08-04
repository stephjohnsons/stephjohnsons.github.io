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

    <div class="d-flex mt-2 mb-2">
      <div class="col-6 me-1">
        <label class="mb-1">Student Name</label>
        <select v-model="form.student_id" class="form-select" required>
          <option disabled value="">Select Student</option>
          <option v-for="s in students" :key="s.id" :value="s.id">
            {{ s.student }}
          </option>
        </select>
      </div>
      <div class="col-6 me-1">
        <label class="mb-1">Semester (yyyy-mm)</label>
        <input type="text" v-model="form.semester" placeholder="YYYY-MM" pattern="\d{4}-\d{2}" class="form-control"
          required />
      </div>
    </div>

    <div class="d-flex mt-2 mb-2">
      <div class="col-12 me-1">
        <label>Repertoire</label>
        <textarea v-model="form.pieces" placeholder="Repertoire pieces" class="form-control" rows="3" required />
      </div>
    </div>

    <button class="btn btn-sm btn-success w-100 mt-1 py-2" type="submit">
      Add Repertoire
    </button>
  </form>

  <!-- Repertoire List Table -->
  <div v-if="repertoireList.length">
    <table class="table table-hover w-full rounded-4">
      <thead>
        <tr class="bg-gray-200">
          <th class="p-1">Student</th>
          <th class="p-1">Pieces</th>
          <th class="p-1 d-none d-sm-table-cell" v-if="adminAuthenticated">Updated At</th>
          <th class="p-1 d-none d-sm-table-cell" v-if="adminAuthenticated"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rep in repertoireList" :key="rep.id">
          <td>{{ getStudentName(rep.student_id) }}</td>
          <!-- Conditional edit/display -->
          <td v-if="editingId === rep.id">
            <textarea v-model="editForm.pieces" class="form-control form-control-sm" rows="2"></textarea>
          </td>
          <td style="white-space: pre-line;" v-else>
            <i v-if="rep.semester">{{ rep.semester }}</i> <br v-if="rep.semester" />
            {{ rep.pieces }}
          </td>
          <td class="d-none d-sm-table-cell" v-if="adminAuthenticated">{{
      formatDate(rep.updated_at) }}</td>
          <td class="d-none d-sm-table-cell" v-if="adminAuthenticated">
            <div v-if="editingId !== rep.id" class="d-flex gap-1">
              <button class="btn btn-sm btn-warning" @click="startEdit(rep)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteRep(rep.id)">
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
  <div v-else class="text-gray-500">No repertoire found.</div>
  <div v-if="loading" class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999;">
    <div class="spinner-border text-warning" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStudentStore } from '@/stores/students';

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const adminAuthenticated = ref(localStorage.getItem('studio_admin_authenticated') === 'true');
const repertoireList = ref([]);
const showForm = ref(false);
const loading = ref(false);

const studentStore = useStudentStore();
const getStudentName = studentStore.getStudentName;
const students = studentStore.students;

const editingId = ref(null);
const editForm = ref({
  id: '',
  pieces: ''
});

const form = ref({
  student_id: '',
  semester: '',
  pieces: ''
});

const fetchRepertoire = async () => {
  try {
    repertoireList.value = await fetch(`${backend}/rep`).then(res => res.json());
  } catch (err) {
    console.error(err);
  }
};

const addRepertoire = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${backend}/rep`, {
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
  } finally {
    loading.value = false;
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

const startEdit = (rep) => {
  editingId.value = rep.id;
  editForm.value = {
    id: rep.id,
    pieces: rep.pieces
  };
};

const cancelEdit = () => {
  editingId.value = null;
  editForm.value = { id: '', pieces: '' };
};

const saveEdit = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${backend}/rep`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm.value)
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
      return;
    }

    await fetchRepertoire(); // refresh
    cancelEdit();
  } catch (err) {
    alert('Failed to update:', err);
  } finally {
    loading.value = false;
  }
};

const deleteRep = async (id) => {
  if (!confirm('Are you sure you want to delete this repertoire entry?')) return;
  loading.value = true;
  try {
    const res = await fetch(`${backend}/rep?id=${id}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
      return;
    }

    await fetchRepertoire(); // refresh
  } catch (err) {
    alert('Failed to delete repertoire:', err);
  } finally {
    loading.value = false;
  }
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
