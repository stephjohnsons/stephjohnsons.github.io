<template>
  <h5 class="mb-2 fw-normal mt-2">
    Timezone Converter
  </h5>
  <div class="d-flex gap-2 mb-2">
    <div>
      <p class="mb-1">Kuala Lumpur</p>
      <textarea v-model="simplified" rows="5" class="form-control" placeholder="Simplified Chinese"></textarea>
    </div>
    <div>
      <select class="mb-1">
        <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur</option>
      </select>
      <textarea :value="traditional" rows="5" class="form-control" placeholder="Traditional Chinese"
        readonly></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import * as OpenCC from 'opencc-js/core';
import * as Locale from 'opencc-js/preset';

const simplified = ref('');
const traditional = ref('');
let converter = null;

onMounted(async () => {
  converter = await OpenCC.ConverterFactory(Locale.from.cn, Locale.to.tw);;
});

watch(simplified, (newVal) => {
  if (converter) {
    traditional.value = converter(newVal);
  }
});
</script>

<style scoped>
textarea {
  resize: none;
}
</style>