<template>
  <!-- Instagram -->
  <div class="mb-1">
    <a href="https://instagram.com/stephjohnsons" class="d-flex align-items-center">
      <i class="bi bi-instagram me-2" style="font-size: 1.4rem;"></i>
      <span class="me-0 me-sm-3">Instagram</span>
    </a>
  </div>
  <span class="me-3 d-none d-sm-block">•</span>
  <!-- LinkedIn -->
  <div class="mb-1">
    <a href="https://www.linkedin.com/in/stephentseu/" class="d-flex align-items-center">
      <i class="bi bi-linkedin me-2" style="font-size: 1.4rem;"></i>
      <span class="me-0 me-sm-3">LinkedIn</span>
    </a>
  </div>
  <span class="me-3 d-none d-sm-block">•</span>
  <!-- GitHub -->
  <div class="mb-1">
    <a href="https://github.com/stephjohnsons" class="d-flex align-items-center">
      <i class="bi bi-github me-2" style="font-size: 1.4rem;"></i>
      <span class="me-0 me-sm-3">GitHub</span>
    </a>
  </div>
</template>

<style scoped>
a {
  text-decoration-line: none;
  color: #262526;
  transition: all 0.2s ease-in-out;

  svg {
    fill: #262526;
  }
}

a:hover,
a:hover svg,
a>svg:hover {
  color: rgb(252, 192, 14);
  fill: rgb(252, 192, 14);
  transition: all 0.2s ease-in-out;
}
</style>