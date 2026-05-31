// src/composables/useAuth.js

import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const user = ref(null)

export function useAuth() {
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw error
    }

    user.value = data.user

    return data.user
  }

  const logout = async () => {
    await supabase.auth.signOut()

    user.value = null
  }

  const getUser = async () => {
    const {
      data: { user: currentUser }
    } = await supabase.auth.getUser()

    user.value = currentUser

    return currentUser
  }

  return {
    user,
    login,
    logout,
    getUser
  }
}
