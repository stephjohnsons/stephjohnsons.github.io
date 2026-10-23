import backend from '@/composables/backend'

const TOKEN_KEY = 'auth_token'
const ROLE_KEY = 'auth_role'

// Flags from the old browser-only login; cleared so they can't unlock anything
const LEGACY_KEYS = [
  'studio_admin_authenticated',
  'studio_student_authenticated',
  'studio_co_teacher_authenticated',
  'tool_authenticated',
  'rr_authenticated'
]

const storage = {
  get: (key) => {
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value)
    } catch {
      // ignore: private mode or blocked storage
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
}

LEGACY_KEYS.forEach(storage.remove)

export const getRole = () => (storage.get(TOKEN_KEY) ? storage.get(ROLE_KEY) : null)

export const clearSession = () => {
  storage.remove(TOKEN_KEY)
  storage.remove(ROLE_KEY)
}

// Returns the role for the password, or null if it was wrong
export const login = async (password) => {
  const res = await fetch(`${backend}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  })

  if (!res.ok) return null

  const { token, role } = await res.json()
  storage.set(TOKEN_KEY, token)
  storage.set(ROLE_KEY, role)
  return role
}

// fetch() with the login token attached. If the token has expired, log out
// and reload so the password prompt shows again.
export const authFetch = async (url, options = {}) => {
  const token = storage.get(TOKEN_KEY)
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  }

  const res = await fetch(url, { ...options, headers })

  if (res.status === 401 && token) {
    clearSession()
    window.location.reload()
  }

  return res
}
