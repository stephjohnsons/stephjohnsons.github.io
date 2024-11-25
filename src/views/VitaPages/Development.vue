<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>Portfolio</h3>

  <div v-for="site in    works   " :key="site.index">
    <h6 class="mb-1 fw-semibold">
      {{ site.name }}
    </h6>
    <p class="mb-0 fs-custom">
      {{ site.desc }}
    </p>
    <p v-if="site.link === '-'" class="fs-7 fst-normal">
      🚧 Under maintenance 🚧
    </p>
    <p v-else class="text-muted fs-custom">
      <a :href="site.link" target="_blank">
        Link
      </a>
    </p>
    <hr>
  </div>

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
</template>

<script setup>
import { works } from "@/components/data/biographies.js";
</script>

<style scoped>
.fs-custom {
  font-size: 0.9rem;
}

.smaller-text {
  font-size: 0.8rem;
}

hr {
  margin: 0.75rem 0%;
}
</style>