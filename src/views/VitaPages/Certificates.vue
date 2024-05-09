<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>Certificates</h3>
  <div v-for="cert in    certificates   " :key="cert.index">
    <h6 class="mb-0 fw-semibold">{{ cert.name }}</h6>
    <p class="mb-0">
      {{ cert.provider }}
    </p>
    <p class="text-muted mb-0 fs-7 fst-normal">
      Issued {{ cert.issuanceDate }} <br />
    </p>
    <p class="text-muted fs-7 fst-normal">
      Credential ID

      <a v-if="!cert.link" :href="certificateLink + cert.credentials" class="link" target="_blank">
        {{ cert.credentials }}
      </a>
      <a v-else :href="cert.link" class="link" target="_blank">
        {{ cert.credentials }}
      </a>
    </p>
    <hr>
  </div>
</template>

<script setup>
import { certificates } from "@/components/data/biographies.js";

const certificateLink = 'https://www.coursera.org/account/accomplishments/certificate/';
</script>