<template>
  <div class="about">
    <h2>Contact</h2>

    <div class="contact-items">
      <p class="fw-bold mb-0">
        Meeting
      </p>
      <Calendly text="Schedule a meeting to meet with me (30 min)" />
    </div>

    <div v-for="(item, key) in contactInfo" :key="key" class="contact-items">
      <p class="fw-bold mb-0">
        {{ key }}
      </p>

      <p v-if="item.remarks" class="mb-0 fw-medium">
        {{ item.remarks }}
        <span v-if="item.remarks2" class="fw-normal fs-7 text-muted fst-normal">
          {{ item.remarks2 }} <br />
        </span>
        <span v-if="item.description" class="fw-normal mt-1 fst-italic text-muted">
          {{ item.description }}
        </span>
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

.contact-items> :not(:first-child) {
  margin-left: 1rem;
}
</style>
