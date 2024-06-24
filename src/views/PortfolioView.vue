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
      <p v-if="site.link != '-'">
        <a data-bs-toggle="offcanvas" href="#example" role="button">
          {{ site.name }}
        </a>
      </p>
      <p v-else class="mb-0 fw-semibold fs-4">
        {{ site.name }}
        <span class="fs-7">
          🚧 Under maintenance 🚧
        </span>
      </p>

      <div class="offcanvas offcanvas-end" tabindex="-1" id="example">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title">{{ site.name }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <p class="mb-0 fs-custom">
            {{ site.desc }}
          </p>
        </div>
      </div>
    </div>

    <!-- <p class="mb-0 fs-custom">
      {{ site.desc }}
    </p> -->
    <!-- <div>
      <ul>
        <li>role</li>
        <li>objectives: aim, goal</li>
        <li>resources: physical, design</li>
        <li>solution: list down what was done</li>
      </ul>
    </div> -->
  </div>
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
</style>
