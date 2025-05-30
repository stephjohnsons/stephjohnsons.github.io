<template>
  <div class="card m-4">
    <div class="card-body">
      <h5 class="card-title mb-4">Latest changes</h5>
      <ul class="timeline list-unstyled">
        <li
          v-for="(change, index) in changes"
          :key="index"
          class="mb-4 position-relative ps-4"
        >
          <span
            class="position-absolute top-0 start-0 translate-middle p-1 bg-secondary border border-light rounded-circle mt-2"
            style="z-index: 1;"
          ></span>
          <small class="text-muted d-block">{{ change.time }}</small>
          <div class="fw-semibold">{{ change.title }}</div>
        </li>
      </ul>
      <!-- <a href="/changelog" class="text-decoration-none">
        View changelog →
      </a> -->
    </div>
  </div>
</template>

<script setup>
const changes = [
  {
    time: "16 hours ago",
    title: "Introducing Copilot Spaces: A new way to work with co...",
  },
  {
    time: "17 hours ago",
    title: "Improvements to C++ code completions in Visual Studi...",
  },
  {
    time: "2 days ago",
    title: "Incremental security analysis makes CodeQL up to 20%...",
  },
  {
    time: "2 days ago",
    title: "Copilot code review: Better coverage and more control",
  },
];
</script>

<style scoped>
.timeline::before {
  content: '';
  position: absolute;
  top: 4.5rem;
  left: 0.9rem;
  height: 60%;
  width: 2px;
  background: linear-gradient(
    to bottom,
    #dee2e6 0%,
    #dee2e6 80%,
    transparent 100%
  );
}
</style>
