<template>
  <div class="p-3 bg-warning-subtle rounded-3 mb-2">
    <div class="d-flex align-items-center mb-2">
      <h4 class="mb-0">Login · {{ student.student }}</h4>
      <button
        class="btn btn-sm btn-outline-dark ms-auto"
        @click="emit('close')"
      >Close</button>
    </div>

    <!-- Just created: the only time the password is visible -->
    <div v-if="created">
      <p class="mb-2">Give these to {{ student.student }}. The password is <strong>shown only once</strong>.</p>
      <div class="credentials bg-white border rounded-3 p-3 mb-2">
        <div><small class="text-secondary">Username</small></div>
        <div class="font-monospace fs-5">{{ created.username }}</div>
        <div class="mt-2"><small class="text-secondary">Temporary password</small></div>
        <div class="font-monospace fs-5">{{ created.password }}</div>
      </div>
      <div class="d-flex flex-wrap gap-2 align-items-center">
        <button
          class="btn btn-sm btn-warning"
          @click="copy"
        >{{ copied ? 'Copied' : 'Copy message' }}</button>
        <small class="fs-7">Expires {{ formatDate(created.expires_at) }} if not used.</small>
      </div>
    </div>

    <div v-else>
      <p class="mb-2">
        <template v-if="!login">No login yet.</template>
        <template v-else-if="login.must_change_password">
          Waiting for first login · temporary password expires {{ formatDate(login.temp_expires_at) }}.
        </template>
        <template v-else>
          Active<template v-if="login.last_login_at"> · last login {{ formatDate(login.last_login_at) }}</template>.
        </template>
        <template v-if="login && isLocked"> Locked after too many wrong tries.</template>
      </p>

      <label class="d-block mb-1">
        <small class="text-secondary">Username</small>
      </label>
      <input
        v-model="username"
        class="form-control form-control-sm mb-2 font-monospace"
        style="max-width: 260px"
        autocapitalize="none"
        spellcheck="false"
      />

      <p
        v-if="error"
        class="text-danger small mb-2"
      >{{ error }}</p>

      <div class="d-flex flex-wrap gap-2">
        <button
          class="btn btn-sm btn-warning"
          :disabled="busy"
          @click="generate"
        >{{ login ? 'Reset password' : 'Create login' }}</button>
        <button
          v-if="login"
          class="btn btn-sm btn-outline-danger"
          :disabled="busy"
          @click="remove"
        >Remove login</button>
      </div>
      <small
        v-if="login"
        class="fs-7 d-block mt-2"
      >Resetting gives a new temporary password and logs the student out everywhere.</small>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import backend from '@/composables/backend'
import { authFetch } from '@/composables/auth'

const props = defineProps({
  student: { type: Object, required: true },
  login: { type: Object, default: null },
  suggestedUsername: { type: String, default: '' }
})

const emit = defineEmits(['close', 'changed'])

const username = ref(props.login?.username || props.suggestedUsername)
const created = ref(null)
const copied = ref(false)
const error = ref('')
const busy = ref(false)

const isLocked = computed(() => props.login?.locked_until && new Date(props.login.locked_until) > new Date())

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const generate = async () => {
  if (props.login && !confirm(`Reset ${props.student.student}'s password? Their current password will stop working.`)) return

  error.value = ''
  busy.value = true

  try {
    const res = await authFetch(`${backend}/student-logins/${props.student.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value.trim().toLowerCase() })
    })
    const body = await res.json()

    if (!res.ok) {
      error.value = body.error || 'Could not create the login.'
      return
    }

    created.value = body
    emit('changed')
  } catch {
    error.value = 'Could not reach the server.'
  } finally {
    busy.value = false
  }
}

const remove = async () => {
  if (!confirm(`Remove ${props.student.student}'s login? They won't be able to log in until you create a new one.`)) return

  busy.value = true
  await authFetch(`${backend}/student-logins/${props.student.id}`, { method: 'DELETE' })
  busy.value = false
  emit('changed')
  emit('close')
}

const copy = async () => {
  const text =
    `Your cello class page: https://stephjohnsons.com/#/classes\n` +
    `Username: ${created.value.username}\n` +
    `Temporary password: ${created.value.password}\n` +
    `You'll be asked to choose your own password when you first log in.`

  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
  } catch {
    copied.value = false
  }
}
</script>

<style scoped>
.credentials {
  max-width: 360px;
}
</style>
