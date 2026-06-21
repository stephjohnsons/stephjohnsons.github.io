<template>
  <div
    class="mb-2 d-flex align-items-center"
    id="repertoire"
  >
    <h3 class="text-xl font-bold">Repertoire</h3>
  </div>

  <!-- Repertoire List Table -->
  <div
    v-for="rep in repertoireList"
    :key="rep.id"
    class="accordion mb-3"
  >
    <details @toggle="e => handleToggle(e, rep.student_id)">
      <summary class="fw-bold fs-5">
        {{ getStudentName(rep.student_id) }}
      </summary>
      <div class="row mt-0 bg-white rounded-bottom px-3 py-3 m-1">
        <!-- LEFT -->
        <div class="col-md-6">
          <h5>Repertoire</h5>
          <div
            v-if="editingId !== rep.id"
            style="white-space: pre-line;"
          >
            {{ rep.pieces }}
          </div>

          <div v-else>
            <textarea
              v-model="editForm.pieces"
              rows="5"
              class="form-control mb-2"
            />

            <div class="d-flex gap-2">
              <button
                class="btn btn-success btn-sm"
                @click="saveEdit"
              >
                Save
              </button>

              <button
                class="btn btn-outline-secondary btn-sm"
                @click="cancelEdit"
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            class="d-flex gap-1 mt-2"
            v-if="adminAuthenticated && editingId !== rep.id"
          >
            <button
              class="btn btn-sm btn-warning"
              @click="startEdit(rep)"
            >
              <i class="bi bi-pencil"></i>
            </button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteRep(rep.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-md-6">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="mt-2">
              Student Remarks
            </h5>
            <button
              class="btn btn-sm btn-warning"
              @click="showNoteBox = rep.student_id"
            >
              <i class="bi bi-plus"></i>
            </button>
          </div>


          <div v-if="showNoteBox === rep.student_id">
            <textarea
              v-model="newNote"
              rows="4"
              class="form-control mb-2"
            />
            <button
              class="btn btn-success btn-sm mb-2"
              @click="saveNote(rep.student_id)"
            >
              Save
            </button>
            <button
              class="btn btn-outline-secondary btn-sm ms-2 mb-2"
              @click="showNoteBox = null"
            >
              Cancel
            </button>
          </div>


          <div
            class="remarks-panel position-relative"
            v-if="notesByStudent[rep.student_id]"
            :ref="el => remarksRefs[rep.student_id] = el"
          >
            <div
              v-for="note in notesByStudent[rep.student_id]"
              :key="note.id"
              class="remark-card"
            >
              <div>
                {{ note.note }}
              </div>
              <div
                class="opacity-50 mt-1"
                style="font-size: 0.8rem"
              >
                Added {{ formatDate(note.created_at) }}
              </div>
            </div>
            <button
              class="btn btn-warning btn-sm scroll-down-btn"
              @click="scrollToBottom(rep.student_id)"
            >
              <i class="bi bi-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>
    </details>
  </div>
  <div
    v-if="loading"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999;"
  >
    <div
      class="spinner-border text-warning"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from 'vue';
import { useStudentStore } from '@/stores/students';
import backend from '@/composables/backend';

const studentAuthenticated = ref(localStorage.getItem('studio_student_authenticated') === 'true');
const adminAuthenticated = ref(localStorage.getItem('studio_admin_authenticated') === 'true');

const notes = ref([])
const repertoireList = ref([]);
const showForm = ref(false);
const loading = ref(false);

const remarksRefs = ref({})

const studentStore = useStudentStore();
const getStudentName = studentStore.getStudentName;
const students = studentStore.students;

const showNoteBox = ref(null);
const newNote = ref('')

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

const fetchNotes = async () => {
  try {
    notes.value = await fetch(`${backend}/student-notes`)
      .then(res => res.json())
  } catch (err) {
    console.error(err)
  }
}

const notesByStudent = computed(() => {
  const grouped = {}

  notes.value.forEach(note => {

    if (!grouped[note.student_id]) {
      grouped[note.student_id] = []

    }

    grouped[note.student_id].push(note)

  })

  return grouped
})

const saveNote = async (studentId) => {
  if (!newNote.value.trim()) return

  try {
    await fetch(`${backend}/student-notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        student_id: studentId,
        note: newNote.value
      })

    })

    newNote.value = ''
    showNoteBox.value = null

    await fetchNotes()

  } catch (err) {
    console.error(err)
  }

}

const scrollToBottom = (studentId) => {
  const panel = remarksRefs.value[studentId]

  if (panel) {
    panel.scrollTo({
      top: panel.scrollHeight,
      behavior: 'smooth'
    })
  }
}

const handleToggle = async (event, studentId) => {
  if (!event.target.open) return

  await nextTick()
  scrollToBottom(studentId)
}

const resetForm = () => {
  form.value = {
    student_id: '',
    semester: '',
    pieces: ''
  };
};

const formatDate = (date) => {
  const d = new Date(date)

  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

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

onMounted(async () => {
  await fetchRepertoire();
  await fetchNotes();
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

.remarks-panel {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  background: white;
}

.remark-card {
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  white-space: pre-wrap !important;
}

.remark-card:nth-last-child(2) {
  border-bottom: none;
  margin-bottom: -2rem;
}

details summary {
  cursor: pointer;
  padding: 12px;
  background: #f7f7f7;
  border-radius: 10px;
}

.scroll-down-btn {
  position: sticky;
  float: right;
  bottom: 10px;
  padding: 5px 9px;
  z-index: 10;
  border-radius: 999px;
}
</style>
