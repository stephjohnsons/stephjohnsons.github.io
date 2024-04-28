<template>
  <div class="about">
    <h2>Contact</h2>
    <p class="fw-bold mb-0">
      Meeting
    </p>

    <Calendly text="Schedule a meeting to meet with me (30 min)" />

    <div v-for="(item, key) in contactInfo" :key="key">
      <p class="fw-bold mb-0">
        {{ key }}
      </p>

      <p v-if="item.remarks" class="mb-0 fw-medium">
        {{ item.remarks }} <br />
        <i class="fw-normal">
          {{ item.remarks2 }}
        </i>
      </p>

      <p>
        <a :href="item.link">
          {{ item.label }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { contactInfo } from '@/components/data/contact.js';
import Calendly from '@/components/CalendlyScheduling.vue';
</script>

<style scoped>
body {
  background-color: #BEFAFD;
}

a {
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}
</style>
