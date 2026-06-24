<template>
  <div class="col-12 col-lg-10 d-none d-lg-block">
    <h3 class="mb-2 fw-light">Welcome, Ryan!</h3>

    <RepertoireListAdmin id="repertoire" />
  </div>
  <div class="d-block d-lg-none">
    <RepertoireListAdmin id="repertoire" />
  </div>
</template>


<script setup>
import RepertoireListAdmin from "../RepertoireListAdmin.vue";
</script>