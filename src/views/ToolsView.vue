<template>
  <div class="d-flex flex-column">
    <h2 class="mb-0 d-none d-md-block">Tools</h2>
    <h3 class="mb-0 d-block d-md-none">Tools</h3>

    <p class="text-muted fst-italic">
      Tools
    </p>
    <div>
      <textarea v-model="simplified" placeholder="Simplified Chinese" rows="10" cols="40"></textarea>

      <textarea :value="traditional" placeholder="Traditional Chinese" rows="10" cols="40" readonly></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { OpenCC } from 'opencc-js';

const simplified = ref('');
const traditional = ref('');
let converter = null;

onMounted(async () => {
  converter = await OpenCC.Converter({ from: 'cn', to: 'tw' });
});

watch(simplified, (newVal) => {
  if (converter) {
    traditional.value = converter(newVal);
  }
});
</script>

<style scoped>
.accordion {
  --bs-accordion-bg: rgb(248, 248, 248);
  --bs-accordion-active-bg: var(--bs-warning);

  .accordion-button:not(.collapsed)::after {
    -webkit-mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background: var(--bs-warning-text-emphasis);
  }
}
</style>