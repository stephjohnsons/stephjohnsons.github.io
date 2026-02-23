<template>
  <div
    v-if="adminAuthenticated || studentAuthenticated"
    class="d-flex"
  >
    <div class="col-12 col-lg-10 d-none d-lg-block">
      <div
        class="d-flex g-2"
        v-if="!studentAuthenticated"
      >
        <div class="col-6 me-2">
          <StudentList />
        </div>
        <div class="col-6">
          <LessonList />
        </div>
      </div>
      <div
        class="d-flex"
        v-else
      >
        <div class="col-12">
          <LessonList />
        </div>
      </div>
      <RepertoireList />
      <div class="footer sticky-bottom rounded-3 px-2 pt-2 d-flex d-lg-none bg-warning">
        <div class="d-flex flex-row mb-2">
          <button
            v-if="adminAuthenticated"
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToStudents()"
          >
            Students
          </button>
          <button
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToClasses()"
          >
            Classes
          </button>
          <button
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToRepertoire()"
          >
            Rep
          </button>
        </div>
      </div>
    </div>
    <div class="d-block d-lg-none">
      <StudentList v-if="!studentAuthenticated" />
      <LessonList />
      <RepertoireList />
      <div class="footer sticky-bottom rounded-3 px-2 pt-2 d-flex d-lg-none bg-warning">
        <div class="d-flex flex-row mb-2">
          <button
            v-if="adminAuthenticated"
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToStudents()"
          >
            Students
          </button>
          <button
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToClasses()"
          >
            Classes
          </button>
          <button
            class="btn btn-sm btn-outline-dark m-1"
            @click="scrollToRepertoire()"
          >
            Rep
          </button>
        </div>
      </div>
    </div>
    <div class="position-fixed top-25 end-0 me-4 pe-1 text-end d-none d-lg-block">
      <h5>Sitemap</h5>
      <div class="d-flex flex-column">
        <button
          v-if="!studentAuthenticated"
          class="btn btn-sm btn-warning my-1"
          @click="scrollToStudents()"
        >
          Students
        </button>
        <button
          class="btn btn-sm btn-warning my-1"
          @click="scrollToClasses()"
        >
          Classes
        </button>
        <button
          class="btn btn-sm btn-warning my-1"
          @click="scrollToRepertoire()"
        >
          Rep
        </button>
      </div>
    </div>
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
import { ref, onMounted } from "vue";
import StudentList from "../components/StudentList.vue";
import LessonList from "../components/LessonList.vue";
import RepertoireList from "../components/RepertoireList.vue";
import { useStudentStore } from "@/stores/students";

const adminAuthenticated = ref(
  localStorage.getItem("studio_admin_authenticated") === "true"
);
const studentAuthenticated = ref(
  localStorage.getItem("studio_student_authenticated") === "true"
);
const inputPassword = ref("");

const backend = import.meta.env.VITE_TEMPLATE_BACKEND_API_URL;

const scrollToStudents = () => {
  document.getElementById("students").scrollIntoView({ behavior: "smooth" });
};

const scrollToClasses = () => {
  document.getElementById("lessons").scrollIntoView({ behavior: "smooth" });
};

const scrollToRepertoire = () => {
  document.getElementById("repertoire").scrollIntoView({ behavior: "smooth" });
};

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_STUDIO_PASSWORD) {
    adminAuthenticated.value = true;
    localStorage.setItem("studio_admin_authenticated", "true");
  } else if (inputPassword.value === import.meta.env.VITE_STUDENT_PASSWORD) {
    studentAuthenticated.value = true;
    localStorage.setItem("studio_student_authenticated", "true");
  } else {
    alert("Incorrect password. Please try again.");
  }
};

const studentStore = useStudentStore();

onMounted(async () => {
  await studentStore.fetchStudents();
});
</script>
