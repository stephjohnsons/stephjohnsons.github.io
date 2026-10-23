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
    v-else
    class="d-flex flex-column align-items-center justify-content-center vh-100"
  >
    <div class="d-flex flex-column gap-2">
      <h4 class="mt-0">This page is password protected</h4>
      <input
        v-model="inputPassword"
        type="password"
        class="form-control"
        placeholder="Password"
        @keyup.enter="checkPassword"
      />
      <button
        class="btn btn-warning"
        @click="checkPassword"
      >Submit</button>
    </div>
  </div>

</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminPermission from "@/components/classes/AdminPermission.vue";
import StudentPermission from "../components/classes/StudentPermission.vue";
import CoTeacherPermission from "../components/classes/CoTeacherPermission.vue";
import { useStudentStore } from "@/stores/students";
import { getRole, login } from "@/composables/auth";

const role = ref(getRole());

const adminAuthenticated = computed(() => role.value === "admin");
const studentAuthenticated = computed(() => role.value === "student");
const coTeacherAuthenticated = computed(() => role.value === "coteacher");

const inputPassword = ref("");

const checkPassword = async () => {
  const newRole = await login(inputPassword.value);

  if (["admin", "student", "coteacher"].includes(newRole)) {
    role.value = newRole;
    inputPassword.value = "";
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const studentStore = useStudentStore();

onMounted(async () => {
  if (role.value && !studentStore.loaded) {
    await studentStore.fetchStudents()
  }
})
</script>