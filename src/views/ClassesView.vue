<template>
  <div
    v-if="adminAuthenticated"
    class="d-flex m-4"
  >
    <AdminPermission />
  </div>
  <div
    v-if="studentAuthenticated"
    class="d-flex m-4"
  >
    <StudentPermission />
  </div>
  <div
    v-if="coTeacherAuthenticated"
    class="d-flex m-4"
  >
    <CoTeacherPermission />
  </div>

  <!-- Password page -->
  <div
    v-if="!adminAuthenticated && !studentAuthenticated && !coTeacherAuthenticated"
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

const adminAuthenticated = ref(
  localStorage.getItem("studio_admin_authenticated") === "true"
);

const studentAuthenticated = ref(
  localStorage.getItem("studio_student_authenticated") === "true"
);

const coTeacherAuthenticated = ref(
  localStorage.getItem("studio_co_teacher_authenticated") === "true"
)

const selectedStudentId = ref(
  localStorage.getItem("studio_student_id")
)

const inputPassword = ref("");

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_STUDIO_PASSWORD) {
    adminAuthenticated.value = true;
    localStorage.setItem("studio_admin_authenticated", "true");
  } else if (inputPassword.value === import.meta.env.VITE_STUDENT_PASSWORD) {
    studentAuthenticated.value = true;
    localStorage.setItem("studio_student_authenticated", "true");
  } else if (inputPassword.value === import.meta.env.VITE_STUDIO_COTEACHER_PASSWORD) {
    coTeacherAuthenticated.value = true;
    localStorage.setItem("studio_co_teacher_authenticated", "true");
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const studentStore = useStudentStore();

onMounted(async () => {
  if (!studentStore.loaded) {
    await studentStore.fetchStudents()
  }
})
</script>