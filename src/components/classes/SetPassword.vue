<template>
  <form
    class="d-flex flex-column gap-2 set-password"
    @submit.prevent="submit"
  >
    <h4 class="mt-0 mb-0">{{ requireCurrent ? 'Change password' : 'Choose your password' }}</h4>
    <p
      v-if="!requireCurrent"
      class="text-secondary mb-1"
    >
      Your temporary password works once. Choose your own password to continue.
    </p>

    <input
      v-if="requireCurrent"
      v-model="currentPassword"
      type="password"
      class="form-control"
      placeholder="Current password"
      autocomplete="current-password"
    />
    <input
      v-model="newPassword"
      type="password"
      class="form-control"
      placeholder="New password (at least 8 characters)"
      autocomplete="new-password"
    />
    <input
      v-model="confirmPassword"
      type="password"
      class="form-control"
      placeholder="Type it again"
      autocomplete="new-password"
    />

    <p
      v-if="error"
      class="text-danger small mb-0"
    >{{ error }}</p>
    <p
      v-if="saved"
      class="text-success small mb-0"
    >Password changed.</p>

    <button
      class="btn btn-warning"
      type="submit"
      :disabled="busy"
    >{{ busy ? 'Saving…' : 'Save password' }}</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { changePassword } from '@/composables/auth'

const props = defineProps({
  requireCurrent: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['done'])

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const saved = ref(false)
const busy = ref(false)

const submit = async () => {
  error.value = ''
  saved.value = false

  if (newPassword.value.length < 8) {
    error.value = 'Use at least 8 characters.'
    return
  }

  if (newPassword.value !== confirmPassword.value) {
    error.value = 'The two passwords don’t match.'
    return
  }

  busy.value = true
  const result = await changePassword(props.requireCurrent ? currentPassword.value : undefined, newPassword.value)
  busy.value = false

  if (result.error) {
    error.value = result.error
    return
  }

  currentPassword.value = ''
  newPassword.value = ''
  confirmPassword.value = ''
  saved.value = true
  emit('done', result.role)
}
</script>

<style scoped>
.set-password {
  max-width: 420px;
}
</style>
