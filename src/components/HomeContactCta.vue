<template>
  <section class="home-cta rounded-4 p-4 p-md-5 mb-5">
    <div class="row align-items-center g-4">
      <div class="col-12 col-lg-8">
        <h3 class="mb-2">Got a project or concert in mind?</h3>
        <p class="mb-0 cta-text">
          From solo and chamber performances to orchestral, studio and crossover work, let's make it happen.
          Drop me a line at <a :href="enquiries.link">{{ enquiries.label }}</a>.
        </p>
      </div>
      <div class="col-12 col-lg-4 d-flex flex-wrap gap-2 justify-content-lg-end">
        <a
          :href="enquiries.link"
          class="btn btn-warning"
        >Email me</a>
        <RouterLink
          to="/contact"
          class="btn btn-outline-light"
        >All contacts</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { contactInfo } from '@/components/data/contact.js'

// info@stephjohnsons.com
const enquiries = contactInfo['Email Enquiries']
</script>

<style scoped>
.home-cta {
  color: #f4f3f3;
  border: 1px solid transparent;
  background:
    linear-gradient(135deg, #262526, #3a3839) padding-box,
    linear-gradient(135deg, rgba(251, 188, 0, 0.7), #4a4849 50%, #262526) border-box;
  box-shadow:
    0 1px 2px rgba(38, 37, 38, 0.08),
    0 10px 24px rgba(38, 37, 38, 0.16);
}

.cta-text {
  color: rgba(244, 243, 243, 0.75);
  max-width: 46rem;
}

.cta-text a {
  color: #f4f3f3 !important;
}

.btn-outline-light:hover {
  color: #262526;
}
</style>
