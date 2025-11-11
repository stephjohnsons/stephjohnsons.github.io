<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <div class="d-flex align-items-center" id="lessons">
    <h2 class="text-xl font-bold mb-1">Lessons</h2>
    <button v-if="adminAuthenticated" class="d-none d-md-flex d-lg-none btn btn-sm btn-warning ms-auto me-0 mt-2 h-50"
      @click="showForm = !showForm">+ Add Lesson</button>
    <button v-if="adminAuthenticated" class="d-none d-md-flex d-lg-none btn btn-sm btn-warning ms-2 me-0 mt-2 h-50"
      @click="showQuickAddForm = !showQuickAddForm">+ Quick Add</button>
  </div>
  <div class="d-flex d-md-none d-lg-flex">
    <button v-if="adminAuthenticated" class="d d-flex btn btn-warning w-50 me-1" @click="showForm = !showForm">+ Add
      Lesson</button>
    <button v-if="adminAuthenticated" class="d d-flex btn btn-warning w-50"
      @click="showQuickAddForm = !showQuickAddForm">+ Quick Add</button>
  </div>
  <div class="d-flex my-1">
    <p class="my-auto me-1 ">
      Semester:
    </p>
    <select class="form-select form-select-sm py-1" v-model="selectedSemester">
      <option>2025-05</option>
      <option>2025-09</option>
    </select>
  </div>
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
    <button class="btn btn-sm btn-success w-100 mt-1" type="submit" :disabled="!adminAuthenticated">Add Lesson</button>
  </form>
  <form v-if="showQuickAddForm" @submit.prevent="quickAdd" class="mb-6 bg-gray-50 p-4 rounded shadow mb-2">
    <div class="d-flex">
      <h4 class="2">Quick Add</h4>
      <button class="btn btn-sm btn-danger ms-auto me-0 h-50" @click="showForm = !showForm; resetForm()">X</button>
    </div>
    <div class="d-flex flex-row mb-2 mx-2">
      <div class="d-flex col-7">
        <select v-model="form.student_ids" multiple required class="form-select">
          <option disabled value="">Select Student</option>
          <option v-for="s in students" :key="s.id" :value="s.id">
            {{ s.student }}
          </option>
        </select>
      </div>
    </div>
    <div class="d-flex flex-col col-6 m-2">
      <label class="col-4 me-2" for="class_date">Date</label>
      <input type="date" v-model="form.class_date" class="form-control me-2" required />
    </div>
    <div v-if="selectedStudentNames.length" class="my-1 ms-2">
      <strong>Selected: </strong><br>
      <ul v-for="(name, index) in selectedStudentNames" :key="index" class="mt-2">
        <li class="mb-1 font-monospace lh-0">{{ name }}</li>
      </ul>
    </div>
    <button class="btn btn-sm btn-success w-100 mt-1" type="submit" :disabled="!adminAuthenticated">Add Lesson</button>
  </form>

  <!-- List of Students -->
  <div v-if="classes.length > 0">
    <table class="table table-hover w-full rounded-4">
      <tbody>
        <template v-for="(studentLessons, studentId) in groupedClasses" :key="studentId">
          <!-- Student Header Row -->
          <tr :class="isExpanded(studentId) ? 'table-dark' : ''">
            <td colspan="4" class="fw-bold">
              <button class="btn btn-sm btn-outline-secondary me-2" @click="toggleExpand(studentId)">
                {{ isExpanded(studentId) ? '−' : '+' }}
              </button>
              <span>{{ getStudentName(studentId) }}</span>
            </td>
          </tr>

          <!-- Lessons Rows -->
          <tr v-if="isExpanded(studentId)" v-for="cls in studentLessons" :key="cls.id">
            <td v-if="editingId !== cls.id">
              <strong>Date:</strong> {{ formatDate(cls.class_date) }}
            </td>
            <td v-else>
              <input type="date" name="class_date" v-model="editForm.class_date" class="form-control form-control-sm"
                required>
            </td>

            <td v-if="editingId !== cls.id">({{ cls.duration }} minutes) {{ cls.absent ? '[Absent]' : '' }}</td>
            <td v-else>
              <input type="number" name="duration" v-model="editForm.duration" class="form-control form-control-sm"
                required>
            </td>

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
        </template>
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
import { ref, computed, watch, onMounted } from 'vue';
import { useStudentStore } from '@/stores/students';
import { useClassStore } from '@/stores/classes';

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const adminAuthenticated = ref(localStorage.getItem('studio_admin_authenticated') === 'true');
const loading = ref(false);
const showForm = ref(false);
const showQuickAddForm = ref(false);
const expandedStudents = ref(new Set());

const classStore = useClassStore();
const selectedSemester = ref('2025-09');

const classes = computed(() => classStore.getLessonsBySemester(selectedSemester.value));

const form = ref({
  student_id: '',
  class_date: '',
  duration: 60,
});
const editingId = ref(null);
const editForm = ref({
  id: '',
  class_date: '',
  duration: 0,
  absent: false
});

const studentStore = useStudentStore();
const getStudentName = studentStore.getStudentName;
const students = computed(() => studentStore.students);

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const fetchLessons = async () => {
  await classStore.fetchLessons(backend);
};

const addLesson = async () => {
  loading.value = true;
  try {
    const res = await fetch(`${backend}/classes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form.value,
        semester: selectedSemester.value
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error: ' + err.error);
    } else {
      resetForm();
      await fetchLessons();
      showForm.value = false;
    }
  } catch (err) {
    console.error('Failed to update lesson:', err);
  } finally {
    loading.value = false;
  }
};

const quickAdd = async () => {
  if (!form.value.student_ids || !form.value.student_ids.length) {
    alert('Please select at least one student.');
    return;
  }

  // Construct the payload correctly
  const payload = {
    student_ids: form.value.student_ids,  // stays as an array
    class_date: form.value.class_date,
    duration: form.value.duration || 60,
    absent: false,
    semester: selectedSemester.value
  };

  loading.value = true;
  try {
    const res = await fetch(`${backend}/classes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const err = await res.json();
      alert('Error adding lessons: ' + err.error);
      return;
    }

    resetForm();
    showQuickAddForm.value = false;
    await fetchLessons();  // refresh the lesson list
  } catch (err) {
    console.error('Quick add failed:', err);
  } finally {
    loading.value = false;
  }
};



const selectedStudentNames = computed(() => {
  if (!Array.isArray(form.value.student_ids)) return [];
  return form.value.student_ids
    .map(id => studentStore.getStudentName(id))
    .filter(name => name !== 'Unknown');
});

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

const groupedClasses = computed(() => {
  const grouped = {};
  for (const cls of classes.value) {
    const sid = cls.student_id;
    if (!grouped[sid]) grouped[sid] = [];
    grouped[sid].push(cls);
  }

  for (const sid in grouped) {
    grouped[sid].sort((a, b) => new Date(a.class_date) - new Date(b.class_date));
  }

  return grouped;
});

const toggleExpand = (sid) => {
  if (expandedStudents.value.has(sid)) {
    expandedStudents.value.delete(sid);
  } else {
    expandedStudents.value.add(sid);
  }
};

const isExpanded = (sid) => expandedStudents.value.has(sid);

onMounted(fetchLessons);

watch(
  () => studentStore.loaded,
  (loaded) => {
    if (loaded) {
      fetchLessons();
    }
  },
  { immediate: true }
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

.lh-0 {
  line-height: 0.4rem;
}
</style>
