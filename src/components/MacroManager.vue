<template>
  <div class="macro-manager mb-4">

    <h5 class="fw-normal">
      Macro Manager
    </h5>

    <button
      class="btn btn-sm btn-warning"
      @click="openAdd"
    >Add Macro</button>

    <table class="table mt-1">
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
              class="btn btn-sm btn-outline-primary me-2"
              @click="openEdit(m)"
            >Edit</button>
            <button
              class="btn btn-sm btn-outline-danger"
              @click="deleteMacro(m.id)"
            >Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

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

            <div class="mb-2">
              <label class="form-label">Macro</label>
              <input
                v-model="form.macro"
                class="form-control"
              />
            </div>

            <div class="mb-2">
              <label class="form-label">Label</label>
              <input
                v-model="form.label"
                class="form-control"
              />
            </div>

            <div class="mb-2">
              <label class="form-label">Category</label>
              <input
                v-model="form.category"
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

const modalEl = ref(null)
let modalInstance = null
const macros = ref([])
const editing = ref(false)
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

const form = ref({
  id: null,
  macro: '',
  label: '',
  category: '',
  text: ''
})

async function loadMacros() {
  const res = await fetch(`${backend}/rr/macros`)
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

  await fetch(`${backend}/rr/macros`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  })

  modalInstance.hide()
  loadMacros()
}

async function deleteMacro(id) {

  await fetch(`${backend}/rr/macros`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  })

  loadMacros()
}
</script>