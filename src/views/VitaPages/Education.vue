<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>Education</h3>
  <div v-for="edu in    education   " :key="edu.index">
    <h6 class="mb-0 fw-semibold">{{ edu.degree }}</h6>
    <p class="mb-0">
      {{ edu.provider }}
    </p>
    <p class="text-muted mb-0 fs-7">
      Graduated in {{ edu.graduated }} <br />
    </p>
    <p class="text-muted fs-7 fst-normal">
      Major: {{ edu.major }}
    </p>
    <hr>
  </div>
</template>

<script setup>
import { education } from "@/components/data/biographies.js";
</script>