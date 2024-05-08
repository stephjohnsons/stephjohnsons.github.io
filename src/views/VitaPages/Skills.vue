<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h3>Skills</h3>
  <div class="accordion" v-for="(items, category, idx) in devProfile" :key="category">
    <div class="accordion-item">
      <h2 class="accordion-header" :id="`heading${idx}`">
        <button class="accordion-button" type="button" :class="{ 'collapsed': !isActive[idx] }"
          data-bs-toggle="collapse" :data-bs-target="`#collapse${idx}`"
          :aria-expanded="isActive[idx] ? 'true' : 'false'" @click="toggle(idx)">
          <strong>{{ category }}</strong>
        </button>
      </h2>
      <div :id="`collapse${idx}`" class="accordion-collapse collapse" :class="{ 'show': isActive[idx] }"
        :aria-labelledby="`heading${idx}`" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <ul>
            <li v-for="item in items" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { devProfile } from "@/components/data/biographies.js";

const isActive = reactive({});

const toggle = (index) => {
  isActive[index] = !isActive[index];
};

onMounted(() => {
  Object.keys(devProfile).forEach((key, index) => {
    isActive[index] = index === 0;
  });
});
</script>

<style scoped>
.accordion {
  --bs-accordion-color: var(--bs-warning-text-emphasis);
  --bs-accordion-active-bg: var(--bs-warning);

  .accordion-button:not(.collapsed)::after {
    -webkit-mask-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23aaaaaa'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    background: var(--bs-warning-text-emphasis);
  }

  .accordion-button:not(.collapsed) {
    color: var(--bs-warning-text-emphasis);
  }
}
</style>