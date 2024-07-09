<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-use-v-if-with-v-for -->
<template>
  <h3>Languages</h3>
  <div v-for="language in  languages " :key="language.name">
    <h6 class="mb-0 fw-semibold">{{ language.name }}</h6>
    <p class="mb-0">
      {{ language.level }}
    </p>
    <div>
      <p class="text-muted fs-7 fst-normal">
        <span>Spoken: </span>
        <span v-if="language.spoken !== '-'" v-for="level in spokenLevels" :key="`spoken-${language.name}-${level}`"
          class="mx-1"
          :class="{ 'fw-bold': language.spoken === level, 'text-muted opacity-25': language.spoken !== level }">
          {{ level }}
        </span>
        <span v-else class="text-muted opacity-25 ms-1">-</span>
        <br />
        <span>Written: </span>
        <span v-if="language.written !== '-'" v-for=" level in writtenLevels" :key="`written-${language.name}-${level}`"
          class="mx-1"
          :class="{ 'fw-bold': language.written === level, 'text-muted opacity-25': language.written !== level }">
          {{ level }}
        </span>
        <span v-else class="text-muted opacity-25 ms-1">-</span>
      </p>
    </div>
    <hr>
  </div>
</template>


<script setup>
import { ref } from "vue";
import { languages } from "@/components/data/biographies.js";

const spokenLevels = ref([
  'Basic',
  'Conversational',
  'Proficient',
  'Fluent'
]);

const writtenLevels = ref([
  'Basic',
  'Intermediate',
  'Proficient',
  'Fluent'
]);
</script>