<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Latest changes</h5>
      <ul class="timeline list-unstyled">
        <li
          v-for="(change, index) in changes"
          :key="index"
          class="mb-4 position-relative ps-4"
        >
          <span
            class="position-absolute top-0 start-0 translate-middle p-1 bg-secondary border border-light rounded-circle"
            style="z-index: 1;"
          ></span>
          <small class="text-muted d-block">{{ change.time }}</small>
          <div class="fw-semibold">{{ change.title }}</div>
        </li>
      </ul>
      <a href="/changelog" class="text-decoration-none">
        View changelog →
      </a>
    </div>
  </div>
</template>

<script setup>
const changes = [
  { time: '16 hours ago', title: 'Introducing Copilot Spaces: A new way to work with co...' },
  { time: '17 hours ago', title: 'Improvements to C++ code completions in Visual Studi...' },
  { time: '2 days ago', title: 'Incremental security analysis makes CodeQL up to 20%...' },
  { time: '2 days ago', title: 'Copilot code review: Better coverage and more control' }
]
</script>

<style scoped>
.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0.6rem;
  height: 100%;
  width: 2px;
  background-color: #dee2e6;
}
</style>
