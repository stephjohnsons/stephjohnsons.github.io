<template>
  <div
    class="d-flex"
    id="students"
  >
    <h3 class="text-xl font-bold mb-0">Students</h3>
    <button
      v-if="activeStudents"
      class="d-flex btn btn-sm btn-success ms-auto me-0 mt-2 h-50"
      @click="activeStudents = !activeStudents"
    >
      Active only
    </button>
    <button
      v-else
      class="d-flex btn btn-sm btn-outline-success ms-auto me-0 mt-2 h-50"
      @click="activeStudents = !activeStudents"
    >
      All students
    </button>
    <button
      class="d-flex btn btn-sm btn-warning ms-2 me-0 mt-2 h-50 text-start"
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
  <p class="mt-2 mb-custom-view">
    Updated on {{ studentStore.latestUpdatedAtFormatted }}
  </p>
  <!-- List of Students -->
  <div v-if="students">
    <table class="table table-hover w-full rounded-4">
      <thead>
        <tr class="bg-gray-200">
          <th class="py-custom">Student</th>
          <th class="py-custom">Attended</th>
          <th class="py-custom">Left / Total</th>
          <th width="90"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b"
          v-show="!activeStudents || student.active"
          v-for="student in students"
          :key="student.id"
        >
          <td class="p-2 py-student-custom">
            {{ student.student }}
          </td>

          <!-- attended -->
          <td class="p-2 py-student-custom">

            <template v-if="editingId !== student.id">
              {{ student.minutes_attended }}
            </template>

            <input
              v-else
              type="number"
              class="form-control form-control-sm"
              v-model.number="editForm.minutes_attended"
            >

          </td>

          <!-- left / total -->

          <td class="p-2 py-student-custom">

            <template v-if="editingId !== student.id">

              {{ student.minutes_left }}

              <span class="text-secondary fs-7">
                /
              </span>

              <span class="text-secondary fs-7">
                {{ student.total_minutes }}
              </span>

            </template>

            <template v-else>

              {{
                editForm.total_minutes -
                editForm.minutes_attended
              }}

              <span class="text-secondary fs-7">
                /
              </span>

              <input
                type="number"
                class="form-control form-control-sm d-inline w-50"
                v-model.number="editForm.total_minutes"
              >

            </template>
          </td>

          <!-- buttons -->
          <td>
            <div
              v-if="editingId !== student.id"
              class="d-flex gap-1"
            >
              <button
                class="btn btn-sm btn-warning"
                @click="startEdit(student)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="confirmDelete(student)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <div
              v-else
              class="d-flex gap-1"
            >
              <button
                class="btn btn-sm btn-success"
                @click="saveEdit(student)"
              >
                <i class="bi bi-check"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="cancelEdit"
              >
                <i class="bi bi-x"></i>
              </button>
            </div>
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
import { onMounted, onUnmounted, ref } from "vue";
import { useStudentStore } from "@/stores/students";
import { storeToRefs } from "pinia";
import backend from '@/composables/backend';

const props = defineProps({
  mode: {
    type: String,
    default: null
  }
})

const showAddStudent = ref(false);
const newStudent = ref({
  student: '',
  institution: '',
  total_minutes: 0
})

const loading = ref(false);
const editingId = ref(null);

const editForm = ref({
  total_minutes: 0,
  minutes_attended: 0,
})

const activeStudents = ref(true);

const studentStore = useStudentStore();
const { students } = storeToRefs(studentStore);

const startEdit = (student) => {
  editingId.value = student.id

  editForm.value = {
    minutes_attended: student.minutes_attended,
    total_minutes: student.total_minutes
  }
}

const cancelEdit = () => {
  editingId.value = null

  editForm.value = {
    minutes_attended: 0,
    total_minutes: 0
  }
}

const saveEdit = async (student) => {

  if (
    editForm.value.total_minutes <
    editForm.value.minutes_attended
  ) {
    alert("Total cannot be less than attended.")
    return
  }

  await fetch(`${backend}/students`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: student.id,
      minutes_attended:
        editForm.value.minutes_attended,
      total_minutes:
        editForm.value.total_minutes
    })
  })

  await studentStore.fetchStudents()

  cancelEdit()
}

onMounted(async () => {
  await studentStore.fetchStudents()
})


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
    await studentStore.fetchStudents()
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

  await studentStore.fetchStudents()
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

.py-custom {
  padding: 0.65rem 0.5rem;
}

.py-student-custom {
  padding: 0.71rem !important;
}

.mb-custom-view {
  margin-bottom: 0.66rem;
}
</style>
