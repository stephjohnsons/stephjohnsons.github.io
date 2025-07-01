<template>
  <div v-if="adminAuthenticated || studentAuthenticated" class="d-flex">
    <div class="col-10">
      <StudentClassesTracker v-if="adminAuthenticated" />
      <LessonList />
    </div>
    <div class="position-fixed top-25 end-0 me-4 pe-1 text-end">
      <h5>Sitemap</h5>
      <div class="d-flex flex-column">
        <button v-if="adminAuthenticated" class="btn btn-sm btn-warning my-1"
          @click="scrollToStudents()">Students</button>
        <button class="btn btn-sm btn-warning my-1" @click="scrollToClasses()">Classes</button>
      </div>
    </div>
  </div>

  <div v-else class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="d-flex flex-column gap-2">
      <h4 class="mt-0">This page is password protected</h4>
      <input v-model="inputPassword" type="password" class="form-control" placeholder="Password"
        @keyup.enter="checkPassword" />
      <button class="btn btn-warning" @click="checkPassword">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StudentClassesTracker from '../components/StudentClassesTracker.vue';
import LessonList from '../components/LessonList.vue';

const adminAuthenticated = ref(localStorage.getItem('studio_admin_authenticated') === 'true');
const studentAuthenticated = ref(localStorage.getItem('studio_student_authenticated') === 'true');
const inputPassword = ref('');

const scrollToStudents = () => {
  document.getElementById('students').scrollIntoView({ behavior: 'smooth' });
};

const scrollToClasses = () => {
  document.getElementById('lessons').scrollIntoView({ behavior: 'smooth' });
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
</script>