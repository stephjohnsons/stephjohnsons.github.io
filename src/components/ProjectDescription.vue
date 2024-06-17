<template>
  <div class="d-flex border-bottom">
    <h2 class="project-title">
      Clean Water
    </h2>
  </div>
  <!-- Description -->
  <div class="d-flex mt-2">
    <div class="me-4">
      <p class="mb-0 fw-light fs-custom">Client</p>
      <h4>Earth Protection Foundation</h4>
    </div>
    <div class="me-4">
      <p class="mb-0 fw-light fs-custom">Industry</p>
      <h4>Non-Profit</h4>
    </div>
    <div>
      <p class="mb-0 fw-light fs-custom">Scope of Work</p>
      <h4>{{ props.scope }} Campaign, Social, UX</h4>
    </div>
  </div>
  <div>
    <h2>Project Overview</h2>
    <p>{{ props.overview }}</p>

    <h2>Objectives</h2>
    <p>{{ props.objectives }}</p>

    <h2>Target Audience</h2>
    <p> {{ props.audience }}</p>

    <h2>Brand Guidelines</h2>
    <p>{{ props.guidelines }}</p>
  </div>
  <div class="border-top pt-3">
    <h2>Solution</h2>
    <p>
      Solution blah blah
      {{ props.solution }}
    </p>
  </div>
  <!-- Footer -->
  <div class="border-top border-bottom py-3">
    <div class="mt-5 mb-5 d-flex flex-column flex-md-row align-items-md-center">
      <h3 class="project-title fw-semibold">Let's Create.</h3>
      <ArrowAnimation class="ms-2 d-none d-lg-block" />
      <button class="btn btn-outline-dark btn-lg me-auto ms-md-auto me-md-0 px-5">Get in Touch</button>
    </div>
  </div>
</template>

<script setup>
import ArrowAnimation from './ArrowAnimation.vue'

const props = defineProps({
  overview: {
    type: String,
    required: true
  },
  objectives: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  guidelines: {
    type: String,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
})
</script>

<style scoped>
.project-title {
  font-size: 3.5rem;
}

.fs-custom {
  font-size: 0.9rem;
}
</style>