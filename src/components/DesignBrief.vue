<template>
  <h2>Project Overview</h2>
  <p>{{ props.overview }}</p>

  <h2>Objectives</h2>
  <p>{{ props.objectives }}</p>

  <h2>Target Audience</h2>
  <p> {{ props.audience }}</p>

  <h2>Scope of Work</h2>
  <p>{{ props.scope }}</p>

  <h2>Brand Guidelines</h2>
  <p>{{ props.guidelines }}</p>

  <h2>Examples of Preferred Aesthetic</h2>
  <p>
    {{ props.examples }}
  </p>
</template>

<script setup>
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
  examples: {
    type: String,
    required: true
  },
})
</script>