<template>
  <div v-if="authenticated" class="d-flex">
    <div class="col-10">
      <StudentClassesTracker />
      <LessonList />
    </div>
    <div class="position-fixed top-25 end-0 me-4 pe-1 text-end">
      <h5>Sitemap</h5>
      <div class="d-flex flex-column">
        <button @click="scrollToStudents()">Students</button>
        <button @click="scrollToClasses()">Classes</button>
      </div>
    </div>
  </div>

  <div v-else class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="d-flex flex-column gap-2">
      <h4 class="mt-0">This page is password protected</h4>
      <input v-model="inputPassword" type="password" class="form-control" placeholder="Password" />
      <button class="btn btn-warning" @click="checkPassword" @enter="checkPassword">
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import StudentClassesTracker from '../components/StudentClassesTracker.vue';
import LessonList from '../components/LessonList.vue';

const authenticated = ref(localStorage.getItem('studio_authenticated') === 'true');
const inputPassword = ref('');

const scrollToStudents = () => {
  document.getElementById('students').scrollIntoView({ behavior: 'smooth' });
};

const scrollToClasses = () => {
  document.getElementById('lessons').scrollIntoView({ behavior: 'smooth' });
};

const checkPassword = () => {
  if (inputPassword.value === import.meta.env.VITE_STUDIO_PASSWORD) {
    authenticated.value = true;
    localStorage.setItem("studio_authenticated", "true");
  } else {
    alert("Incorrect password. Please try again.");
  }
};
</script>