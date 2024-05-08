<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>Past Web Development Projects</h3>

  <div v-for="site in    works   " :key="site.index">
    <h6 class="mb-0 fw-semibold">{{ site.name }}</h6>
    <p class="mb-0 fs-custom">
      {{ site.desc }}
    </p>
    <p v-if="site.link === '-'" class="fs-7 fst-normal ">
      🚧 Under maintenance 🚧
    </p>
    <p v-else class="text-muted fs-custom">
      <a :href="site.link" target="_blank">
        Link
      </a>
    </p>
    <hr>
  </div>
</template>

<script setup>
import { works } from "@/components/data/biographies.js";
</script>

<style scoped>
.fs-custom {
  font-size: 0.9rem;
}
</style>