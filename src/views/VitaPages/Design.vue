<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>Past Design-related Projects</h3>

  <div v-for="work in designs" :key="work.index">
    <h6 class="mb-0 fw-semibold">{{ work.client }}</h6>
    <p class="mb-0 fs-custom" v-html="work.description" />

    <p class="text-muted fs-custom">
      <a :href="work.link" target="_blank">
        Link
      </a>
    </p>
    <hr>
  </div>
</template>

<script setup>
import { designs } from "@/components/data/biographies.js";
</script>

<style scoped>
.fs-custom {
  font-size: 0.9rem;
}
</style>