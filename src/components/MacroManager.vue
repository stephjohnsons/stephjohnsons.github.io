<template>
  <div
    class="macro-manager mb-4"
    :class="{ 'dark-mode': ui.isDark }"
  >
    <h5 class="fw-normal">
      Macro Manager
    </h5>

    <button
      class="btn btn-sm btn-warning"
      @click="openAdd"
    >Add Macro</button>

    <button
      class="btn btn-sm btn-outline-secondary ms-2"
      @click="table = !table"
    >View: {{ table ? 'Table' : 'Card' }}</button>

    <table
      v-if="table"
      class="table mt-3"
      :class="{ 'table-dark': ui.isDark }"
    >
      <thead>
        <tr>
          <th>Macro</th>
          <th>Label</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="m in macros"
          :key="m.id"
        >
          <td>{{ m.macro }}</td>
          <td>{{ m.label }}</td>
          <td>{{ m.category }}</td>
          <td>
            <button
              class="btn btn-sm btn-outline-warning me-2"
              @click="openEdit(m)"
            >✍🏻</button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteMacro(m.id)"
            >🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="!table"
      class="row g-2 mt-2"
    >
      <div
        v-for="m in macros"
        :key="m.id"
        class="col-6 col-md-4 col-lg-3 col-xl-3 col-xxl-2"
      >
        <div class="card h-100 shadow-sm">

          <div class="card-body d-flex flex-column">

            <div class="d-flex justify-content-between mb-1">
              <strong>{{ m.macro }}</strong>
              <small class="text-muted">{{ m.category }}</small>
            </div>

            <div class="macro-title mb-1">
              {{ m.label }}
            </div>

            <div class="macro-text mb-2">
              {{ m.text }}
            </div>

            <div class="mt-auto d-flex gap-2">
              <button
                class="btn btn-sm w-50 btn-outline-warning"
                @click="openEdit(m)"
              >
                Edit
              </button>

              <button
                class="btn btn-sm w-50 btn-outline-danger"
                @click="deleteMacro(m.id)"
              >
                Delete
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>

    <div
      class="modal fade"
      ref="modalEl"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">
              {{ form.id ? 'Edit Macro' : 'Add Macro' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">

            <div class="mb-2 d-flex flex-row gap-2">
              <label class="form-label my-auto">Macro</label>
              <input
                v-model="form.macro"
                class="form-control"
              />
            </div>

            <div class="mb-2 d-flex flex-row gap-2 align-items-center">
              <label class="form-label my-auto me-1">Label</label>
              <input
                v-model="form.label"
                class="form-control"
              />

              <label class="form-label my-auto">Category</label>
              <input
                v-model="form.category"
                class="form-control"
              />
            </div>

            <div class="mb-2">
              <label class="form-label">Admin Notes</label>
              <textarea
                v-model="form.remark"
                class="form-control"
              />
            </div>


            <div class="mb-2">
              <label class="form-label">Text</label>
              <textarea
                v-model="form.text"
                rows="10"
                class="form-control"
              ></textarea>
            </div>

          </div>

          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>

            <button
              class="btn btn-primary"
              @click="saveMacro"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Modal } from 'bootstrap';
import { useUIStore } from '@/stores/ui';

const modalEl = ref(null)
let modalInstance = null
const macros = ref([])
const ui = useUIStore()
const table = ref(true)
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

const form = ref({
  id: null,
  macro: '',
  label: '',
  category: '',
  remark: '',
  text: ''
})

async function loadMacros() {
  const res = await fetch(`${backend}/rr?resource=macros`)
  macros.value = await res.json()
}

const showModal = ref(false)

onMounted(() => {
  loadMacros()
  modalInstance = new Modal(modalEl.value)
})

function openAdd() {

  form.value = {
    id: null,
    macro: '',
    label: '',
    category: '',
    remark: '',
    text: ''
  }

  modalInstance.show()
}

function openEdit(m) {
  form.value = { ...m }
  modalInstance.show()
}

async function saveMacro() {

  const method = form.value.id ? 'PUT' : 'POST'

  await fetch(`${backend}/rr?resource=macros`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  })

  modalInstance.hide()
  loadMacros()
}

async function deleteMacro(id) {

  await fetch(`${backend}/rr?resource=macros`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })

  loadMacros()
}
</script>

<style scoped>
.macro-title {
  font-weight: 500;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.macro-text {
  font-size: 13px;
  opacity: 0.85;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

/* =========================
   DARK MODE - Macro Manager
   ========================= */

.dark-mode {
  color: #e5e5e5;
}

/* =========================
   DARK MODE - TABLE (FIXED)
   ========================= */

.dark-mode .table {
  color: #e5e5e5;
  background-color: #1e1e1e;
}

.dark-mode .table thead {
  background-color: #2b2b2b;
  color: #ffffff;
}

.dark-mode .table thead th {
  border-bottom: 1px solid #444;
}

.dark-mode .table tbody tr {
  background-color: #1e1e1e;
  border-color: #333;
}

.dark-mode .table tbody tr:hover {
  background-color: #2a2a2a;
}

.dark-mode .table td,
.dark-mode .table th {
  border-color: #333;
}

/* Cards */
.dark-mode .card {
  background: #2b2b2b;
  border-color: #444;
  color: #e5e5e5;
}

.dark-mode .card .text-muted {
  color: #aaa !important;
}

/* Buttons */
.dark-mode .btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #222;
}

.dark-mode .btn-outline-warning {
  color: #ffc107;
  border-color: #ffc107;
}

.dark-mode .btn-outline-warning:hover {
  background-color: #ffc107;
  color: #222;
}

.dark-mode .btn-outline-danger {
  color: #ff8a8a;
  border-color: #ff8a8a;
}

.dark-mode .btn-outline-danger:hover {
  background-color: #ff8a8a;
  color: #222;
}

.dark-mode .btn-outline-secondary {
  color: #bbb;
  border-color: #666;
}

/* Modal */
.dark-mode .modal-content {
  background-color: #2b2b2b;
  color: #e5e5e5;
  border-color: #444;
}

.dark-mode .modal-header,
.dark-mode .modal-footer {
  border-color: #444;
}

/* Inputs */
.dark-mode .form-control {
  background-color: #1e1e1e;
  color: #e5e5e5;
  border-color: #444;
}

.dark-mode .form-control:focus {
  background-color: #1e1e1e;
  color: #fff;
  border-color: #ffc107;
  box-shadow: none;
}

/* Labels */
.dark-mode .form-label {
  color: #ccc;
}
</style>