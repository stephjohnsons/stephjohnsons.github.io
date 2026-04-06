<template>
  <div :class="{ 'dark-mode': ui.isDark }">
    <!-- Header -->
    <div class="mb-1">
      <h5 class="fw-normal mb-0">Notes</h5>
    </div>

    <!-- Editor -->
    <div class="d-flex flex-column gap-2 p-2 border rounded mb-2">
      <input
        v-model="title"
        class="form-control fw-medium"
        placeholder="Title..."
      />

      <textarea
        v-model="content"
        class="form-control"
        placeholder="Start typing..."
        rows="4"
      />

      <div class="text-end small text-muted">
        <span v-if="saving">Saving...</span>
        <span v-else>Saved</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useUIStore } from '@/stores/ui'

const ui = useUIStore()

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL

const title = ref('')
const content = ref('')
const saving = ref(false)
const noteId = ref(null)

let timeout = null

// ✅ FETCH LATEST NOTE
async function fetchLatestNote() {
  const res = await fetch(`${backend}/rr?resource=notes`)
  const data = await res.json()

  if (data.length > 0) {
    const note = data[0] // already sorted by updated_at DESC

    noteId.value = note.id
    title.value = note.title || ''
    content.value = note.content || ''
  }
}

// ✅ SAVE
async function saveNote() {
  saving.value = true

  if (!noteId.value) {
    const res = await fetch(`${backend}/rr?resource=notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title.value, content: content.value })
    })

    const data = await res.json()
    noteId.value = data[0].id
  } else {
    await fetch(`${backend}/rr?resource=notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: noteId.value,
        title: title.value,
        content: content.value
      })
    })
  }

  saving.value = false
}

// ✅ AUTOSAVE
watch([title, content], () => {
  clearTimeout(timeout)
  timeout = setTimeout(saveNote, 600)
})

// ✅ LOAD ON MOUNT
onMounted(fetchLatestNote)
</script>
<style scoped>
textarea {
  resize: none;
}

/* Apply ONLY to container, not everything blindly */
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
</style>