<template>
  <div>
    <h3 class="mb-1">Portfolio</h3>
    <p class="text-muted fst-italic mt-1 smaller-text">
      <span class="fw-bold">Disclaimer: </span>
      The content presented in this portfolio,
      which includes but is not limited to
      case studies and project descriptions,
      is for illustrative purposes only.
      All trademarks, logos, and copyrights mentioned
      are the property of their respective owners.
      This portfolio aims to showcase design and
      user experience skills and does not claim
      any affiliation or endorsement by any organization.
    </p>

    <div v-for="(site, index) in works" :key="index">
      <p v-if="site.link != '-'" class="mb-0 fw-normal fs-4">
        <a data-bs-toggle="offcanvas" href="#example" @click.prevent="openOffcanvas(site)">
          {{ site.name }}
        </a>
      </p>
      <p v-else class="mb-0 fw-light fs-4">
        {{ site.name }}
        <span class="fs-7">
          🚧 Under maintenance 🚧
        </span>
      </p>

      <Offcanvas :works="selectedSite" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { works } from "@/components/data/portfolio.js";
import Offcanvas from "@/components/OffcanvasTemplate.vue";

const selectedSite = ref({});

const openOffcanvas = (site) => {
  selectedSite.value = site;
}
</script>

<style scoped>
.fs-custom {
  font-size: 0.9rem;
}

.smaller-text {
  font-size: 0.8rem;
}
</style>
