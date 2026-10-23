<template>
  <div
    v-if="
      adminAuthenticated"
    class="d-flex m-4"
  >
    <AdminPermission />
  </div>
  <div
    v-else-if="studentAuthenticated"
    class="d-flex m-4"
  >
    <StudentPermission />
  </div>
  <div
    v-else-if="coTeacherAuthenticated"
    class="d-flex m-4"
  >
    <CoTeacherPermission />
  </div>
  <div
    v-else-if="selfAuthenticated"
    class="d-flex m-4"
  >
    <StudentPage />
  </div>

  <div
    v-else-if="studentSetup"
    class="d-flex flex-column align-items-center justify-content-center vh-100"
  >
    <SetPassword @done="onPasswordSet" />
  </div>

  <div
    v-else
    class="d-flex flex-column align-items-center justify-content-center vh-100"
  >
    <form
      class="d-flex flex-column gap-2 login-form"
      @submit.prevent="checkPassword"
    >
      <h4 class="mt-0">This page is password protected</h4>
      <input
        v-model="inputUsername"
        type="text"
        class="form-control"
        placeholder="Username (students)"
        autocomplete="username"
        autocapitalize="none"
        spellcheck="false"
      />
      <input
        v-model="inputPassword"
        type="password"
        class="form-control"
        placeholder="Password"
        autocomplete="current-password"
      />
      <p
        v-if="loginError"
        class="text-danger small mb-0"
      >{{ loginError }}</p>
      <button
        class="btn btn-warning"
        type="submit"
        :disabled="busy"
      >Submit</button>
    </form>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminPermission from "@/components/classes/AdminPermission.vue";
import StudentPermission from "../components/classes/StudentPermission.vue";
import CoTeacherPermission from "../components/classes/CoTeacherPermission.vue";
import StudentPage from "../components/classes/StudentPage.vue";
import SetPassword from "../components/classes/SetPassword.vue";
import { useStudentStore } from "@/stores/students";
import { getRole, login, studentLogin } from "@/composables/auth";

const role = ref(getRole());

const adminAuthenticated = computed(() => role.value === "admin");
const studentAuthenticated = computed(() => role.value === "student");
const coTeacherAuthenticated = computed(() => role.value === "coteacher");
const selfAuthenticated = computed(() => role.value === "self");
const studentSetup = computed(() => role.value === "student_setup");

const inputUsername = ref("");
const inputPassword = ref("");
const loginError = ref("");
const busy = ref(false);

// With a username: individual student login. Without: shared staff password.
const checkPassword = async () => {
  loginError.value = "";
  busy.value = true;

  try {
    if (inputUsername.value.trim()) {
      const result = await studentLogin(inputUsername.value.trim(), inputPassword.value);

      if (result.error) {
        loginError.value = result.error;
        return;
      }

      role.value = result.role;
    } else {
      const newRole = await login(inputPassword.value);

      if (!["admin", "student", "coteacher"].includes(newRole)) {
        loginError.value = "Incorrect password. Please try again.";
        return;
      }

      role.value = newRole;
    }

    inputPassword.value = "";
  } catch {
    loginError.value = "Could not reach the server. Please try again.";
  } finally {
    busy.value = false;
  }
};

const onPasswordSet = (newRole) => {
  role.value = newRole;
};

const studentStore = useStudentStore();

onMounted(async () => {
  if (["admin", "student", "coteacher"].includes(role.value) && !studentStore.loaded) {
    await studentStore.fetchStudents()
  }
})
</script>

<style scoped>
.login-form {
  width: min(320px, 100%);
}
</style>
