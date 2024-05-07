<template>
  <div class="d-flex flex-column">
    <h2>Curriculum Vitae</h2>

    <p class="text-muted fst-italic">
      This page is a comprehensive showcase of things that I've done in design, web
      development, and anything out of music.
      I have included a selection of works done that highlights the diversity and depth of my skills across domains.
    </p>
    <div v-for="(paragraph, index) in devBio" :key="index">
      <p :class="{ 'fs-7': index === devBio.length - 1 }">
        {{ paragraph }}
      </p>
    </div>

    <div class="d-flex flex-row gap-1 mt-1 mb-3">
      <button :class="buttonClass('Skills')" @click="switchPage('Skills')">
        Skills
      </button>
      <button :class="buttonClass('Certificates')" @click="switchPage('Certificates')">
        Certificates
      </button>
    </div>

    <div v-if="currentPage === 'Skills'">
      <Skills />
    </div>

    <div v-else>
      <h3>Certificates</h3>
      <div v-for="cert in    certificates   " :key="cert.index">
        <h6 class="mb-0 fw-semibold">{{ cert.name }}</h6>
        <p class="mb-0">
          {{ cert.provider }}
        </p>
        <p class="text-muted mb-0 fs-7 fst-normal">
          Issued {{ cert.issuanceDate }} <br />
        </p>
        <p class="text-muted fs-7 fst-normal">
          Credential ID
          <a :href="certificateLink + cert.credentials" class="link" target="_blank">
            {{ cert.credentials }}
          </a>
        </p>
        <hr>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import Skills from './DesignPages/Skills.vue';
import { devBio, devProfile, certificates } from "@/components/data/biographies.js";

const isActive = reactive({});

const certificateLink = 'https://www.coursera.org/account/accomplishments/certificate/';

const toggle = (index) => {
  isActive[index] = !isActive[index];
};

const currentPage = ref('Skills');

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

onMounted(() => {
  Object.keys(devProfile).forEach((key, index) => {
    isActive[index] = index === 0;
  });
});
</script>

<style scoped>
.accordion {
  --bs-accordion-color: var(--bs-warning-text-emphasis);
  --bs-accordion-active-bg: var(--bs-warning);

  .accordion-button:not(.collapsed)::after {
    -webkit-mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background: var(--bs-warning-text-emphasis);
  }

  .accordion-button:not(.collapsed) {
    color: var(--bs-warning-text-emphasis);
  }
}
</style>