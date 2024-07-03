<template>
  <div class="d-flex flex-column">
    <h2>Vita</h2>

    <p class="text-muted fst-italic">
      This page is a comprehensive showcase of things that I've done outside of music, particularly in design and web
      development.
      I have included a selection of works done that highlights the diversity and depth of my skills across domains.
    </p>
    <div v-for="(paragraph, index) in devBio" :key="index">
      <p :class="{ 'fs-7': index === devBio.length - 1 }">
        {{ paragraph }}
      </p>
    </div>

    <div class="d-flex flex-row gap-1 mt-1 mb-3">
      <button v-for='item in pages' :key="item" :class="buttonClass(item)" @click="switchPage(item)">
        {{ item }}
      </button>
    </div>

    <div class="sticky-top z-2">
      <Skills v-if="currentPage === 'Skills'" />
      <Development v-if="currentPage === 'Portfolio'" />
      <!-- <Design v-if="currentPage === 'Design'" /> -->
      <Certificates v-if="currentPage === 'Certificates'" />
      <Languages v-if="currentPage === 'Languages'" />
      <Education v-if="currentPage === 'Education'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Skills from './VitaPages/Skills.vue';
import Development from './VitaPages/Development.vue';
// import Design from './VitaPages/Design.vue';
import Certificates from './VitaPages/Certificates.vue';
import Languages from './VitaPages/Languages.vue';
import Education from './VitaPages/Education.vue';
import { devBio } from "@/components/data/biographies.js";
const currentPage = ref('Skills');

const pages = ref([
  'Skills',
  'Education',
  // 'Design',
  'Certificates',
  'Languages',
  'Portfolio',
])

function switchPage(page) {
  currentPage.value = page;
}

function buttonClass(page) {
  return [
    'btn',
    'btn-sm',
    'border-1',
    currentPage.value === page ? 'btn-warning' : 'btn-outline-dark'
  ];
}
</script>

<style scoped>
.accordion {
  --bs-accordion-bg: rgb(248, 248, 248);
  --bs-accordion-active-bg: var(--bs-warning);

  .accordion-button:not(.collapsed)::after {
    -webkit-mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background: var(--bs-warning-text-emphasis);
  }
}
</style>