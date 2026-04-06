<template>
  <div :class="{ 'dark-mode': ui.isDark }">
    <div class="mb-1">
      <h5 class="fw-normal mb-0">Notes</h5>
    </div>

    <div class="d-flex border rounded mb-2 overflow-hidden">

      <!-- Sidebar -->
      <div
        class="border-end p-2 d-flex flex-column gap-2"
        style="width: 160px;"
      >

        <!-- Toolbar -->
        <div class="d-flex align-items-center gap-2">
          <button
            class="btn btn-sm btn-warning d-flex justify-content-center w-50"
            @click="createNote"
            :disabled="notes.length >= 4"
          >
            <i class="bi bi-plus-lg"></i>
          </button>

          <button
            class="btn btn-sm btn-outline-danger d-flex justify-content-center w-50"
            @click="deleteNote"
            :disabled="notes.length <= 1"
            title="Delete note"
          >
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <!-- Notes List -->
        <div
          v-for="note in notes"
          :key="note.id"
          class="note-item small p-1 d-flex align-items-center justify-content-between"
          :class="{ active: note.id === noteId }"
          @click="selectNote(note)"
        >
          <span
            class="text-truncate"
            :title="note.title"
          >
            {{ note.title || 'Untitled' }}
          </span>

          <!-- 🔴 Dirty Dot -->
          <span
            v-if="dirtyMap[note.id] && note.id !== noteId"
            class="unsaved-dot"
          ></span>
        </div>
      </div>

      <!-- Editor -->
      <div class="flex-grow-1 p-2 d-flex flex-column gap-2">
        <input
          v-model="title"
          class="form-control fw-medium"
          placeholder="Title..."
        />

        <textarea
          v-model="content"
          class="form-control flex-grow-1"
          rows="4"
          placeholder="Start typing..."
        />

        <!-- Status -->
        <transition name="fade">
          <div
            v-if="status !== 'idle'"
            class="small d-flex align-items-center gap-2"
          >

            <template v-if="status === 'saving'">
              <span class="spinner-border spinner-border-sm text-warning"></span>
              <span class="text-warning">Saving...</span>
            </template>

            <template v-else-if="status === 'saved'">
              <i class="bi bi-check-circle text-success"></i>
              <span class="text-success">Saved</span>
            </template>

          </div>
        </transition>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()
const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL

// state
const notes = ref([])
const noteId = ref(null)

const title = ref('')
const content = ref('')

const status = ref('idle') // idle | saving | saved
const dirtyMap = ref({})

let timeout = null
let statusTimeout = null
let isLoaded = false

// =======================
// FETCH
// =======================
async function fetchNotes() {
  const res = await fetch(`${backend}/rr?resource=notes`)
  const data = await res.json()

  notes.value = data.slice(0, 4)

  notes.value.forEach(n => {
    dirtyMap.value[n.id] = false
  })

  if (notes.value.length > 0) {
    selectNote(notes.value[0])
  }

  isLoaded = true
}

// =======================
// SELECT
// =======================
function selectNote(note) {
  noteId.value = note.id
  title.value = note.title || ''
  content.value = note.content || ''

  if (!(note.id in dirtyMap.value)) {
    dirtyMap.value[note.id] = false
  }
}

// =======================
// CREATE
// =======================
async function createNote() {
  if (notes.value.length >= 4) return

  const res = await fetch(`${backend}/rr?resource=notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: '', content: '' })
  })

  const data = await res.json()
  const newNote = data[0]

  notes.value.unshift(newNote)
  dirtyMap.value[newNote.id] = false

  selectNote(newNote)
}

// =======================
// SAVE
// =======================
async function saveNote() {
  if (!noteId.value) return

  status.value = 'saving'

  await fetch(`${backend}/rr?resource=notes`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: noteId.value,
      title: title.value,
      content: content.value
    })
  })

  // sync local
  const note = notes.value.find(n => n.id === noteId.value)
  if (note) {
    note.title = title.value
    note.content = content.value
  }

  dirtyMap.value[noteId.value] = false

  status.value = 'saved'

  clearTimeout(statusTimeout)
  statusTimeout = setTimeout(() => {
    status.value = 'idle'
  }, 1200)
}

// =======================
// AUTOSAVE
// =======================
watch([title, content], () => {
  if (!isLoaded || !noteId.value) return

  dirtyMap.value[noteId.value] = true

  clearTimeout(timeout)
  timeout = setTimeout(saveNote, 600)
})

// =======================
// DELETE
// =======================
async function deleteNote() {
  clearTimeout(timeout)

  if (!noteId.value) return

  const confirmDelete = confirm('Delete this note?')
  if (!confirmDelete) return

  await fetch(`${backend}/rr?resource=notes`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: noteId.value })
  })

  const index = notes.value.findIndex(n => n.id === noteId.value)

  delete dirtyMap.value[noteId.value]
  notes.value.splice(index, 1)

  if (notes.value.length > 0) {
    const next = notes.value[index] || notes.value[index - 1]
    selectNote(next)
  } else {
    noteId.value = null
    title.value = ''
    content.value = ''
  }
}

onMounted(fetchNotes)
</script>

<style scoped>
.note-item {
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s ease;
}

.note-item:hover {
  background: #f1f1f1;
}

.note-item.active {
  background: #e7f1ff;
  font-weight: 500;
}

/* Dark mode */
.dark-mode {
  background: #2b2b2b;
}

.dark-mode .border {
  border-color: #444 !important;
}

.dark-mode .form-control {
  background: #3a3a3a;
  color: white;
  border-color: #555;
}

.dark-mode .text-muted {
  color: #aaa !important;
}

.dark-mode .note-item:hover {
  background: #444;
}

.dark-mode .note-item.active {
  background: #0d6efd;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(2px);
}

.unsaved-dot {
  width: 6px;
  height: 6px;
  background: #f59e0b;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>