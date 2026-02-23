<template>
  <div
    class="d-flex"
    id="students"
  >
    <h2 class="text-xl font-bold mb-0">Students</h2>
    <button
      v-if="activeStudents"
      class="d-none d-md-flex d-lg-none btn btn-sm btn-success ms-auto me-0 mt-2 h-50"
      @click="activeStudents = !activeStudents"
    >
      Active only
    </button>
    <button
      v-else
      class="d-none d-md-flex d-lg-none btn btn-sm btn-outline-success ms-auto me-0 mt-2 h-50"
      @click="activeStudents = !activeStudents"
    >
      All students
    </button>
    <button
      class="d-none d-md-flex d-lg-none btn btn-sm btn-warning ms-2 me-0 mt-2 h-50"
      @click="showAddStudent = !showAddStudent"
    >
      + Add Student
    </button>
  </div>
  <div class="d-flex d-md-none d-lg-flex mb-2">
    <button
      v-if="activeStudents"
      class="d d-flex btn btn-success mt-1 me-1 w-50"
      @click="activeStudents = !activeStudents"
    >
      Active only
    </button>
    <button
      v-else
      class="d d-flex btn btn-outline-success mt-1 w-50"
      @click="activeStudents = !activeStudents"
    >
      All students
    </button>
    <button
      class="btn btn-warning ms-1 mt-1 w-50"
      @click="showAddStudent = !showAddStudent"
    >
      + Add Student
    </button>
  </div>
  <transition name="fade">
    <div
      v-if="showAddStudent"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-warning-subtle rounded-3 mb-2"
    >
      <div
        class="shadow-xl w-[420px] max-w-[90vw]"
        @click.stop
      >
        <h4 class="text-lg font-semibold mb-2">Add Student</h4>

        <div class="flex">
          <input
            v-model="newStudent.student"
            placeholder="Student Name"
            class="border p-1 rounded me-2"
            autofocus
          />

          <input
            v-model="newStudent.institution"
            placeholder="Institution"
            class="border p-1 rounded me-2"
          />

          <input
            v-model.number="newStudent.total_minutes"
            type="number"
            placeholder="Total minutes"
            class="border p-1 rounded me-2"
          />
        </div>

        <div class="flex justify-end gap-2 mt-2">
          <button
            @click="createStudent"
            class="py-1 px-2 me-2 btn btn-sm btn-warning rounded"
          >
            Save
          </button>
          <button
            @click="closeModal"
            class="py-1 px-2 me-2 btn btn-sm btn-outline-danger rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
  <p class="mb-1">Updated on 23 Feb 2026</p>

  <!-- List of Students -->
  <div v-if="students">
    <table class="table table-hover w-full rounded-4">
      <thead>
        <tr class="bg-gray-200">
          <th></th>
          <th class="p-2">Student</th>
          <th class="p-2">Attended</th>
          <th class="p-2">Left</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b"
          v-show="!activeStudents || student.active"
          v-for="student in students"
          :key="student.id"
        >
          <td>
            <btn
              class="btn btn-sm hover:btn-danger"
              @click="confirmDelete(student)"
            >
              x
            </btn>
          </td>
          <td class="p-2">
            {{ student.student }}
            <span class="d-none d-md-inline">• {{ student.institution }}</span>
          </td>
          <td class="p-2">
            <template v-if="editingId === student.id">
              <input
                v-model.number="editMinutes"
                type="number"
                min="0"
                class="form-control form-control-sm w-50 d-inline"
              />
              <button
                class="btn btn-sm btn-success ms-1"
                :disabled="editMinutes === student.minutes_attended"
                @click="saveMinutes(student.id)"
              >
                <i class="bi bi-check"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-danger ms-1"
                @click="cancelEdit"
              >
                <i class="bi bi-x"></i>
              </button>
            </template>
            <template v-else>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="startEdit(student)"
              >
                {{ student.minutes_attended }}
                <i class="bi bi-pencil ms-1"></i>
              </button>
            </template>
          </td>

          <td class="p-2">
            {{ student.minutes_left }}
            <span class="text-secondary fs-7">/</span>

            <input
              v-if="editingTotal === student.id"
              v-model.number="editTotalValue"
              @keydown.enter="saveTotal(student)"
              @keyup.esc="editingTotal = null"
              @blur="saveTotal(student)"
              type="number"
              class="w-20 border rounded px-1 py-0.5"
            />

            <span
              v-else
              class="text-gray-50 italic text-secondary fs-7"
            >
              {{ student.total_minutes }}
            </span>

            <button
              @click="startEditTotal(student)"
              class="btn btn-sm"
            >✎</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    v-else
    class="text-gray-500"
  >No students found.</div>
  <div
    v-if="loading"
    class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
    style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
  >
    <div
      class="spinner-border text-warning"
      role="status"
    >
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- Overlay -->
  <div
    v-if="showAddStudent"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
    @click="closeModal"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useStudentStore } from "@/stores/students";

const showAddStudent = ref(false);
const newStudent = ref({
  student: '',
  institution: '',
  total_minutes: 0
})

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;
const loading = ref(false);
const editingId = ref(null);
const editMinutes = ref(0);

const activeStudents = ref(true);

const form = ref({
  student: "",
  institution: "",
  total_minutes: 0,
  minutes_attended: 0,
});

const endpoint = `${backend}/students`;
const studentStore = useStudentStore();
const students = computed(() => studentStore.students);

// Fetch existing students
const fetchStudents = async () => {
  const res = await fetch(`${backend}/students`);
  const data = await res.json();
  students.value = data;
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
    method: "PUT",
    headers: { "Content-Type": "application/json" },
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
      alert("Error updating minutes: " + error.message);
    }
  } finally {
    loading.value = false;
    fetchStudents();
  }
};

onMounted(async () => {
  (studentStore.students = await fetch(endpoint).then((res) => res.json())),
    (students.value = studentStore.students);
});

// Editing total duration
const editingTotal = ref(null)
const editTotalValue = ref(0)

function startEditTotal(student) {
  editingTotal.value = student.id
  editTotalValue.value = student.total_minutes
}

async function saveTotal(student) {
  if (editingTotal.value !== student.id) return

  if (editTotalValue.value < student.minutes_attended) {
    alert("Total cannot be less than attended minutes")
    return
  }

  await fetch(`${backend}/students`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: student.id,
      total_minutes: editTotalValue.value
    })
  })

  student.total_minutes = editTotalValue.value
  student.minutes_left =
    student.total_minutes - student.minutes_attended

  editingTotal.value = null
}

// Create new students
async function createStudent() {
  try {
    const res = await fetch(`${backend}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent.value)
    })

    const created = await res.json()

    showAddStudent.value = false

    newStudent.value = {
      student: '',
      institution: '',
      total_minutes: 0
    }
    await fetchStudents()
  } catch (err) {
    console.error(err)
    alert("Failed to add student")
  }
}

function closeModal() {
  showAddStudent.value = false
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => window.addEventListener('keydown', handleEsc))
onUnmounted(() => window.removeEventListener('keydown', handleEsc))

// delete students
const studentToDelete = ref(null)

function confirmDelete(student) {
  if (confirm(`Delete ${student.student}? If the student has lesson records, this will be deleted permanently.`)) {
    deleteStudent(student.id)
  }
}

async function deleteStudent(id) {
  try {
    await fetch(`${backend}/students`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    // remove from UI immediately
    students.value = students.value.filter(s => s.id !== id)

  } catch (err) {
    console.error(err)
    alert("Failed to delete student")
  }

  await fetchStudents()
}
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

.fs-7 {
  font-size: 0.7rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
